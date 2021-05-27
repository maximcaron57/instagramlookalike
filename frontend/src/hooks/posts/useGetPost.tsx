import { useState } from 'react';
import { Post } from 'types/posts';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetPost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { isLoading, error, act: getPost } = useFetchFromAPI(
    'getPost',
    setPost,
    postId
  );

  return { post, isLoading, error, getPost };
}
