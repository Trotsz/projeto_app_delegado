import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '../../services/api';
import { theme } from '../../theme';

export default function AlterarSenhaScreen() {
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  function getRequirements() {
    const len = newPassword.length >= 8;
    const num = /\d/.test(newPassword);
    const upper = /[A-Z]/.test(newPassword);
    return { len, num, upper };
  }

  async function handleChange() {
    const reqs = getRequirements();
    if (!reqs.len || !reqs.num || !reqs.upper) {
      Alert.alert('Erro', 'A senha não atende aos requisitos');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    setLoading(true);
    try {
      await api.put('/user/password', {
        currentPassword,
        newPassword,
      });
      Alert.alert('Sucesso', 'Senha alterada com sucesso');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      Alert.alert('Erro', 'Não foi possível alterar a senha');
    } finally {
      setLoading(false);
    }
  }

  const reqs = getRequirements();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + theme.spacing.lg }]}
    >
      <View style={styles.topbar}>
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.topbarTitle}>Alterar Senha</Text>
      </View>

      <Text style={styles.title}>Alterar Senha</Text>
      <Text style={styles.description}>
        Escolha uma senha forte com pelo menos 8 caracteres, incluindo números e letras maiúsculas.
      </Text>

      <Text style={styles.label}>Senha atual</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="••••••••"
          placeholderTextColor={theme.colors.textLight}
          secureTextEntry={!showCurrent}
        />
        <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
          <Text style={styles.eyeIcon}>{showCurrent ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nova senha</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="••••••••"
          placeholderTextColor={theme.colors.textLight}
          secureTextEntry={!showNew}
        />
        <TouchableOpacity onPress={() => setShowNew(!showNew)}>
          <Text style={styles.eyeIcon}>{showNew ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.requirements}>
        <Text style={styles.requirementsTitle}>A senha deve conter:</Text>
        <View style={[styles.reqItem, reqs.len && styles.reqItemMet]}>
          <View style={[styles.reqCircle, reqs.len && styles.reqCircleMet]}>
            {reqs.len && <Text style={styles.reqCheck}>✓</Text>}
          </View>
          <Text style={[styles.reqText, reqs.len && styles.reqTextMet]}>
            Pelo menos 8 caracteres
          </Text>
        </View>
        <View style={[styles.reqItem, reqs.num && styles.reqItemMet]}>
          <View style={[styles.reqCircle, reqs.num && styles.reqCircleMet]}>
            {reqs.num && <Text style={styles.reqCheck}>✓</Text>}
          </View>
          <Text style={[styles.reqText, reqs.num && styles.reqTextMet]}>Pelo menos 1 número</Text>
        </View>
        <View style={[styles.reqItem, reqs.upper && styles.reqItemMet]}>
          <View style={[styles.reqCircle, reqs.upper && styles.reqCircleMet]}>
            {reqs.upper && <Text style={styles.reqCheck}>✓</Text>}
          </View>
          <Text style={[styles.reqText, reqs.upper && styles.reqTextMet]}>
            Pelo menos 1 letra maiúscula
          </Text>
        </View>
      </View>

      <Text style={styles.label}>Confirmar nova senha</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          placeholderTextColor={theme.colors.textLight}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={[styles.btnPrimary, loading && styles.btnDisabled]}
        onPress={handleChange}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.btnPrimaryText}>{loading ? 'Alterando...' : 'Alterar Senha'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnCancel}>
        <Text style={styles.btnCancelText}>Cancelar</Text>
      </TouchableOpacity>

      <Text style={styles.secureBadge}>🔒 CONEXÃO SEGURA</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.md,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  backArrow: {
    fontSize: 24,
    color: theme.colors.text,
  },
  topbarTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.text,
    marginVertical: theme.spacing.lg,
  },
  description: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: 14,
    marginBottom: theme.spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  eyeIcon: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },
  requirements: {
    marginBottom: theme.spacing.md,
  },
  requirementsTitle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: 4,
  },
  reqItemMet: {},
  reqCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: theme.colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reqCircleMet: {
    backgroundColor: theme.colors.green,
    borderColor: theme.colors.green,
  },
  reqCheck: {
    fontSize: 10,
    color: theme.colors.white,
    fontWeight: '800',
  },
  reqText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  reqTextMet: {
    color: theme.colors.green,
  },
  btnPrimary: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnPrimaryText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  btnCancel: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancelText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  secureBadge: {
    textAlign: 'center',
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    letterSpacing: 0.08,
    textTransform: 'uppercase',
    marginTop: theme.spacing.xl,
  },
});
