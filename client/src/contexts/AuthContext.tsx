import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios'; // if you're using axios

// --- TYPES
interface User {
  id: string;
  studentId: string;
  name: string;
  furigana: string;
  romajiName: string;
  grade: string;
  email: string;
  position: string | null;  
  isAdmin: boolean;         
}


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>; // 👈 ADD logout type
}

// --- CONTEXT
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // login logic
    const res = await axios.post('/api/auth/login', { email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    // logout logic
    await axios.post('/api/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
