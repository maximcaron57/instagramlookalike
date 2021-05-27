import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import { HelmetHeader } from 'components/HelmetHeader';
import { UserHeader } from 'components/users/header/UserHeader';
import { useToasts } from 'react-toast-notifications';
import { PostQueryParams } from 'types/posts';
import PostList from 'components/posts/PostList';
import _ from 'lodash';

interface ParamTypes {
  username: string;
}

const getQueryParams = (before?: string): PostQueryParams => ({
  before: before || undefined,
});

export const UserView = () => {
  const { username } = useParams<ParamTypes>();
  const { user, error: userError } = useGetUser(username);
  const [lastKey, setLastKey] = useState(undefined);
  const { posts, error: postsError } = useGetUserPosts(
    username,
    getQueryParams(lastKey)
  );
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [isLoadMoreFinished, setIsLoadMoreFinished] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (posts.results.length > 0) {
      setFetchedPosts(_.unionBy(fetchedPosts, posts.results, 'id'));
      setIsLoadMoreFinished(true);
    }
  }, [posts.results]);

  useEffect(() => {
    if (userError) {
      addToast('Could not fetch user', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    if (postsError) {
      addToast('Could not fetch posts', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [userError, postsError]);

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

  const content =
    user && posts ? (
      <Box mt={2}>
        <HelmetHeader
          title={`UGRAM - ${user.firstName} ${user.lastName} (@${user.username})`}
        />
        <Box my={2}>
          <UserHeader
            username={user.username}
            stats={{
              totalPost: posts.count,
            }}
            fullname={`${user.firstName} ${user.lastName}`}
            description={user.description}
            avatarSrc={user.avatarReference}
            createdAt={new Date(user.createdAt)}
          />
        </Box>
        <Box>
          <PostList
            posts={fetchedPosts}
            loadMore={loadMorePosts}
            hasMore={posts.count > fetchedPosts.length}
            refreshPosts={refreshPosts}
          />
        </Box>
      </Box>
    ) : null;

  return <>{content}</>;
};

export default UserView;
