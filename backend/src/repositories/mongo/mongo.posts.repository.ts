import _ from 'lodash';
import { Posts } from '../../models/posts.model';
import { Users } from '../../models/users.model';
import {
  CommentCreationParams,
  PostCreationParams,
  PostModificationParams,
  SavedPost,
} from '../../types/posts';
import { BadRequestError, NotFoundEntityError } from '../../types/errors';
import { Hashtag } from '../../types/hashtags';
import { MongoNotificationsRepository } from './mongo.notifications.repository';
import { PagedResults } from '../../types/paged.results';
import { User } from '../../types/users';
import { NotificationType } from '../../types/notifications';
import { PostsRepository } from '../posts.repository';
import { NotificationsRepository } from '../notifications.repository';
import { createComparableCreatedAt } from '../../factories/comparable.created.at.factory';
import { logger } from '../../middlewares/logger';

export class MongoPostsRepository implements PostsRepository {
  private notificationsRepository: NotificationsRepository = new MongoNotificationsRepository();

  public async getPosts(
    description: string,
    hashtag: string,
    limit: number,
    before: string | null = null,
    after: string | null = null,
  ): Promise<PagedResults<SavedPost>> {
    const matchQuery: any = {};
    if (description) {
      matchQuery['description'] = { $regex: new RegExp(description, 'i') };
    }
    if (hashtag) {
      matchQuery['hashtags'] = {
        $elemMatch: { $regex: new RegExp(hashtag, 'i') },
      };
    }

    const pageQuery: any = {};
    let sort = 'desc';
    if (before) {
      pageQuery['comparableCreatedAt'] = { $lt: before };
    } else if (after) {
      pageQuery['comparableCreatedAt'] = { $gt: after };
      sort = 'asc';
    }

    const count = await Posts.count(matchQuery);
    const posts = await Posts.find({ ...matchQuery, ...pageQuery })
      .sort({ comparableCreatedAt: sort })
      .limit(limit);
    const users = await Users.find();

    if (sort == 'asc') {
      posts.reverse();
    }

    return {
      results: posts.map((post) => {
        const postJson = post.toJSON();
        postJson.userAvatar = users.find(
          (user) => user.username === post.user,
        )?.avatarReference;
        // TODO : Instead of returning full reactions and comments, return counts
        return postJson;
      }),
      firstKey: posts.length > 0 ? posts[0].comparableCreatedAt : null,
      lastKey:
        posts.length > 0 ? posts[posts.length - 1].comparableCreatedAt : null,
      count,
    };
  }

  public async getPost(id: string): Promise<SavedPost> {
    const post = await Posts.findOne({ _id: id });

    if (post) {
      const postJson = post.toJSON();
      const user = await Users.findOne({ username: post.user }).exec();
      if (user && user.avatarReference) {
        postJson.userAvatar = user.avatarReference;
        if (postJson.comments) {
          const users = await Users.find().exec();
          postJson.comments.forEach((comment) => {
            const commentUser = users.find(
              (user) => user.username === comment.user,
            );
            if (commentUser) {
              comment.userAvatar = commentUser.avatarReference;
            }
          });
        }
      }
      return postJson;
    }

    throw new NotFoundEntityError(`Post ${id} doesn't exist`);
  }

  public async createPost(
    username: string,
    params: PostCreationParams,
  ): Promise<SavedPost> {
    await MongoPostsRepository.validateUserExistence(username);
    await MongoPostsRepository.validateUsersExistence(params.usertags);

    const post = await Posts.create({
      reference: params.reference,
      thumbnail: params.thumbnail,
      description: params.description,
      hashtags: params.hashtags,
      usertags: params.usertags,
      user: username,
    });
    logger.info('LE CONTENU de params' + params.thumbnail);
    post.comparableCreatedAt = createComparableCreatedAt(
      post.id,
      post.createdAt,
    );

    await post.save();

    return post.toJSON();
  }

  public async updatePost(
    id: string,
    params: PostModificationParams,
  ): Promise<SavedPost> {
    if (params.usertags) {
      await MongoPostsRepository.validateUsersExistence(params.usertags);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      {
        $set: _.pick(params, ['description', 'hashtags', 'usertags']),
      },
      { new: true, runValidators: true },
    ).exec();

    if (updatedPost) {
      const postJson = updatedPost.toJSON();
      const user = await Users.findOne({ username: updatedPost.user }).exec();
      if (user && user.avatarReference) {
        postJson.userAvatar = user.avatarReference;
      }
      return postJson;
    }

    throw new NotFoundEntityError(`Post ${id} doesn't exist`);
  }

  public async deletePost(id: string): Promise<void> {
    const post = await Posts.findOne({ _id: id });
    if (post) {
      post.deleteOne();
    } else {
      throw new NotFoundEntityError(`Post ${id} doesn't exist`);
    }
  }

  public async getUsersPosts(
    username: string,
    limit: number,
    before: string | null = null,
    after: string | null = null,
  ): Promise<PagedResults<SavedPost>> {
    if (!(await Users.exists({ username }))) {
      throw new NotFoundEntityError(`User ${username} doesn't exist`);
    }

    const matchQuery: any = { user: username };
    const pageQuery: any = {};
    let sort = 'desc';
    if (before) {
      pageQuery['comparableCreatedAt'] = { $lt: before };
    } else if (after) {
      pageQuery['comparableCreatedAt'] = { $gt: after };
      sort = 'asc';
    }

    const user = await Users.findOne({ username });
    const count = await Posts.count(matchQuery);
    const posts = await Posts.find({ ...matchQuery, ...pageQuery })
      .sort({
        comparableCreatedAt: sort,
      })
      .limit(limit);

    if (sort == 'asc') {
      posts.reverse();
    }

    return {
      results: posts.map((post) => {
        const postJson = post.toJSON();
        postJson.userAvatar = user?.avatarReference;
        delete postJson.comments;
        return postJson;
      }),
      firstKey: posts.length > 0 ? posts[0].comparableCreatedAt : null,
      lastKey:
        posts.length > 0 ? posts[posts.length - 1].comparableCreatedAt : null,
      count,
    };
  }

  private static async validateUsersExistence(usernames: string[]) {
    for (const username of usernames) {
      await MongoPostsRepository.validateUserExistence(username);
    }
  }

  private static async validateUserExistence(username: string) {
    if (!(await Users.exists({ username }))) {
      throw new NotFoundEntityError(`User ${username} doesn't exist`);
    }
  }

  public async getHashtags(
    like: string,
    limit: number,
    after = '',
  ): Promise<Hashtag[]> {
    const topHashtags = await Posts.aggregate([
      { $project: { hashtags: 1 } },
      { $unwind: '$hashtags' },
      {
        $group: {
          _id: '$hashtags',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          $and: [
            { _id: { $regex: new RegExp(like, 'i') } },
            { _id: { $gt: after } },
          ],
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    return topHashtags.map((hashtag: any) => {
      hashtag.name = hashtag._id;
      return _.pick(hashtag, ['name', 'count']);
    });
  }

  public async createComment(
    user: User,
    postId: string,
    params: CommentCreationParams,
  ): Promise<SavedPost> {
    const post = await Posts.findByIdAndUpdate(postId, {
      $push: {
        comments: {
          user: user.username,
          text: params.text,
        },
      },
    }).exec();
    if (!post) {
      throw new NotFoundEntityError(`Post ${postId} doesn't exist`);
    }
    await this.notificationsRepository.createNotification({
      recipient: post.user,
      type: NotificationType.COMMENT,
      commentText: params.text,
      user: user.username,
      userAvatarReference: user.avatarReference,
      postId: postId,
      postImageReference: post.reference,
    });
    return post.toJSON();
  }

  public async createReaction(user: User, postId: string): Promise<void> {
    const post = await Posts.findOneAndUpdate(
      {
        $and: [
          { _id: postId },
          { reactions: { $not: { $elemMatch: { user: user.username } } } },
        ],
      },
      {
        $push: {
          reactions: {
            user: user.username,
          },
        },
      },
    ).exec();
    if (!post) {
      throw new BadRequestError('Could not react to post');
    }
    await this.notificationsRepository.createNotification({
      recipient: post.user,
      type: NotificationType.REACTION,
      user: user.username,
      userAvatarReference: user.avatarReference,
      postId: postId,
      postImageReference: post.reference,
    });
  }
}
