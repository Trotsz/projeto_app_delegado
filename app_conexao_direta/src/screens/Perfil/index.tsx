import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useDemands } from '../../services/queries/useDemands';
import { theme } from '../../theme';

const menuItems = [
  { icon: '👤', label: 'Dados Pessoais', route: 'dados-pessoais', color: theme.colors.accent },
  { icon: '📋', label: 'Minhas Demandas', route: 'minhas-demandas', color: theme.colors.accent },
  { icon: '🔑', label: 'Alterar Senha', route: 'alterar-senha', color: theme.colors.accent },
];

interface PerfilScreenProps {
  onNavigateToSubScreen?: (screen: string) => void;
}

export default function PerfilScreen({ onNavigateToSubScreen }: PerfilScreenProps) {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { data: demands } = useDemands(undefined, user?.id);

  const solved = demands?.filter((d) => d.status === 'SOLVED').length ?? 0;
  const ongoing = demands?.filter((d) => d.status === 'ONGOING').length ?? 0;
  const pending = demands?.filter((d) => d.status === 'PENDING').length ?? 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
    >
      <Text style={styles.topbar}>Perfil</Text>

      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || '?'}</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarEditBtn}
            onPress={() => onNavigateToSubScreen?.('dados-pessoais')}
          >
            <Text style={styles.avatarEditIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Cidade, Estado</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumberGreen}>{solved}</Text>
          <Text style={styles.statLabel}>RESOLVIDAS</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{ongoing}</Text>
          <Text style={styles.statLabel}>EM ANDAMENTO</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumberYellow}>{ongoing}</Text>
          <Text style={styles.statLabel}>PENDENTES</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Configurações</Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          activeOpacity={0.8}
          onPress={() => onNavigateToSubScreen?.(item.route)}
        >
          <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
            <Text style={styles.menuIconText}>{item.icon}</Text>
          </View>
          <Text style={styles.menuText}>{item.label}</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.menuItem, styles.menuItemLogout]}
        onPress={logout}
        activeOpacity={0.8}
      >
        <View style={[styles.menuIcon, styles.menuIconLogout]}>
          <Text style={styles.menuIconText}>🚪</Text>
        </View>
        <Text style={styles.menuTextLogout}>Sair</Text>
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
    paddingBottom: 80,
  },
  topbar: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    padding: theme.spacing.md,
  },
  avatarSection: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  avatarWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#e8eaf6',
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEditIcon: {
    fontSize: 12,
  },
  name: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    fontSize: 14,
  },
  locationText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.text,
  },
  statNumberGreen: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.green,
  },
  statNumberYellow: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.yellow,
  },
  statLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    marginTop: 2,
  },
  sectionLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconText: {
    fontSize: 18,
  },
  menuText: {
    flex: 1,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  menuArrow: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.5)',
  },
  menuItemLogout: {
    backgroundColor: theme.colors.surfaceAlt,
  },
  menuIconLogout: {
    backgroundColor: '#fee2e2',
  },
  menuTextLogout: {
    flex: 1,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: '#dc2626',
  },
});
