import { useState } from 'react';
import { Post } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useReactToPost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { act: reactToPost, isLoading, error } = useActOnAPI(
    'reactToPost',
    setPost,
    postId
  );

  return { reactToPost, post, isLoading, error };
}
