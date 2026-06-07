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
import { useAuthStore } from '../../store/useAuthStore';
import { saveAuth } from '../../store/secureStorage';
import { jwtDecode } from '../../utils/jwt';
import api from '../../services/api';
import { theme } from '../../theme';

interface Props {
  onNavigateToCadastro?: () => void;
}

export default function LoginScreen({ onNavigateToCadastro }: Props) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [apiError, setApiError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleLogin() {
    const newErrors = { email: !email, password: !password };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) {
      return;
    }

    setApiError('');
    setLoading(true);
    try {
      const { data } = await api.post('/user/login', { email, password });
      const payload = jwtDecode<{ id: string; name: string; email: string; role: string }>(
        data as string,
      );
      const user = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role as 'ADMIN' | 'USER',
      };
      setAuth(data, user);
      await saveAuth({ token: data, user });
    } catch (err) {
      setApiError((err as any)?.response?.data?.message || 'Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🏛️</Text>
          </View>
          <Text style={styles.appName}>Conexão Direta</Text>
        </View>

        <Text style={styles.heading}>Bem-vindo</Text>
        <Text style={styles.subtext}>Acompanhe as demandas da sua cidade</Text>

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
        {errors.email && <Text style={styles.errorText}>Email é obrigatório</Text>}

        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Senha</Text>
          <TouchableOpacity>
            <Text style={styles.forgotLink}>Esqueceu?</Text>
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.inputIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>Senha é obrigatória</Text>}

        {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}

        <TouchableOpacity
          style={[styles.btnLogin, loading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.btnLoginText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou continue com</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.btnSocialGoogle}>
            <Text style={styles.socialIcon}>🔵</Text>
            <Text style={styles.socialLabelGoogle}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSocialGov}>
            <Text style={styles.socialIcon}>🟡</Text>
            <Text style={styles.socialLabelGov}>Gov.br</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.registerRow, { paddingBottom: insets.bottom + theme.spacing.md }]}>
        <Text style={styles.registerText}>Não tem conta? </Text>
        <TouchableOpacity onPress={onNavigateToCadastro}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 28,
  },
  appName: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  heading: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtext: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
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
  eyeButton: {
    padding: 4,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.accent,
    marginBottom: theme.spacing.xs,
  },
  btnLogin: {
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
  btnLoginText: {
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
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dividerText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.08,
    textTransform: 'uppercase',
  },
  socialRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  btnSocialGoogle: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnSocialGov: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  socialIcon: {
    fontSize: 16,
  },
  socialLabelGoogle: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  socialLabelGov: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
  },
  registerText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  registerLink: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.accent,
  },
});
