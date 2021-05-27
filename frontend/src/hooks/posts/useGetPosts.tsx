import { useState } from 'react';
import { Post, PostQueryParams } from 'types/posts';
import { initialPagedResults, PagedResults } from 'types/paged.results';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';

export default function useGetPosts(queryParams?: PostQueryParams) {
  const [posts, setPosts] = useState<PagedResults<Post>>(initialPagedResults);
  const { isLoading, error, act: getPosts } = useQueriedFetchFromAPI(
    'getPosts',
    setPosts,
    queryParams
  );

  return { posts, isLoading, error, getPosts };
}
