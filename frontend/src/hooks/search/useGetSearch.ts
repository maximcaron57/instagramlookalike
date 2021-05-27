import { useState } from 'react';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';
import {
  initialSearchResults,
  SearchQueryParams,
  SearchResults,
} from 'types/search.results';

export default function useGetSearch(queryParams?: SearchQueryParams) {
  const [searchResults, setSearchResults] = useState<SearchResults>(
    initialSearchResults
  );
  const { isLoading, error } = useQueriedFetchFromAPI(
    'getSearch',
    setSearchResults,
    queryParams
  );

  return { searchResults, isLoading, error };
}
