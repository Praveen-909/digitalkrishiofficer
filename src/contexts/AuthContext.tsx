import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'farmer' | 'officer' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  phone?: string;
  email?: string;
  name?: string;
  panchayat?: string;
  district?: string;
  primaryCrops?: string[];
  landSize?: number;
  experience?: number;
  profileCompleted: boolean;
  locale: 'en' | 'ml';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
}

interface LoginCredentials {
  type: 'phone' | 'email';
  phone?: string;
  email?: string;
  password?: string;
  otp?: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration - in real app, this would come from backend
const mockUsers: User[] = [
  {
    id: '1',
    role: 'farmer',
    phone: '+91 9876543210',
    name: 'രാജേഷ് കുമാർ',
    panchayat: 'കൊട്ടയം',
    district: 'കൊട്ടയം',
    primaryCrops: ['വാഴ', 'റബ്ബർ', 'നെല്ല്'],
    landSize: 2.5,
    experience: 15,
    profileCompleted: true,
    locale: 'ml'
  },
  {
    id: '2',
    role: 'officer',
    email: 'officer@agriculture.kerala.gov.in',
    name: 'Dr. Priya Nair',
    district: 'കൊട്ടയം',
    profileCompleted: true,
    locale: 'en'
  },
  {
    id: '3',
    role: 'admin',
    email: 'admin@agriculture.kerala.gov.in',
    name: 'സുരേഷ് കുമാർ (Block Officer)',
    district: 'എറണാകുളം',
    profileCompleted: true,
    locale: 'en'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [otpStore, setOtpStore] = useState<Record<string, { otp: string; expiry: number }>>({});

  useEffect(() => {
    // Check for saved user session
    try {
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('auth-token');
      
      if (savedUser && token) {
        const parsedUser = JSON.parse(savedUser);
        // Validate parsed user has required properties
        if (parsedUser && parsedUser.id && parsedUser.role) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          // Invalid user data, clear it
          localStorage.removeItem('user');
          localStorage.removeItem('auth-token');
        }
      }
    } catch (error) {
      // Invalid saved data, clear it
      console.warn('Failed to parse saved user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('auth-token');
    }
  }, []);

  const sendOtp = async (phone: string): Promise<void> => {
    try {
      // Simulate OTP generation and SMS sending
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
      
      setOtpStore(prev => ({
        ...prev,
        [phone]: { otp, expiry }
      }));

      // In real app, this would send SMS via gateway
      console.log(`OTP for ${phone}: ${otp}`);
      
      // Simulate network delay
      return new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw new Error('Failed to send OTP. Please try again.');
    }
  };

  const verifyOtp = async (phone: string, otp: string): Promise<void> => {
    const storedOtp = otpStore[phone];
    
    if (!storedOtp) {
      throw new Error('OTP not found or expired');
    }
    
    if (Date.now() > storedOtp.expiry) {
      throw new Error('OTP expired');
    }
    
    if (storedOtp.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Clear used OTP
    setOtpStore(prev => {
      const newStore = { ...prev };
      delete newStore[phone];
      return newStore;
    });

    // Find or create user
    let existingUser = mockUsers.find(u => u.phone === phone);
    
    if (!existingUser) {
      // Create new farmer user
      existingUser = {
        id: Date.now().toString(),
        role: 'farmer',
        phone,
        profileCompleted: false,
        locale: 'ml'
      };
      mockUsers.push(existingUser);
    }

    const token = `mock-jwt-token-${existingUser.id}`;
    
    setUser(existingUser);
    setIsAuthenticated(true);
    
    localStorage.setItem('user', JSON.stringify(existingUser));
    localStorage.setItem('auth-token', token);
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    if (credentials.type === 'phone' && credentials.otp) {
      await verifyOtp(credentials.phone!, credentials.otp);
      return;
    }

    if (credentials.type === 'email') {
      // Mock email/password validation
      const user = mockUsers.find(u => 
        u.email === credentials.email && 
        u.role === credentials.role
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // In real app, validate password hash
      if (credentials.password !== 'password123') {
        throw new Error('Invalid password');
      }

      const token = `mock-jwt-token-${user.id}`;
      
      setUser(user);
      setIsAuthenticated(true);
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth-token', token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update mock data
    const userIndex = mockUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      updateProfile,
      sendOtp,
      verifyOtp
    }}>
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