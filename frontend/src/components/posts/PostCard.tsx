import React, { useContext, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from '@material-ui/core//CardActions';
import { Post } from 'types/posts';
import { Divider } from '@material-ui/core';
import { ROUTE_PATHS } from 'router/Config';
import PostImage from './PostImage';
import { ModalBox } from '../ModalBox';
import EditPost from './EditPost';
import { UserContext } from '../../context/userContext';
import DeletePost from './DeletePost';
import PostItemCounter from './PostItemCounter';
import { LikePostButton } from './LikePostButton';
import CommentPostButton from './CommentPostButton';
import TagsSection from './TagsSection';

const useStyles = makeStyles(() =>
  createStyles({
    userLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
    card: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    cardContent: {
      display: 'flex',
      height: '100%',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    cardMetrics: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export interface PostCardProps {
  post?: Post | undefined;
  image?: string;
  fullSizeImage?: boolean;
  disableCommentButton?: boolean;
  detailedTags?: boolean;
  refreshPost: () => void;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const { post, refreshPost } = props;
  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { currentUser } = useContext(UserContext);

  const loggedUserButtons =
    currentUser?.username === post?.user ? (
      <>
        <IconButton
          aria-label="Edit post"
          onClick={() => setOpenEditModal(true)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Delete post"
          onClick={() => setOpenDeleteModal(true)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ) : null;

  return post ? (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Link
              to={ROUTE_PATHS.user(post?.user)}
              className={classes.userLink}
            >
              <UserAvatar
                src={post?.userAvatar}
                size="small"
                username={post?.user}
              />
            </Link>
          }
          title={
            <Link
              to={ROUTE_PATHS.user(post?.user)}
              className={classes.userLink}
            >
              {post?.user}
            </Link>
          }
          subheader={
            post?.createdAt !== undefined
              ? new Date(post?.createdAt).toLocaleDateString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })
              : undefined
          }
          action={loggedUserButtons}
        />
        <Divider />
        <Link to={ROUTE_PATHS.post(post?.id)}>
          <PostImage reference={props.image} fullSize={props.fullSizeImage} />
        </Link>
        <Divider />
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" color="textSecondary">
            {post?.description}
          </Typography>
        </CardContent>
        <Divider variant="middle" />

        {props.detailedTags ? (
          <>
            {post?.usertags !== undefined && post?.usertags.length > 0 && (
              <>
                <CardActions className={classes.cardMetrics}>
                  <TagsSection tags={post?.usertags} type="usertags" />
                </CardActions>
                <Divider variant="middle" />
              </>
            )}
            {post?.hashtags !== undefined && post?.hashtags.length > 0 && (
              <>
                <CardActions className={classes.cardMetrics}>
                  <TagsSection tags={post?.hashtags} type="hashtags" />
                </CardActions>
                <Divider variant="middle" />
              </>
            )}
            {post?.reactions !== undefined && post?.reactions.length > 0 && (
              <>
                <CardActions className={classes.cardMetrics}>
                  <TagsSection
                    tags={post?.reactions.map((reaction) => reaction.user)}
                    type="reactions"
                  />
                </CardActions>
                <Divider variant="middle" />
              </>
            )}
          </>
        ) : (
          <CardActions className={classes.cardMetrics}>
            <PostItemCounter items={post?.usertags} type="usertags" />
            <PostItemCounter items={post?.hashtags} type="hashtags" />
            <PostItemCounter items={post?.reactions} type="reactions" />
            <PostItemCounter items={post?.comments} type="comments" />
          </CardActions>
        )}

        <Divider variant="middle" />
        <CardActions className={classes.cardActions}>
          <LikePostButton fullWidth post={post} successAction={refreshPost} />
          <Divider orientation="vertical" flexItem />
          <CommentPostButton
            fullWidth
            post={post}
            successAction={refreshPost}
            disabled={props.disableCommentButton}
          />
        </CardActions>
      </Card>
      <ModalBox
        openModal={openEditModal}
        closeModal={() => setOpenEditModal(false)}
        title="Edit Post"
      >
        <EditPost
          postId={post?.id}
          successAction={() => {
            refreshPost();
            setOpenEditModal(false);
          }}
          existingDescription={post?.description}
          existingUsertags={post?.usertags}
        />
      </ModalBox>
      <ModalBox
        openModal={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        title="Delete Post"
      >
        <DeletePost
          postId={post.id}
          successAction={() => {
            refreshPost();
            setOpenDeleteModal(false);
          }}
          cancelAction={() => setOpenDeleteModal(false)}
        />
      </ModalBox>
    </>
  ) : null;
};

PostCard.defaultProps = {
  disableCommentButton: false,
  fullSizeImage: false,
  detailedTags: false,
};

export default PostCard;
