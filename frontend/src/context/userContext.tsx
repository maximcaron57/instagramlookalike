import { createContext } from 'react';
import { User } from 'types/users';

interface Context {
  setUser?: (x) => void;
  currentUser: User | null;
}

const defaultContext = {
  currentUser: null,
};

export const UserContext = createContext<Context>(defaultContext);
