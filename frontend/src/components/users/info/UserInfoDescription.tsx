import React from 'react';
import Box from '@material-ui/core/Box';

export interface UserInfoDescriptionProps {
  fullname: string;
  description?: string | null;
}

UserInfoDescription.defaultProps = {
  description: null,
};

export function UserInfoDescription(props: UserInfoDescriptionProps) {
  const { fullname, description } = props;

  return (
    <Box>
      <div id="UserInfoDescriptionFullName">
        <b>{fullname}</b>
      </div>
      <div id="UserInfoDescriptionDescription">{description}</div>
    </Box>
  );
}
