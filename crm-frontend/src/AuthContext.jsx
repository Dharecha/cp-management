import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:5010/api/auth/check', {
                credentials: 'include',
            });
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
            setRole(data.role);
        } catch (err) {
            setIsAuthenticated(false);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5010/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setRole(data.role);
                localStorage.setItem('role', data.role);
                return { success: true };
            } else {
                return { success: false, error: 'Invalid credentials' };
            }
        } catch (err) {
            return { success: false, error: 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5010/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsAuthenticated(false);
            setRole(null);
            localStorage.removeItem('role');
        } catch (err) {
            console.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout, checkAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};