import {
  Controller,
  Path,
  Body,
  Request,
  Get,
  Patch,
  Delete,
  Route,
  SuccessResponse,
  Query,
  Post,
  Security,
} from 'tsoa';

import {
  CommentCreationParams,
  PostModificationParams,
  SavedPost,
} from '../types/posts';
import { PagedResults } from '../types/paged.results';
import { PostsRepository } from '../repositories/posts.repository';
import { MongoPostsRepository } from '../repositories/mongo/mongo.posts.repository';
import { AuthScope } from '../middlewares/authorization';

@Route('posts')
export class PostsController extends Controller {
  private postsRepository: PostsRepository = new MongoPostsRepository();
  private readonly POSTS_LIMIT = 21;

  @Security(AuthScope.AUTH)
  @Get()
  @SuccessResponse('200, OK')
  public async getPosts(
    @Query() description = '',
    @Query() hashtag = '',
    @Query() limit = this.POSTS_LIMIT,
    /**
     * Query posts created at a <date><id> before the one provided.
     * If `after` is also provided, only `after` is used.
     */
    @Query() before: string | null = null,
    /**
     * Query posts created at a <date><id> after the one provided.
     */
    @Query() after: string | null = null,
  ): Promise<PagedResults<SavedPost>> {
    return Promise.resolve(
      this.postsRepository.getPosts(description, hashtag, limit, before, after),
    ).then(
      (posts: PagedResults<SavedPost>) => {
        this.setStatus(200);
        return posts;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.AUTH)
  @Get('{id}')
  @SuccessResponse('200, OK')
  public async getPost(@Path() id: string): Promise<SavedPost> {
    return Promise.resolve(this.postsRepository.getPost(id)).then(
      (post: SavedPost) => {
        this.setStatus(200);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.POST_ID)
  @Delete('{id}')
  @SuccessResponse('200, OK')
  public async deletePost(@Path() id: string): Promise<void> {
    return Promise.resolve(this.postsRepository.deletePost(id)).then(
      () => {
        this.setStatus(200);
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.POST_ID)
  @Patch('{id}')
  @SuccessResponse('200, OK')
  public async updatePost(
    @Path() id: string,
    @Body() params: PostModificationParams,
  ): Promise<SavedPost> {
    return Promise.resolve(this.postsRepository.updatePost(id, params)).then(
      (post: SavedPost) => {
        this.setStatus(200);
        this.setHeader('Location', `/posts/${id}`);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.AUTH)
  @Post(`{id}/comments`)
  @SuccessResponse('201, Created')
  public async createComment(
    @Path() id: string,
    @Body() params: CommentCreationParams,
    @Request() req: any,
  ): Promise<SavedPost> {
    return Promise.resolve(
      this.postsRepository.createComment(req.user, id, params),
    ).then(
      (post: SavedPost) => {
        this.setStatus(201);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.AUTH)
  @Post(`{id}/reactions`)
  @SuccessResponse('201, Created')
  public async createReaction(
    @Path() id: string,
    @Request() req: any,
  ): Promise<void> {
    return Promise.resolve(
      this.postsRepository.createReaction(req.user, id),
    ).then(
      () => {
        this.setStatus(201);
      },
      (err) => {
        throw err;
      },
    );
  }
}
