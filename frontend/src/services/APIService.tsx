import { http } from 'http-common';
import { UserModificationParams, UserQueryParams } from 'types/users';
import {
  CommentCreationParams,
  PostCreationParams,
  PostModificationParams,
  PostQueryParams,
} from 'types/posts';
import { HashtagQueryParams } from '../types/hashtags';
import { SearchQueryParams } from '../types/search.results';

// TODO : Is this really useful? Can't we use the same logic as GET /users?
const objectToQueryString = (obj) => {
  if (typeof obj !== 'object') return '';

  return `?${Object.keys(obj)
    .map((key) => {
      return obj[key] !== undefined
        ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        : '';
    })
    .filter(Boolean)
    .join('&')}`;
};

const getUsers = (queryParams: UserQueryParams) => {
  // TODO : Shouldn't this use objectToQueryString?
  return http.get('/users', { params: queryParams });
};

const getUser = (username: string) => {
  return http.get(`/users/${username}`);
};

const deleteUser = (username: string) => {
  return http.delete(`/users/${username}`);
};

const createUserPost = (
  username: string,
  postCreationParams: PostCreationParams
) => {
  return http.post(`/users/${username}/posts`, postCreationParams);
};

const getUserPosts = (postQueryParams: PostQueryParams, username: string) => {
  return http.get(
    `/users/${username}/posts${objectToQueryString(postQueryParams)}`
  );
};

const updateUser = (
  username: string,
  userModificationParams: UserModificationParams
) => {
  return http.patch(`/users/${username}`, userModificationParams);
};

const getPosts = (postQueryParams?: PostQueryParams) => {
  return http.get(`/posts${objectToQueryString(postQueryParams)}`);
};

const getPost = (postId: string) => {
  return http.get(`/posts/${postId}`);
};

const getHashtags = (hashtagQueryParams?: HashtagQueryParams) => {
  return http.get(`/hashtags${objectToQueryString(hashtagQueryParams)}`);
};

const reactToPost = (postId: string) => {
  return http.post(`/posts/${postId}/reactions`);
};

const createUserComment = (
  postId: string,
  commentCreationParams: CommentCreationParams
) => {
  return http.post(`/posts/${postId}/comments`, commentCreationParams);
};

const updatePost = (
  postId: string,
  postModificationParams: PostModificationParams
) => {
  return http.patch(`/posts/${postId}`, postModificationParams);
};

const deletePost = (postId: string) => {
  return http.delete(`/posts/${postId}`);
};

const getSearch = (queryParams: SearchQueryParams) => {
  return http.get('/search', { params: queryParams });
};

const getNotifications = () => {
  return http.get('/notifications');
};

export default {
  getUsers,
  getUser,
  createUserPost,
  getUserPosts,
  updateUser,
  getPosts,
  getPost,
  getHashtags,
  reactToPost,
  createUserComment,
  updatePost,
  deletePost,
  deleteUser,
  getNotifications,
  getSearch,
};
