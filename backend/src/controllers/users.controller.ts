import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Path,
  Route,
  SuccessResponse,
  Patch,
  Query,
  Request,
  Security,
} from 'tsoa';
import {
  User,
  UserCreationParams,
  UserModificationParams,
} from '../types/users';
import { ImageService } from '../services/image.service';
import { PagedResults } from '../types/paged.results';
import { UsersRepository } from '../repositories/users.repository';
import { MongoUsersRepository } from '../repositories/mongo/mongo.users.repository';
import { AuthScope } from '../middlewares/authorization';

@Route('users')
export class UsersController extends Controller {
  private usersRepository: UsersRepository = new MongoUsersRepository();
  private imageService: ImageService = new ImageService();
  private readonly USERS_LIMIT = 21;

  @Security(AuthScope.AUTH)
  @Get()
  @SuccessResponse('200, OK')
  public async getUsers(
    @Query() username = '',
    @Query() limit = this.USERS_LIMIT,
    /**
     * Query users with a username alphabetically before the one provided.
     * If `after` is also provided, only `after` is used.
     */
    @Query() before: string | null = null,
    /**
     * Query users with a username alphabetically after the one provided.
     */
    @Query() after: string | null = null,
  ): Promise<PagedResults<User>> {
    return Promise.resolve(
      this.usersRepository.getUsers(username, limit, before, after),
    ).then(
      (users: PagedResults<User>) => {
        this.setStatus(200);
        return users;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.AUTH)
  @Get('{username}')
  @SuccessResponse('200, OK')
  public async getUser(@Path() username: string): Promise<User> {
    return Promise.resolve(this.usersRepository.getUser(username)).then(
      (user: User) => {
        this.setStatus(200);
        return user;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Post()
  @SuccessResponse('201, Created')
  public async createUser(
    @Body() userCreationRequest: UserCreationParams,
  ): Promise<User> {
    return Promise.resolve(
      this.usersRepository.createUser(userCreationRequest),
    ).then(
      (user: User) => {
        this.setStatus(201);
        this.setHeader('Location', `/users/${user.username}`);
        return user;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.USERNAME)
  @Patch('{username}')
  @SuccessResponse('200, OK')
  public async updateUser(
    @Path() username: string,
    @Body() params: UserModificationParams,
    @Request() req: any,
  ): Promise<User> {
    if (params.avatarData) {
      return this.imageService
        .uploadAvatar(params.avatarData)
        .then((avatarReference: string) => {
          params.avatarReference = avatarReference;
          return this.updateUserWithRepository(username, params, req);
        });
    }

    return this.updateUserWithRepository(username, params, req);
  }

  private async updateUserWithRepository(
    username: string,
    params: UserModificationParams,
    req: any,
  ): Promise<User> {
    return Promise.resolve(
      this.usersRepository.updateUser(username, params),
    ).then(
      (user: User) => {
        req.session.user = user;
        this.setStatus(200);
        this.setHeader('Location', `/users/${username}`);
        return user;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Security(AuthScope.USERNAME)
  @Delete('{username}')
  @SuccessResponse('204, No Content')
  public deleteUser(
    @Path() username: string,
    @Request() req: any,
  ): Promise<void> {
    return Promise.resolve(this.usersRepository.deleteUser(username)).then(
      () => {
        req.logout();
        delete req.session.user;
        this.setStatus(204);
      },
      (err: any) => {
        throw err;
      },
    );
  }
}
