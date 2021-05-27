import { useState } from 'react';
import { Post } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useDeletePost(postId: string) {
  const [, setPost] = useState<Post>();
  const { act: deletePost, isLoading, error } = useActOnAPI(
    'deletePost',
    setPost,
    postId
  );

  return { deletePost, isLoading, error };
}
