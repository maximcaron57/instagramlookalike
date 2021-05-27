import React from 'react';
import { Box, Button, createStyles, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from 'router/Config';
import PostIcon from './PostIcon';

export interface TagsSectionProps {
  tags: any;
  type: 'usertags' | 'hashtags' | 'reactions';
}

const useStyles = makeStyles(() =>
  createStyles({
    tagBox: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    tagText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '125px',
    },
  })
);

export const TagsSection: React.FC<TagsSectionProps> = (
  props: TagsSectionProps
) => {
  const { tags } = props;
  const classes = useStyles();

  const buildLink = (tag) => {
    return props.type === 'hashtags'
      ? ROUTE_PATHS.feed(`hashtag=${tag}`)
      : ROUTE_PATHS.user(tag);
  };

  return tags.length > 0 ? (
    <Box className={classes.tagBox}>
      <PostIcon type={props.type} />
      {tags.map((tag, id) => (
        <Link to={buildLink(tag)} key={tag.concat(id.toString())}>
          <Button size="small" color="primary" title={tag}>
            <span className={classes.tagText}>{tag}</span>
          </Button>
        </Link>
      ))}
    </Box>
  ) : null;
};

export default TagsSection;
