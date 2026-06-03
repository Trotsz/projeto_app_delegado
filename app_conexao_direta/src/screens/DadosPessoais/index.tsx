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
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { theme } from '../../theme';

interface DadosPessoaisScreenProps {
  onGoBack?: () => void;
}

export default function DadosPessoaisScreen({ onGoBack }: DadosPessoaisScreenProps) {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Erro', 'Preencha o nome');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.put('/user/profile', { name });
      if (token) setAuth(token, data);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso');
    } catch (err) {
      const message =
        (err as any)?.response?.data?.message || 'Não foi possível atualizar os dados';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + theme.spacing.lg }]}
    >
      <View style={styles.topbar}>
        <TouchableOpacity onPress={onGoBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Dados Pessoais</Text>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || '?'}</Text>
          </View>
          <TouchableOpacity style={styles.avatarEditBtn}>
            <Text style={styles.avatarEditIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
        <TouchableOpacity>
          <Text style={styles.changePhoto}>Alterar foto</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nome completo</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>👤</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Seu nome"
          placeholderTextColor={theme.colors.textLight}
        />
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={[styles.inputWrapper, styles.inputDisabled]}>
        <Text style={styles.inputIcon}>✉️</Text>
        <TextInput
          style={styles.input}
          value={user?.email || ''}
          editable={false}
          placeholder="seu@email.com"
          placeholderTextColor={theme.colors.textLight}
        />
      </View>

      <TouchableOpacity
        style={[styles.btnSave, loading && styles.btnDisabled]}
        onPress={handleSave}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.btnSaveText}>{loading ? 'Salvando...' : 'Salvar Alterações'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnDiscard} onPress={onGoBack}>
        <Text style={styles.btnDiscardText}>Descartar</Text>
      </TouchableOpacity>
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
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  avatarWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: theme.fonts.bold,
    fontSize: 36,
    color: theme.colors.white,
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEditIcon: {
    fontSize: 14,
  },
  name: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
    marginBottom: 4,
  },
  changePhoto: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
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
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceAlt,
    marginBottom: theme.spacing.md,
  },
  inputIcon: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    backgroundColor: 'transparent',
  },
  inputDisabled: {
    opacity: 0.6,
  },
  btnSave: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnSaveText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  btnDiscard: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDiscardText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
});
