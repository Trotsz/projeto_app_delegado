import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useDemands } from '../../services/queries/useDemands';
import { theme } from '../../theme';

const tabs = [
  { key: 'all', label: 'Todas' },
  { key: 'pendentes', label: 'Pendentes' },
  { key: 'andamento', label: 'Em andamento' },
  { key: 'resolvidas', label: 'Resolvidas' },
];

const statusBadge = {
  ONGOING: { label: 'Em andamento', style: 'inProgress' as const },
  SOLVED: { label: 'Resolvida', style: 'solved' as const },
};

interface MinhasDemandasScreenProps {
  onGoBack?: () => void;
}

export default function MinhasDemandasScreen({ onGoBack }: MinhasDemandasScreenProps) {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const { data: demands, isLoading } = useDemands(undefined, user?.id);
  const [activeTab, setActiveTab] = useState('all');

  const filtered = demands?.filter((d) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pendentes') return d.status === 'ONGOING';
    if (activeTab === 'andamento') return d.status === 'ONGOING';
    if (activeTab === 'resolvidas') return d.status === 'SOLVED';
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={onGoBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Demandas</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar demandas..."
          placeholderTextColor={theme.colors.textLight}
        />
      </View>

      <View style={styles.tabsRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered || []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const badge = statusBadge[item.status] || statusBadge.SOLVED;
          return (
            <TouchableOpacity style={styles.demandItem} activeOpacity={0.7}>
              <View style={styles.demandIcon}>
                <Text style={styles.demandIconText}>📌</Text>
              </View>
              <View style={styles.demandBody}>
                <View style={styles.demandHeader}>
                  <Text style={styles.demandTitle}>{item.title}</Text>
                  <View
                    style={[
                      styles.demandBadge,
                      badge.style === 'inProgress' ? styles.badgeInProgress : styles.badgeSolved,
                    ]}
                  >
                    <Text style={styles.demandBadgeText}>{badge.label}</Text>
                  </View>
                </View>
                <Text style={styles.demandDate}>Hoje, 14:30</Text>
                {item.description && (
                  <Text style={styles.demandDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {isLoading ? 'Carregando...' : 'Nenhuma demanda encontrada'}
          </Text>
        }
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
      />

      <TouchableOpacity style={[styles.fab, { bottom: insets.bottom + 24 }]}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backArrow: {
    fontSize: 24,
    color: theme.colors.text,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    margin: theme.spacing.md,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
  },
  tab: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom: -1,
  },
  tabActive: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  tabTextActive: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
  demandItem: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  demandIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demandIconText: {
    fontSize: 20,
  },
  demandBody: {
    flex: 1,
  },
  demandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  demandTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    flex: 1,
  },
  demandBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.full,
  },
  badgePending: {
    backgroundColor: theme.colors.accent,
  },
  badgeInProgress: {
    backgroundColor: theme.colors.bluePill,
  },
  badgeSolved: {
    backgroundColor: theme.colors.green,
  },
  demandBadgeText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.white,
  },
  demandDate: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  demandDesc: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 18,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: theme.spacing.md,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.bluePill,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.lg,
  },
  fabIcon: {
    fontSize: 28,
    color: theme.colors.white,
  },
});
