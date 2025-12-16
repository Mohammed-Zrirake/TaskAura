import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch current user session
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await api.get<User>('/auth/user');
        return res.data;
      } catch (err) {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/signout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['authUser'], null);
      queryClient.invalidateQueries();
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ 
      user: user || null, 
      isLoading, 
      isAuthenticated: !!user && !isError,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};