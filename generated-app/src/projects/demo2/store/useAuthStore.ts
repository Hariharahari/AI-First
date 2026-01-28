import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (email, password) => {
    if (email === 'rohan@icici.com' && password === 'rohan123') {
      set({
        isAuthenticated: true,
        user: {
          email: 'rohan@icici.com',
          name: 'Rohan Sharma'
        }
      });
      return true;
    }
    return false;
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null
    });
  }
}));