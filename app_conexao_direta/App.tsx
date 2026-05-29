import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './src/store/useAuthStore';
import LoginScreen from './src/screens/Login';
import TabNavigator from './src/components/TabNavigator';

const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {isAuthenticated ? <TabNavigator /> : <LoginScreen />}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
