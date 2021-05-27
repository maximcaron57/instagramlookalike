import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() =>
  createStyles({
    smallSize: {
      paddingTop: '56.25%',
      backgroundSize: 'contain',
      backgroundColor: 'black',
    },
    fullSize: {
      paddingTop: '100%',
      backgroundSize: 'contain',
      backgroundColor: 'black',
    },
  })
);

export interface PostImageProps {
  reference?: string;
  fullSize?: boolean;
}

export const PostImage: React.FC<PostImageProps> = (props: PostImageProps) => {
  const { reference } = props;
  const classes = useStyles();

  return (
    <CardMedia
      className={props.fullSize ? classes.fullSize : classes.smallSize}
      image={reference}
      component="div"
    />
  );
};

PostImage.defaultProps = {
  fullSize: false,
};

export default PostImage;
