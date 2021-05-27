import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import InfiniteScroll from 'react-infinite-scroller';
import useGetPosts from 'hooks/posts/useGetPosts';
import { PostQueryParams } from 'types/posts';

import { Link } from 'react-router-dom';
import { CardMedia, useMediaQuery } from '@material-ui/core';

import { ROUTE_PATHS } from 'router/Config';
import _ from 'lodash';
import useQuery from '../../hooks/useQuery';
import LoadingSpinner from '../LoadingSpinner';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: '100%',
    },
    media: {
      paddingTop: '100%',
      backgroundSize: 'contain',
      '&:hover': {
        opacity: 0.6,
      },
    },
    loadingText: {
      fontSize: '15px',
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
  })
);

const getPostQueryParams = (
  searchValue: string,
  before: string,
  limit: number
): PostQueryParams => ({
  description: searchValue || undefined,
  before: before || undefined,
  limit: limit || undefined,
});

const SearchListPosts: React.FC = () => {
  const numberPerPage = 12;

  const classes = useStyles();
  const searchValue = useQuery().get('value');
  const mobile = useMediaQuery('(max-width:600px)');
  const pad = useMediaQuery('(max-width:840px)');
  let col = 4;
  if (mobile) {
    col = 1;
  } else if (pad) {
    col = 3;
  }
  const [lastKey, setLastKey] = useState(undefined);
  const { posts } = useGetPosts(
    getPostQueryParams(searchValue, lastKey, numberPerPage)
  );
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    setFetchedPosts([]);
    setLastKey(undefined);
    posts.results = [];
  }, [searchValue]);

  useEffect(() => {
    const concatPosts = _.unionBy(fetchedPosts, posts.results, 'id');
    setFetchedPosts(concatPosts);
    setIsFetching(false);
  }, [posts.results]);

  const loadMorePosts = () => {
    if (!isFetching && fetchedPosts.length > 0) {
      setLastKey(posts.lastKey);
    }
  };

  return (
    <div className={classes.root}>
      <div
        id="scrollTable"
        style={{ width: '100%', overflow: 'auto', maxHeight: 720 }}
      >
        <InfiniteScroll
          loadMore={loadMorePosts}
          hasMore={posts.count > fetchedPosts.length}
          threshold={50}
          useWindow={false}
          loader={<LoadingSpinner key={0} />}
        >
          <GridList cellHeight="auto" className={classes.gridList} cols={col}>
            {fetchedPosts.map((post) => (
              <GridListTile key={post.id} rows={1}>
                <Link to={ROUTE_PATHS.post(post?.id)}>
                  <CardMedia
                    className={classes.media}
                    image={post.reference}
                    component="div"
                  />
                </Link>
              </GridListTile>
            ))}
          </GridList>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchListPosts;
