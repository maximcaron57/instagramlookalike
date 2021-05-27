import React, { useEffect, useState } from 'react';
import useGetPosts from 'hooks/posts/useGetPosts';
import useQuery from 'hooks/useQuery';
import { useToasts } from 'react-toast-notifications';
import { PostQueryParams } from 'types/posts';
import { Box } from '@material-ui/core';
import AlertMessage from 'components/AlertMessage';
import PostList from 'components/posts/PostList';
import _ from 'lodash';

const getQueryParams = (
  hashtagSearchValue: string,
  descriptionSearchValue: string,
  before?: string
): PostQueryParams => ({
  hashtag: hashtagSearchValue || undefined,
  description: descriptionSearchValue || undefined,
  before: before || undefined,
});

export const FeedView = () => {
  const query = useQuery();
  const hashtagSearchValue = query.get('hashtag');
  const descriptionSearchValue = query.get('description');
  const [lastKey, setLastKey] = useState(undefined);
  const { posts, isLoading, error } = useGetPosts(
    getQueryParams(hashtagSearchValue, descriptionSearchValue, lastKey)
  );
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [isLoadMoreFinished, setIsLoadMoreFinished] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    setFetchedPosts([]);
    setLastKey(undefined);
    posts.results = [];
  }, [hashtagSearchValue, descriptionSearchValue]);

  useEffect(() => {
    if (posts.results.length > 0) {
      setFetchedPosts(_.unionBy(fetchedPosts, posts.results, 'id'));
      setIsLoadMoreFinished(true);
    }
  }, [posts.results]);

  useEffect(() => {
    if (error) {
      addToast('Could not fetch posts', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [error]);

  const refreshPosts = () => {
    setFetchedPosts([]);
    setLastKey(undefined);
  };

  const loadMorePosts = () => {
    if (isLoadMoreFinished) {
      setIsLoadMoreFinished(false);
      setLastKey(posts.lastKey);
    }
  };

  const content = fetchedPosts ? (
    <PostList
      posts={fetchedPosts}
      loadMore={loadMorePosts}
      hasMore={posts.count > fetchedPosts.length}
      refreshPosts={refreshPosts}
    />
  ) : null;

  const noPostsMessage =
    posts.count === 0 && !isLoading ? (
      <Box
        justifyContent="center"
        display="flex"
        mx="auto"
        my="2vh"
        width="20vw"
      >
        <AlertMessage severity="info" title="No posts" />
      </Box>
    ) : null;

  return (
    <>
      {content}
      {noPostsMessage}
    </>
  );
};

export default FeedView;
