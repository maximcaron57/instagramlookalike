import { useState } from 'react';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';
import { Hashtag, HashtagQueryParams } from '../../types/hashtags';

export default function useGetPosts(queryParams?: HashtagQueryParams) {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const { isLoading, error, act: getHashtags } = useQueriedFetchFromAPI(
    'getHashtags',
    setHashtags,
    queryParams
  );

  return { hashtags, isLoading, error, getHashtags };
}
