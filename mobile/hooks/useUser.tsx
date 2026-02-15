import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { getMeRequest, type User } from '@/hooks/queries/users';

interface UserContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<User | null>;
  clearUser: () => void;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getMeRequest();
      setUserState(response);
      return response;
    } catch (error) {
      console.error('Falha ao carregar utilizador:', error);
      setUserState(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearUser = useCallback(() => {
    setUserState(null);
  }, []);

  const setUser = useCallback((nextUser: User | null) => {
    setUserState(nextUser);
  }, []);

  const value = useMemo(
    () => ({ user, loading, fetchUser, clearUser, setUser }),
    [user, loading, fetchUser, clearUser, setUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
