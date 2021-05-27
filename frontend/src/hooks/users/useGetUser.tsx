import { useState } from 'react';
import { User } from 'types/users';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetUser(username: string) {
  const [user, setUser] = useState<User>();
  const { isLoading, error } = useFetchFromAPI('getUser', setUser, username);

  return { user, isLoading, error };
}
