import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useDemands,
  useApproveDemand,
  useDisapproveDemand,
} from '../../services/queries/useDemands';
import { theme } from '../../theme';

interface Props {
  onDemandPress?: (demandId: number) => void;
}

export default function AprovarDemandasScreen({ onDemandPress }: Props) {
  const insets = useSafeAreaInsets();
  const { data: demands, isLoading } = useDemands();
  const approveDemand = useApproveDemand();
  const disapproveDemand = useDisapproveDemand();
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const pending = demands?.filter((d) => !d.approved) || [];

  async function handleApprove(id: number) {
    await approveDemand.mutateAsync(id);
  }

  async function handleDisapprove(id: number) {
    await disapproveDemand.mutateAsync(id);
    setConfirmingId(null);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topbar}>
        <Text style={styles.topbarTitle}>Aprovar Demandas</Text>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={pending}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => onDemandPress?.(item.id)}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardAuthor}>por {item.author.name}</Text>
                {item.description && (
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                )}
              </TouchableOpacity>

              {confirmingId === item.id ? (
                <View style={styles.confirmRow}>
                  <Text style={styles.confirmText}>Rejeitar esta demanda?</Text>
                  <View style={styles.confirmButtons}>
                    <TouchableOpacity
                      style={styles.confirmYes}
                      onPress={() => handleDisapprove(item.id)}
                    >
                      <Text style={styles.confirmYesText}>Sim, rejeitar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmNo}
                      onPress={() => setConfirmingId(null)}
                    >
                      <Text style={styles.confirmNoText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.approveBtn}
                    onPress={() => handleApprove(item.id)}
                  >
                    <Text style={styles.approveBtnText}>✓ Aprovar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => setConfirmingId(item.id)}
                  >
                    <Text style={styles.rejectBtnText}>✕ Rejeitar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyIcon}>✅</Text>
              <Text style={styles.emptyText}>Nenhuma demanda pendente de aprovação</Text>
            </View>
          }
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 100 }]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  topbar: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  topbarTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
  },
  list: {
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.sm,
  },
  cardTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    marginBottom: 4,
  },
  cardAuthor: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  cardDesc: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  approveBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: theme.colors.green,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  approveBtnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  rejectBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: theme.colors.red,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  rejectBtnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  confirmRow: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.redLight,
    borderWidth: 1,
    borderColor: theme.colors.redBorder,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  confirmText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.red,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  confirmYes: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: theme.colors.red,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  confirmYesText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  confirmNo: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  confirmNoText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});
