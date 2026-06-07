import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '../../services/api';
import { theme } from '../../theme';

interface Props {
  onNavigateToLogin?: () => void;
}

export default function CadastroScreen({ onNavigateToLogin }: Props) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ name: false, email: false, password: false });
  const [apiError, setApiError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleRegister() {
    const newErrors = {
      name: !name,
      email: !email || !emailRegex.test(email),
      password: !password,
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }

    setApiError('');
    setLoading(true);
    try {
      await api.post('/user/register', { name, email, password });
      onNavigateToLogin?.();
    } catch (err) {
      const raw = (err as any)?.response?.data?.message || '';
      const message = raw.split('\n')[0].trim();
      setApiError(message || 'Não foi possível criar a conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + theme.spacing.lg }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topbar}>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.appNameTop}>Conexão Direta</Text>
        </View>

        <Text style={styles.appName}>Criar Conta</Text>
        <Text style={styles.tagline}>
          Junte-se à comunidade e acompanhe as demandas da sua cidade.
        </Text>

        <Text style={styles.label}>Nome completo</Text>
        <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(v) => {
              setName(v);
              setErrors((e) => ({ ...e, name: false }));
            }}
            placeholder="Seu nome"
            placeholderTextColor="rgba(255,255,255,0.35)"
          />
        </View>
        {errors.name && <Text style={styles.errorText}>Nome é obrigatório</Text>}

        <Text style={styles.label}>Email</Text>
        <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
          <Text style={styles.inputIcon}>✉️</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              setErrors((e) => ({ ...e, email: false }));
            }}
            placeholder="seu@email.com"
            placeholderTextColor="rgba(255,255,255,0.35)"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && (
          <Text style={styles.errorText}>
            {email ? 'Formato de email inválido' : 'Email é obrigatório'}
          </Text>
        )}

        <Text style={styles.label}>Senha</Text>
        <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              setErrors((e) => ({ ...e, password: false }));
            }}
            placeholder="••••••••"
            placeholderTextColor="rgba(255,255,255,0.35)"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.inputIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>Senha é obrigatória</Text>}

        {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}

        <TouchableOpacity
          style={[styles.btnRegister, loading && styles.btnDisabled]}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.btnRegisterText}>{loading ? 'Criando...' : 'Criar Conta'}</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou cadastre-se com</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.btnSocialGoogle}>
          <Text style={styles.socialIcon}>🔵</Text>
          <Text style={styles.socialLabel}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSocialGov}>
          <Text style={styles.socialIcon}>🟡</Text>
          <Text style={styles.socialLabelGov}>Gov.br</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLinkWrapper} onPress={onNavigateToLogin}>
          <Text style={styles.loginLink}>
            Já tem conta? <Text style={styles.loginLinkHighlight}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  scroll: {
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  backArrow: {
    fontSize: 28,
    color: theme.colors.white,
  },
  appNameTop: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  appName: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    fontWeight: '800',
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: theme.spacing.md,
    paddingHorizontal: 14,
  },
  inputIcon: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.4)',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  inputError: {
    borderColor: theme.colors.red,
  },
  errorText: {
    color: theme.colors.red,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    marginTop: -theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  apiErrorText: {
    color: theme.colors.red,
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.redLight,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  eyeBtn: {
    padding: 4,
  },
  btnRegister: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnRegisterText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.08,
    textTransform: 'uppercase',
  },
  btnSocialGoogle: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  btnSocialGov: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  socialIcon: {
    fontSize: 16,
  },
  socialLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  socialLabelGov: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  loginLink: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  loginLinkWrapper: {
    alignItems: 'center',
  },
  loginLinkHighlight: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
});
