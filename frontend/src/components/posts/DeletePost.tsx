import React, { useEffect, useState } from 'react';
import useDeletePost from 'hooks/posts/useDeletePost';
import { Box, Button, useMediaQuery, useTheme } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { useToasts } from 'react-toast-notifications';
import { CancelOutlined, Delete } from '@material-ui/icons';

interface DeletePostProps {
  postId?: string | null;
  successAction: (deletedPostId: string | undefined | null) => void;
  cancelAction: () => void;
}

export const DeletePost = (props: DeletePostProps) => {
  const { postId, successAction, cancelAction } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deletePost, isLoading, error: APIError } = useDeletePost(postId);
  const { addToast } = useToasts();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleDeletePost = () => {
    deletePost();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!APIError && !isLoading) {
      addToast('Post deleted successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
      successAction(postId);
    } else if (APIError) {
      addToast('Could not delete post', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [isLoading, APIError]);

  return (
    <Box display="flex" mb={2}>
      <Box
        display={isMobile ? 'grid' : 'flex'}
        mx={isMobile ? 2 : 'auto'}
        width={isMobile ? 1 : 1 / 3}
      >
        <Box mr={isMobile ? 0 : 1} mb={isMobile ? 1 : 0}>
          <Button
            fullWidth={isMobile}
            onClick={cancelAction}
            variant="outlined"
            startIcon={<CancelOutlined />}
          >
            Cancel
          </Button>
        </Box>
        <Box ml={isMobile ? 0 : 1}>
          <Button
            fullWidth={isMobile}
            onClick={handleDeletePost}
            variant="contained"
            color="primary"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </Box>
      </Box>
      {isLoading && isSubmitting && <LoadingSpinner absolute />}
    </Box>
  );
};

DeletePost.defaultProps = {
  postId: null,
};

export default DeletePost;
