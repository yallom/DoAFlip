import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
  type RegisterPayload,
} from '@/hooks/queries/auth';
import { clearToken, getToken, setToken } from '@/lib/token';
import { useUser } from '@/hooks/useUser';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => Promise<boolean>;
  loginLoading: boolean;
  registerLoading: boolean;
  logoutLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { fetchUser, clearUser, setUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const bootstrapAuth = useCallback(async () => {
    setIsLoading(true);
    const token = await getToken();
    if (!token) {
      setIsLoggedIn(false);
      clearUser();
      setIsLoading(false);
      return;
    }

    try {
      const isValid = await verifyTokenRequest();
      if (!isValid) {
        await clearToken();
        setIsLoggedIn(false);
        clearUser();
        setIsLoading(false);
        return;
      }

      setIsLoggedIn(true);
      const user = await fetchUser();
      if (!user) {
        await clearToken();
        setIsLoggedIn(false);
        clearUser();
      }
    } catch (error) {
      console.error('Falha ao verificar sessão:', error);
      await clearToken();
      setIsLoggedIn(false);
      clearUser();
    } finally {
      setIsLoading(false);
    }
  }, [clearUser, fetchUser]);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setLoginLoading(true);
      try {
        const token = await loginRequest({ email, password });
        if (!token) return false;
        await setToken(token);
        setIsLoggedIn(true);
        const user = await fetchUser();
        if (!user) {
          await clearToken();
          setIsLoggedIn(false);
          clearUser();
          return false;
        }
        return true;
      } catch (error) {
        console.error('Falha ao logar:', error);
        return false;
      } finally {
        setLoginLoading(false);
      }
    },
    [clearUser, fetchUser],
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<boolean> => {
      setRegisterLoading(true);
      try {
        const token = await registerRequest(payload);
        if (!token) return false;
        await setToken(token);
        setIsLoggedIn(true);
        const user = await fetchUser();
        if (!user) {
          await clearToken();
          setIsLoggedIn(false);
          clearUser();
          return false;
        }
        return true;
      } catch (error) {
        console.error('Falha ao registar:', error);
        return false;
      } finally {
        setRegisterLoading(false);
      }
    },
    [clearUser, fetchUser],
  );

  const logout = useCallback(async (): Promise<boolean> => {
    setLogoutLoading(true);
    try {
      await logoutRequest();
      await clearToken();
      setIsLoggedIn(false);
      clearUser();
      setUser(null);
      return true;
    } catch (error) {
      console.error('Falha ao fazer logout:', error);
      return false;
    } finally {
      setLogoutLoading(false);
    }
  }, [clearUser, setUser]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      isLoading,
      login,
      register,
      logout,
      loginLoading,
      registerLoading,
      logoutLoading,
    }),
    [isLoggedIn, isLoading, login, register, logout, loginLoading, registerLoading, logoutLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
