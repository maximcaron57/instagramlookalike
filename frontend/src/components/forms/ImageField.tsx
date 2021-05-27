import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import { FormControl, makeStyles } from '@material-ui/core';
import defaultImage from '../../assets/defaultImage.jpg';

interface ImageFieldProps extends FieldProps {
  label: string;
  placeholder: string;
}

const useStyles = makeStyles(() => ({
  browseButton: {
    marginBottom: '10px',
    overflow: 'hidden',
  },
  browseButtonLabel: {
    display: 'flex',
    width: '250px',
  },
  image: {
    maxHeight: '250px',
    objectFit: 'contain',
  },
}));

export const ImageField: React.FC<ImageFieldProps> = ({ field, form }) => {
  const [reference, setReference] = useState<string | ArrayBuffer | null>(
    defaultImage
  );
  const classes = useStyles();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
    const newFile = event.target.files[0];

    const reader = new FileReader();

    if (newFile) {
      reader.onloadend = () => {
        handleReferenceChange(reader.result);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleReferenceChange = (newReference) => {
    setReference(newReference);
    form.setFieldValue(field.name, newReference);
  };

  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormControl fullWidth error={!!errorText}>
      <label htmlFor="icon-button-file" className={classes.browseButtonLabel}>
        <input
          accept="image/*"
          className={classes.browseButton}
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
        />
      </label>
      {typeof reference === 'string' && (
        <img className={classes.image} src={reference} alt="" />
      )}
      <FormControl>{errorText}</FormControl>
    </FormControl>
  );
};

export default ImageField;
