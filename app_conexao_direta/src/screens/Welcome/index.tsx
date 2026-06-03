import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';

interface WelcomeScreenProps {
  onNavigateToLogin?: () => void;
  onNavigateToCadastro?: () => void;
}

export default function WelcomeScreen({
  onNavigateToLogin,
  onNavigateToCadastro,
}: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroEmoji}>🏛️</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Conexão Direta</Text>
        <Text style={styles.subtitle}>
          Acompanhe as demandas da sua cidade e contribua para uma gestão mais transparente.
        </Text>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={onNavigateToCadastro}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={onNavigateToLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.btnSecondaryText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  heroEmoji: {
    fontSize: 52,
  },
  body: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xxl,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  btnPrimary: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  btnPrimaryText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  btnSecondary: {
    width: '100%',
    height: 48,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1.5,
    borderColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.accent,
  },
});
