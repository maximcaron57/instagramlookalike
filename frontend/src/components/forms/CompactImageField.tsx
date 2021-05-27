import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import { FormControl, IconButton, makeStyles } from '@material-ui/core';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import defaultImage from '../../assets/defaultImage.jpg';

interface CompactImageFieldProps extends FieldProps {
  label: string;
  placeholder?: string;
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
  input: {
    display: 'none',
  },
}));

export const CompactImageField: React.FC<CompactImageFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const [reference, setReference] = useState<string | ArrayBuffer | null>(
    props.placeholder || defaultImage
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
        setReference(reader.result);
        form.setFieldValue(field.name, reader.result);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormControl fullWidth error={!!errorText}>
      <div>
        <label htmlFor="icon-button-file">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <UserAvatar src={reference?.toString()} username={props.label} />
          </IconButton>
        </label>
      </div>
      <FormControl>{errorText}</FormControl>
    </FormControl>
  );
};

export default CompactImageField;
