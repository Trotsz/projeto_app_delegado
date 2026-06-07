import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import { useAuthStore } from './src/store/useAuthStore';
import { loadAuth } from './src/store/secureStorage';
import WelcomeScreen from './src/screens/Welcome';
import LoginScreen from './src/screens/Login';
import CadastroScreen from './src/screens/Cadastro';
import TabNavigator from './src/components/TabNavigator';

const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [rootScreen, setRootScreen] = useState<'welcome' | 'login' | 'cadastro'>('welcome');
  const [authReady, setAuthReady] = useState(false);
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_500Medium,
    NunitoSans_700Bold,
  });

  useEffect(() => {
    loadAuth().then((data) => {
      if (data) useAuthStore.getState().setAuth(data.token, data.user);
      setAuthReady(true);
    });
  }, []);

  const ready = fontsLoaded && authReady;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {!ready ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : !isAuthenticated ? (
          rootScreen === 'welcome' ? (
            <WelcomeScreen
              onNavigateToLogin={() => setRootScreen('login')}
              onNavigateToCadastro={() => setRootScreen('cadastro')}
            />
          ) : rootScreen === 'login' ? (
            <LoginScreen onNavigateToCadastro={() => setRootScreen('cadastro')} />
          ) : (
            <CadastroScreen onNavigateToLogin={() => setRootScreen('login')} />
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
