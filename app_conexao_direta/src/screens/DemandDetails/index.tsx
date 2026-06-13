import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import {
  useDemandById,
  useDeleteDemand,
  useApproveDemand,
  useDisapproveDemand,
  useCompleteDemand,
} from '../../services/queries/useDemands';
import { theme } from '../../theme';
import { getImageUrl } from '../../utils/imageUrl';

interface DemandDetailsScreenProps {
  demandId: number;
  onGoBack?: () => void;
}

const categoryLabels: Record<string, string> = {
  infra: 'Infraestrutura',
  saude: 'Saúde',
  educacao: 'Educação',
  seguranca: 'Segurança',
  'meio-ambiente': 'Meio Ambiente',
  mobilidade: 'Mobilidade',
  limpeza: 'Limpeza Urbana',
  outros: 'Outros',
};

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: theme.colors.accent },
  ONGOING: { label: 'Em andamento', color: theme.colors.bluePill },
  SOLVED: { label: 'Resolvida', color: theme.colors.green },
};

export default function DemandDetailsScreen({ demandId, onGoBack }: DemandDetailsScreenProps) {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const { data: demand, isLoading } = useDemandById(demandId);
  const deleteDemand = useDeleteDemand();
  const approveDemand = useApproveDemand();
  const completeDemand = useCompleteDemand();
  const disapproveDemand = useDisapproveDemand();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [confirmingDisapprove, setConfirmingDisapprove] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const isOwner = user && demand && demand.authorId === user.id;
  const isAdmin = user?.role === 'ADMIN';
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
      setActionError(msg || 'Erro ao excluir demanda');
    }
  }

  async function handleApprove() {
    try {
      await approveDemand.mutateAsync(demandId);
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Erro ao aprovar demanda';
      setActionError(msg || 'Erro ao aprovar demanda');
    }
  }

  async function handleDisapprove() {
    try {
      await disapproveDemand.mutateAsync(demandId);
      onGoBack?.();
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Erro ao rejeitar demanda';
      setActionError(msg || 'Erro ao rejeitar demanda');
    }
  }

  async function handleComplete() {
    try {
      await completeDemand.mutateAsync(demandId);
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Erro ao concluir demanda';
      setActionError(msg || 'Erro ao concluir demanda');
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

  const categoryLabel =
    (demand.category && categoryLabels[demand.category]) || demand.category || 'Sem categoria';

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
        {actionError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{actionError}</Text>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.badgesRow}>
            {status && (
              <View style={[styles.statusPill, { backgroundColor: status.color }]}>
                <Text style={styles.statusText}>{status.label}</Text>
              </View>
            )}
            {!demand.approved && (
              <View style={[styles.statusPill, { backgroundColor: theme.colors.accent }]}>
                <Text style={styles.statusText}>Pendente de aprovação</Text>
              </View>
            )}
          </View>

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

          {demand.imageUrl ? (
            <View style={styles.imageSection}>
              <Text style={styles.imageLabel}>Imagem anexada</Text>
              <Image
                source={{ uri: getImageUrl(demand.imageUrl) }}
                style={styles.detailImage}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </View>

        {isAdmin && !demand.approved && !confirmingDisapprove && (
          <View style={styles.adminActions}>
            <TouchableOpacity style={styles.approveBtn} onPress={handleApprove} activeOpacity={0.8}>
              <Text style={styles.approveBtnText}>✓ Aprovar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectBtn}
              onPress={() => setConfirmingDisapprove(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.rejectBtnText}>✕ Rejeitar</Text>
            </TouchableOpacity>
          </View>
        )}

        {isAdmin && !demand.approved && confirmingDisapprove && (
          <View style={styles.deleteConfirmRow}>
            <Text style={styles.deleteConfirmText}>
              Tem certeza que deseja rejeitar esta demanda? Ela será excluída permanentemente.
            </Text>
            <View style={styles.deleteConfirmButtons}>
              <TouchableOpacity
                style={styles.deleteConfirmYes}
                onPress={handleDisapprove}
                activeOpacity={0.8}
              >
                <Text style={styles.deleteConfirmYesText}>Sim, rejeitar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteConfirmNo}
                onPress={() => {
                  setConfirmingDisapprove(false);
                  setActionError(null);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.deleteConfirmNoText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isAdmin && demand.status === 'ONGOING' && (
          <TouchableOpacity style={styles.completeBtn} onPress={handleComplete} activeOpacity={0.8}>
            <Text style={styles.completeBtnText}>✓ Concluir demanda</Text>
          </TouchableOpacity>
        )}

        {(isOwner || isAdmin) && !confirmingDelete && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setConfirmingDelete(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteBtnIcon}>🗑️</Text>
            <Text style={styles.deleteBtnText}>Excluir demanda</Text>
          </TouchableOpacity>
        )}

        {(isOwner || isAdmin) && confirmingDelete && (
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
                  setActionError(null);
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
    backgroundColor: theme.colors.redLight,
    borderWidth: 1,
    borderColor: theme.colors.redBorder,
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
  imageSection: {
    marginTop: theme.spacing.md,
  },
  imageLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  detailImage: {
    width: '100%',
    height: 220,
    borderRadius: theme.borderRadius.sm,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  adminActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  approveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: 14,
    backgroundColor: theme.colors.green,
    borderRadius: theme.borderRadius.sm,
  },
  approveBtnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: 14,
    backgroundColor: theme.colors.red,
    borderRadius: theme.borderRadius.sm,
  },
  rejectBtnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    paddingVertical: 14,
    backgroundColor: theme.colors.green,
    borderRadius: theme.borderRadius.sm,
  },
  completeBtnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
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
    backgroundColor: theme.colors.redLight,
    borderWidth: 1,
    borderColor: theme.colors.redBorder,
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
