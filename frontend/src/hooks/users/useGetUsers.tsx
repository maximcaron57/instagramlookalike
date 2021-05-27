import { useState } from 'react';
import { User, UserQueryParams } from 'types/users';
import { initialPagedResults, PagedResults } from 'types/paged.results';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';

export default function useGetUsers(queryParams?: UserQueryParams) {
  const [users, setUsers] = useState<PagedResults<User>>(initialPagedResults);
  const { isLoading, act: getUsers } = useQueriedFetchFromAPI(
    'getUsers',
    setUsers,
    queryParams
  );

  return { users, isLoading, getUsers };
}
