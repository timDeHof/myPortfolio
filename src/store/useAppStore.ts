import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark' | 'system';
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: false,
      error: null,
      theme: 'system',
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);