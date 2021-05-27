import { SearchResults } from '../types/search.results';
import { UsersRepository } from '../repositories/users.repository';
import { MongoUsersRepository } from '../repositories/mongo/mongo.users.repository';
import { PostsRepository } from '../repositories/posts.repository';
import { MongoPostsRepository } from '../repositories/mongo/mongo.posts.repository';

export class SearchService {
  private usersRepository: UsersRepository = new MongoUsersRepository();
  private postsRepository: PostsRepository = new MongoPostsRepository();

  public async search(value: string, limit: number): Promise<SearchResults> {
    const users = await this.usersRepository.getUsers(value, limit);
    const hashtags = await this.postsRepository.getHashtags(value, limit, '');
    const postsByDescription = await this.postsRepository.getPosts(
      value,
      '',
      limit,
    );

    return {
      users: users.results,
      hashtags,
      descriptionCount: postsByDescription.count,
    };
  }
}
