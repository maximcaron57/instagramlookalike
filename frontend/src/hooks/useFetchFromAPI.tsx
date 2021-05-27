import { useEffect } from 'react';
import useActOnAPI from './useActOnAPI';

export default function useFetchFromAPI(method, setData, ...params) {
  const { act, isLoading, error } = useActOnAPI(method, setData, ...params);

  useEffect(() => act({}), [...params]);

  return { isLoading, error, act };
}
