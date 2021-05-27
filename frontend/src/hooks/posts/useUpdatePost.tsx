import { useState } from 'react';
import { Post } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useUpdatePost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { act: updatePost, isLoading, error } = useActOnAPI(
    'updatePost',
    setPost,
    postId
  );

  return { updatePost, post, isLoading, error };
}
