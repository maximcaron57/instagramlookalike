import React from 'react';
import Box from '@material-ui/core/Box';
import { TabPanel } from 'components/users/settings/TabPanel';
import { EditUserForm } from 'components/users/settings/EditUserForm';

interface EditProfilTabProps {
  value: number;
  index: number;
}

export function EditUserTab(props: EditProfilTabProps) {
  const { value, index } = props;

  return (
    <Box mb={10} width={1}>
      <TabPanel value={value} index={index}>
        <EditUserForm />
      </TabPanel>
    </Box>
  );
}
