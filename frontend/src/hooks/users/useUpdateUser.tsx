import { useState } from 'react';
import { User, UserModificationParams } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useUpdateUser(
  username: string,
  userModificationParams: UserModificationParams | undefined
) {
  const [user, setUser] = useState<User>();
  const { act: updateUser, isLoading, error, setError } = useActOnAPI(
    'updateUser',
    setUser,
    username,
    userModificationParams
  );

  return { updateUser, user, isLoading, error, setError };
}
