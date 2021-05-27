import { useState } from 'react';
import { Post, PostQueryParams } from 'types/posts';
import { initialPagedResults, PagedResults } from 'types/paged.results';
import useQueriedFetchFromAPI from '../useQueriedFetchFromAPI';

export default function useGetUserPosts(
  username: string,
  queryParams?: PostQueryParams
) {
  const [posts, setPosts] = useState<PagedResults<Post>>(initialPagedResults);
  const { isLoading, error, act: getPosts } = useQueriedFetchFromAPI(
    'getUserPosts',
    setPosts,
    queryParams,
    username
  );

  return { posts, isLoading, error, getPosts };
}
