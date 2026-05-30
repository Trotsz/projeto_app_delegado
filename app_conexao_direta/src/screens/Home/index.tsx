import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardDemanda from '../../components/CardDemanda';
import { useDemands } from '../../services/queries/useDemands';
import { theme } from '../../theme';

const categories = [
  { key: 'all', label: 'Todas' },
  { key: 'infra', label: 'Infraestrutura' },
  { key: 'saude', label: 'Saúde' },
  { key: 'educacao', label: 'Educação' },
  { key: 'seguranca', label: 'Segurança' },
  { key: 'meio-ambiente', label: 'Meio Ambiente' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: demands, isLoading } = useDemands();
  const [activeFilter, setActiveFilter] = React.useState('all');

  const pendingCount = demands?.filter((d) => d.status === 'ONGOING').length || 0;
  const solvedCount = demands?.filter((d) => d.status === 'SOLVED').length || 0;
  const totalCount = demands?.length || 0;

  const renderHeader = () => (
    <>
      <Text style={styles.headline}>Como podemos{'\n'}ajudar?</Text>
      <Text style={styles.subheadline}>Acompanhe as demandas e obras da sua cidade</Text>

      <TouchableOpacity style={styles.btnNovaDemanda} activeOpacity={0.8}>
        <Text style={styles.btnIcon}>➕</Text>
        <Text style={styles.btnText}>Nova Demanda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnMapa} activeOpacity={0.8}>
        <Text style={styles.btnIcon}>🗺️</Text>
        <Text style={styles.btnText}>Ver Mapa de Demandas</Text>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        <View style={styles.statBoxOrange}>
          <Text style={styles.statNumber}>{totalCount - solvedCount}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
        <View style={styles.statBoxBlue}>
          <Text style={styles.statNumber}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Em andamento</Text>
        </View>
        <View style={styles.statBoxGreen}>
          <Text style={styles.statNumber}>{solvedCount}</Text>
          <Text style={styles.statLabel}>Resolvidas</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Demandas Recentes</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
        contentContainerStyle={styles.filtersContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === item.key ? styles.filterChipActive : styles.filterChipInactive,
            ]}
            onPress={() => setActiveFilter(item.key)}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === item.key
                  ? styles.filterChipTextActive
                  : styles.filterChipTextInactive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {isLoading ? <Text style={styles.emptyText}>Carregando...</Text> : null}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View style={styles.topbarLeft}>
          <View style={styles.appIcon}>
            <Text style={styles.appIconText}>🏛️</Text>
          </View>
          <View>
            <Text style={styles.appName}>Citizen Connect</Text>
            <Text style={styles.appSubtitle}>App Delegado</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={renderHeader}
        data={demands || []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CardDemanda demand={item} onPress={() => {}} />
          </View>
        )}
        ListEmptyComponent={
          !isLoading ? <Text style={styles.emptyText}>Nenhuma demanda encontrada</Text> : null
        }
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
      />
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
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  topbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  appIcon: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 18,
  },
  appName: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  appSubtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  bellBtn: {
    padding: 4,
  },
  bellIcon: {
    fontSize: 20,
  },
  headline: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.text,
    lineHeight: 34,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  subheadline: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  btnNovaDemanda: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    paddingVertical: 16,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  btnMapa: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  btnIcon: {
    fontSize: 18,
  },
  btnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statBoxOrange: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: 4,
  },
  statBoxBlue: {
    flex: 1,
    backgroundColor: theme.colors.bluePill,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: 4,
  },
  statBoxGreen: {
    flex: 1,
    backgroundColor: theme.colors.green,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    fontWeight: '800',
    color: theme.colors.white,
  },
  statLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  sectionLink: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.accent,
  },
  filters: {
    marginBottom: theme.spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.full,
  },
  filterChipActive: {
    backgroundColor: theme.colors.accent,
  },
  filterChipInactive: {
    backgroundColor: theme.colors.primary,
  },
  filterChipText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
  },
  filterChipTextActive: {
    color: theme.colors.white,
  },
  filterChipTextInactive: {
    color: theme.colors.white,
  },
  cardWrapper: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});
