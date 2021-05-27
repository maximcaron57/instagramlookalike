import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InfiniteScroll from 'react-infinite-scroller';
import { Post } from 'types/posts';
import { createStyles, makeStyles } from '@material-ui/core';
import { PostCard } from './PostCard';
import LoadingSpinner from '../LoadingSpinner';

export interface PostListProps {
  posts: Post[];
  refreshPosts: () => void;
  loadMore: () => void;
  hasMore: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    cardList: {
      display: 'flex',
    },
  })
);

export const PostList = (props: PostListProps) => {
  const { posts, refreshPosts, loadMore, hasMore } = props;
  const classes = useStyles();

  return (
    <Box mt={2}>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        threshold={50}
        loader={<LoadingSpinner key={0} />}
      >
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid
              item
              key={post.id}
              xs={12}
              md={4}
              className={classes.cardList}
            >
              <PostCard
                post={post}
                refreshPost={refreshPosts}
                image={post.thumbnail}
                fullSizeImage={false}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default PostList;
