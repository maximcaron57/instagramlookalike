import { UnauthenticatedError, UnauthorizedError } from '../types/errors';
import { logger } from './logger';
import { MongoPostsRepository } from '../repositories/mongo/mongo.posts.repository';
import { PostsRepository } from '../repositories/posts.repository';

const postsRepository: PostsRepository = new MongoPostsRepository();

export enum AuthScope {
  AUTH = 'AUTH',
  USERNAME = 'USERNAME',
  POST_ID = 'POST_ID',
}

export function expressAuthentication(
  request: any,
  securityName: string,
  scope?: string[],
): Promise<any> {
  logger.info(
    `Authorization: request.user=${JSON.stringify(
      request.user,
    )}, security=${securityName}, request.params=${JSON.stringify(
      request.params,
    )}`,
  );

  return new Promise(async (resolve, reject) => {
    if (!request.user || !request.user.username) {
      reject(new UnauthenticatedError());
    } else if (securityName === AuthScope.AUTH) {
      resolve(request.user);
    } else if (securityName === AuthScope.USERNAME) {
      if (request.params.username !== request.user.username) {
        reject(new UnauthorizedError());
      } else {
        resolve(request.user);
      }
    } else if (securityName === AuthScope.POST_ID) {
      try {
        const post = await postsRepository.getPost(request.params.id);
        if (!post || post.user !== request.user.username) {
          reject(new UnauthorizedError());
        } else {
          resolve(request.user);
        }
      } catch (err) {
        reject(err);
      }
    } else {
      reject(new Error());
    }
  });
}
