import { useState } from 'react';
import { Post } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useCreateUserPost(username: string) {
  const [post, setPost] = useState<Post>();

  const { act: createUserPost, isLoading, error } = useActOnAPI(
    'createUserPost',
    setPost,
    username
  );

  return { createUserPost, post, isLoading, error };
}
