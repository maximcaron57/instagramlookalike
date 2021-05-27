import { useState } from 'react';
import useActOnAPI from 'hooks/useActOnAPI';
import { Post } from 'types/posts';

export default function useCreateUserComment(postId: string) {
  const [post, setPost] = useState<Post>();

  const { act: createUserComment, isLoading, error } = useActOnAPI(
    'createUserComment',
    setPost,
    postId
  );

  return { createUserComment, post, isLoading, error };
}
