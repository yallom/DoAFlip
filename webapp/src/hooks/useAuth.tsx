import { loginRequest, logoutRequest, registerRequest, type RegisterPayload } from '@/hooks/queries/auth';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useUser } from '@/hooks/useUser';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    register: (payload: RegisterPayload) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { fetchUser, clearUser } = useUser();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return !!localStorage.getItem('token');
    });

    const login = async (email: string, password: string) => {
        try {
            const token = await loginRequest({ email, password });

            if (!token) {
                console.error('Falha ao logar: token não recebido.');
                return false;
            }

            localStorage.setItem('token', token);
            setIsLoggedIn(true);

            await fetchUser();
            return true;
        } catch (error) {
            console.error('Falha ao logar:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
            return true;
        } catch (error) {
            console.error('Falha ao fazer logout:', error);
            return false;
        } finally {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            clearUser();
        }
    };

    const register = async (payload: RegisterPayload) => {
        try {
            const token = await registerRequest(payload);

            if (!token) {
                console.error('Falha ao registar: token não recebido.');
                return false;
            }

            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            await fetchUser();
            return true;
        } catch (error) {
            console.error('Falha ao registar:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
