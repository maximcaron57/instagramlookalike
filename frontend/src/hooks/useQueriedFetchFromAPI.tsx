import { useEffect } from 'react';
import useActOnAPI from './useActOnAPI';

// TODO : Ideally, this would be merged with useFetchFromAPI
export default function useQueriedFetchFromAPI(
  method,
  setData,
  queryParams,
  ...params
) {
  const { act, isLoading, error } = useActOnAPI(
    method,
    setData,
    queryParams,
    ...params
  );

  useEffect(() => act({}), [JSON.stringify(queryParams), ...params]);

  return { isLoading, error, act };
}
