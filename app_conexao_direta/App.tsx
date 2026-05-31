import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './src/store/useAuthStore';
import { loadAuth } from './src/store/secureStorage';
import LoginScreen from './src/screens/Login';
import CadastroScreen from './src/screens/Cadastro';
import TabNavigator from './src/components/TabNavigator';

const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [screen, setScreen] = useState<'login' | 'cadastro'>('login');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadAuth().then((data) => {
      if (data) useAuthStore.getState().setAuth(data.token, data.user);
      setReady(true);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {!ready ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : !isAuthenticated ? (
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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
