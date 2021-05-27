import React, { useContext, useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Post } from 'types/posts';
import { theme } from 'layouts/Theme';
import useReactToPost from 'hooks/posts/useReactToPost';
import { UserContext } from 'context/userContext';
import { useToasts } from 'react-toast-notifications';

export interface LikePostButtonProps {
  post: Post;
  successAction: () => void;
  fullWidth?: boolean;
}

const useStyles = makeStyles(() => ({
  liked: {
    color: theme.palette.primary.main,
  },
}));

export const LikePostButton: React.FC<LikePostButtonProps> = (
  props: LikePostButtonProps
) => {
  const classes = useStyles();
  const { reactToPost, error } = useReactToPost(props.post.id);
  const { currentUser } = useContext(UserContext);
  const { addToast } = useToasts();
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  useEffect(() => {
    if (!error && buttonClicked) {
      addToast('Added reaction to post successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
      props.successAction();
    } else if (error) {
      addToast('Reaction already added to post', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [buttonClicked, error]);

  const liked = props.post.reactions.find((reaction) => {
    return reaction.user === currentUser.username;
  });

  return (
    <>
      <Button
        onClick={() => {
          reactToPost();
          if (!liked) {
            setButtonClicked(true);
          }
        }}
        disabled={!!liked}
        fullWidth={props.fullWidth}
      >
        {liked ? <strong className={classes.liked}>Liked</strong> : 'Like'}
      </Button>
    </>
  );
};

LikePostButton.defaultProps = {
  fullWidth: false,
};

export default LikePostButton;
