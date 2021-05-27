import React, { useState } from 'react';
import SearchTabs from 'components/search/SearchTabs';
import SearchList from 'components/search/SearchList';
import { Box } from '@material-ui/core';

export const SearchView = () => {
  const [showTab, setShowTab] = useState(0);

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      <SearchList tab={showTab} />
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
