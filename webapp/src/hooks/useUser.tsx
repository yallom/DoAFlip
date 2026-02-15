import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getMeRequest, type User } from '@/hooks/queries/users';

interface UserContextType {
    user: User | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        try {
            const userData = await getMeRequest();
            setUser(userData);
        } catch (error) {
            console.error('Falha ao buscar dados do utilizador:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearUser = useCallback(() => {
        setUser(null);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !user) {
            fetchUser();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, fetchUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
