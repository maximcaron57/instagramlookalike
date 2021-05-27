import React from 'react';
import SearchListPosts from './SearchListPosts';
import SearchListHashtags from './SearchListHashtags';
import SearchListUsers from './SearchListUsers';

export interface SearchListProps {
  tab: number;
}

const SearchList: React.FC<SearchListProps> = (props: SearchListProps) => {
  const { tab } = props;

  return (
    <div>
      <div>{tab === 0 && <SearchListUsers />}</div>
      <div>{tab === 1 && <SearchListHashtags />}</div>
      <div>{tab === 2 && <SearchListPosts />}</div>
    </div>
  );
};

export default SearchList;
