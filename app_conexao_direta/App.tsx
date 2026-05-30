import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './src/store/useAuthStore';
import LoginScreen from './src/screens/Login';
import CadastroScreen from './src/screens/Cadastro';
import TabNavigator from './src/components/TabNavigator';

const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [screen, setScreen] = useState<'login' | 'cadastro'>('login');

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {!isAuthenticated ? (
          screen === 'login' ? (
            <LoginScreen onNavigateToCadastro={() => setScreen('cadastro')} />
          ) : (
            <CadastroScreen onNavigateToLogin={() => setScreen('login')} />
          )
        ) : (
          <TabNavigator />
        )}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
