import { Controller, Get, Route, SuccessResponse, Query, Security } from 'tsoa';
import { Hashtag } from '../types/hashtags';
import { PostsRepository } from '../repositories/posts.repository';
import { MongoPostsRepository } from '../repositories/mongo/mongo.posts.repository';
import { AuthScope } from '../middlewares/authorization';

@Route('hashtags')
export class HashtagsController extends Controller {
  private postsRepository: PostsRepository = new MongoPostsRepository();
  private readonly HASHTAGS_LIMIT = 21;

  @Security(AuthScope.AUTH)
  @Get()
  @SuccessResponse('200, OK')
  public async getHashtags(
    @Query() like = '',
    @Query() limit = this.HASHTAGS_LIMIT,
    @Query() after = '',
  ): Promise<Hashtag[]> {
    return Promise.resolve(
      this.postsRepository.getHashtags(like, limit, after),
    ).then(
      (hashtags: Hashtag[]) => {
        this.setStatus(200);
        return hashtags;
      },
      (err) => {
        throw err;
      },
    );
  }
}
