import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';

interface User {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser || null);
    setLoading(false);

    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    const newUser = await auth.signUp(email, password);
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const loggedInUser = await auth.signIn(email, password);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
