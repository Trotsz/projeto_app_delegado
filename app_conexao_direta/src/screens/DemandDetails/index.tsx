import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useDemandById, useDeleteDemand } from '../../services/queries/useDemands';
import { theme } from '../../theme';

interface DemandDetailsScreenProps {
  demandId: number;
  onGoBack?: () => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  ONGOING: { label: 'Em andamento', color: theme.colors.bluePill },
  SOLVED: { label: 'Resolvida', color: theme.colors.green },
};

export default function DemandDetailsScreen({ demandId, onGoBack }: DemandDetailsScreenProps) {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const { data: demand, isLoading } = useDemandById(demandId);
  const deleteDemand = useDeleteDemand();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isOwner = user && demand && demand.authorId === user.id;
  const status = demand ? statusConfig[demand.status] || statusConfig.ONGOING : null;

  async function handleDelete() {
    try {
      await deleteDemand.mutateAsync(demandId);
      onGoBack?.();
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Erro ao excluir demanda';
      setDeleteError(msg || 'Erro ao excluir demanda');
    }
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!demand) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Demanda não encontrada</Text>
        <TouchableOpacity style={styles.backBtnCentered} onPress={onGoBack}>
          <Text style={styles.backBtnCenteredText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const categoryLabel = demand.category || 'Sem categoria';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={onGoBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes da Demanda</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {deleteError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{deleteError}</Text>
          </View>
        )}

        <View style={styles.card}>
          {status && (
            <View style={[styles.statusPill, { backgroundColor: status.color }]}>
              <Text style={styles.statusText}>{status.label}</Text>
            </View>
          )}

          <Text style={styles.demandTitle}>{demand.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Categoria</Text>
            <Text style={styles.metaValue}>{categoryLabel}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Autor</Text>
            <Text style={styles.metaValue}>{demand.author.name}</Text>
          </View>

          {demand.description ? (
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionLabel}>Descrição</Text>
              <Text style={styles.descriptionText}>{demand.description}</Text>
            </View>
          ) : null}
        </View>

        {isOwner && !confirmingDelete && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setConfirmingDelete(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteBtnIcon}>🗑️</Text>
            <Text style={styles.deleteBtnText}>Excluir demanda</Text>
          </TouchableOpacity>
        )}

        {isOwner && confirmingDelete && (
          <View style={styles.deleteConfirmRow}>
            <Text style={styles.deleteConfirmText}>Tem certeza que deseja excluir?</Text>
            <View style={styles.deleteConfirmButtons}>
              <TouchableOpacity
                style={styles.deleteConfirmYes}
                onPress={handleDelete}
                activeOpacity={0.8}
              >
                <Text style={styles.deleteConfirmYesText}>Sim, excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteConfirmNo}
                onPress={() => {
                  setConfirmingDelete(false);
                  setDeleteError(null);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.deleteConfirmNoText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: theme.colors.text,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 48,
  },
  errorText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  },
  backBtnCentered: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  backBtnCenteredText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  errorBanner: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  errorBannerText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.red,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    ...theme.shadow.md,
  },
  statusPill: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
  },
  statusText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.white,
  },
  demandTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xxl,
    color: theme.colors.text,
    lineHeight: 34,
    marginBottom: theme.spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  metaLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  metaValue: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  descriptionSection: {
    marginTop: theme.spacing.md,
  },
  descriptionLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  descriptionText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    lineHeight: 24,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: theme.colors.red,
    borderRadius: theme.borderRadius.sm,
  },
  deleteBtnIcon: {
    fontSize: 18,
  },
  deleteBtnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.red,
  },
  deleteConfirmRow: {
    marginTop: theme.spacing.lg,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  deleteConfirmText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.red,
    textAlign: 'center',
  },
  deleteConfirmButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  deleteConfirmYes: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: theme.colors.red,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  deleteConfirmYesText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  deleteConfirmNo: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  deleteConfirmNoText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
});
