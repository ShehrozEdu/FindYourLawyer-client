import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import apiService from '../utility/apiService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await apiService.get('/users/me');
            if (response.data.status && response.data.user) {
                setUser(response.data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            // 401 is expected when user is not logged in - silently handle it
            if (error.response?.status === 401) {
                console.log('Auth check: User not authenticated');
            } else {
                console.error('Auth check error:', error);
            }
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await apiService.post('/users/login', {
                Email: email,
                Password: password
            });

            if (response.data.status && response.data.user) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, user: response.data.user };
            }
            return { success: false, error: 'Login failed' };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const signup = async (userData) => {
        try {
            const response = await apiService.post('/users/signup', userData);

            if (response.data.status && response.data.user) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, user: response.data.user };
            }
            return { success: false, error: 'Signup failed' };
        } catch (error) {
            console.error('Signup error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Signup failed'
            };
        }
    };

    const loginWithGoogle = async (credential) => {
        try {
            // For Google OAuth, you might need a separate endpoint
            // For now, we'll just decode the JWT and set the user
            const response = await apiService.post('/users/google-auth', {
                credential
            });

            if (response.data.status && response.data.user) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, error: 'Google login failed' };
        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, error: 'Google login failed' };
        }
    };

    const logout = async () => {
        try {
            await apiService.post('/users/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    // Role helper functions
    const isLawyer = useMemo(() => {
        return user?.isLawyer === true;
    }, [user]);

    const isClient = useMemo(() => {
        return user?.isLawyer === false || (user && !user.isLawyer);
    }, [user]);

    const isAdmin = useMemo(() => {
        return user?.isAdmin === true || user?.isSuperAdmin === true;
    }, [user]);

    const isSuperAdmin = useMemo(() => {
        return user?.isSuperAdmin === true;
    }, [user]);

    const value = {
        user,
        loading,
        isAuthenticated,
        isLawyer,
        isClient,
        isAdmin,
        isSuperAdmin,
        login,
        signup,
        loginWithGoogle,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
