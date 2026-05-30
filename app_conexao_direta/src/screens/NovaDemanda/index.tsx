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
import { useCreateDemand } from '../../services/queries/useDemands';
import { theme } from '../../theme';

const categories = [
  { id: 'infra', icon: '🏗️', label: 'Infraestrutura' },
  { id: 'saude', icon: '🏥', label: 'Saúde' },
  { id: 'educacao', icon: '📚', label: 'Educação' },
  { id: 'seguranca', icon: '👮', label: 'Segurança' },
  { id: 'meio-ambiente', icon: '🌳', label: 'Meio Ambiente' },
  { id: 'mobilidade', icon: '🚌', label: 'Mobilidade' },
  { id: 'limpeza', icon: '🧹', label: 'Limpeza Urbana' },
  { id: 'outros', icon: '📌', label: 'Outros' },
];

type Step = 'category' | 'type' | 'details' | 'success';

export default function NovaDemandaScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { mutateAsync: createDemand, isPending } = useCreateDemand();

  async function handleSubmit() {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório');
      return;
    }

    try {
      await createDemand({ title: `${selectedCategory}: ${title}`, description });
      setStep('success');
    } catch {
      Alert.alert('Erro', 'Não foi possível criar a demanda');
    }
  }

  if (step === 'success') {
    return (
      <View style={styles.successContainer}>
        <View style={styles.stepDots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={styles.stepDotActive} />
          ))}
        </View>
        <View style={styles.checkWrapper}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>🏛️</Text>
          </View>
          <View style={styles.checkBadge}>
            <Text style={styles.checkBadgeIcon}>✓</Text>
          </View>
        </View>
        <Text style={styles.successTitle}>Demanda{'\n'}enviada com sucesso!</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusPillText}>Pendente</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>RESUMO</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemIcon}>📌</Text>
            <View>
              <Text style={styles.summaryItemMeta}>Categoria</Text>
              <Text style={styles.summaryItemValue}>
                {categories.find((c) => c.id === selectedCategory)?.label}
              </Text>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemIcon}>📝</Text>
            <View>
              <Text style={styles.summaryItemMeta}>Título</Text>
              <Text style={styles.summaryItemValue}>{title}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => {
            setStep('category');
            setSelectedCategory('');
            setTitle('');
            setDescription('');
          }}
        >
          <Text style={styles.btnPrimaryText}>Nova Demanda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary}>
          <Text style={styles.btnSecondaryText}>Acompanhar Demandas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
    >
      <View style={styles.topbar}>
        <Text style={styles.topbarTitle}>Nova Demanda</Text>
      </View>

      <View style={styles.progressHeader}>
        <Text style={styles.stepLabel}>
          {step === 'category' ? 'PASSO 1 DE 3' : step === 'type' ? 'PASSO 2 DE 3' : 'PASSO 3 DE 3'}
        </Text>
        <Text style={styles.stepTitle}>
          {step === 'category'
            ? 'Escolha a categoria'
            : step === 'type'
              ? 'Tipo de demanda'
              : 'Detalhes da demanda'}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: step === 'category' ? '33%' : step === 'type' ? '66%' : '100%',
              },
            ]}
          />
        </View>
      </View>

      {step === 'category' && (
        <>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar categoria..."
              placeholderTextColor={theme.colors.textLight}
            />
          </View>
          <Text style={styles.sectionLabel}>Categorias</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === cat.id && styles.categoryCardSelected,
                ]}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  setStep('type');
                }}
                activeOpacity={0.7}
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryIconText}>{cat.icon}</Text>
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {step === 'type' && (
        <>
          <Text style={styles.heading}>Selecione o tipo</Text>
          <TouchableOpacity style={styles.typeCard} onPress={() => setStep('details')}>
            <Text style={styles.typeIcon}>🏠</Text>
            <View>
              <Text style={styles.typeLabel}>Problema em via pública</Text>
              <Text style={styles.typeDesc}>Buracos, calçadas, sinalização</Text>
            </View>
            <Text style={styles.typeArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeCard} onPress={() => setStep('details')}>
            <Text style={styles.typeIcon}>💡</Text>
            <View>
              <Text style={styles.typeLabel}>Iluminação pública</Text>
              <Text style={styles.typeDesc}>Postes, lâmpadas queimadas</Text>
            </View>
            <Text style={styles.typeArrow}>›</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'details' && (
        <>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite um título para a demanda"
            placeholderTextColor={theme.colors.textLight}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva detalhadamente a demanda..."
            placeholderTextColor={theme.colors.textLight}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Localização</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderIcon}>📍</Text>
            <View style={styles.mapAddress}>
              <Text style={styles.mapAddressText}>Rua Exemplo, 123 - Centro</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.attachBtn}>
            <Text style={styles.attachIcon}>📎</Text>
            <Text style={styles.attachText}>Anexar imagem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnNext, isPending && styles.btnDisabled]}
            onPress={handleSubmit}
            disabled={isPending}
            activeOpacity={0.8}
          >
            <Text style={styles.btnNextText}>{isPending ? 'Enviando...' : 'Enviar Demanda'}</Text>
            <Text style={styles.btnNextArrow}>→</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingBottom: 100,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  topbarTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  progressHeader: {
    marginBottom: theme.spacing.md,
  },
  stepLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginBottom: 2,
  },
  stepTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    marginBottom: theme.spacing.md,
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
  sectionLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  categoryCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#eef0ff',
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e8eaf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconText: {
    fontSize: 22,
  },
  categoryLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    textAlign: 'center',
  },
  heading: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  typeIcon: {
    fontSize: 24,
  },
  typeLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  typeDesc: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  typeArrow: {
    fontSize: 20,
    color: theme.colors.textMuted,
    marginLeft: 'auto',
  },
  label: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  textarea: {
    minHeight: 100,
    lineHeight: 22,
  },
  mapPlaceholder: {
    width: '100%',
    height: 160,
    borderRadius: theme.borderRadius.md,
    backgroundColor: '#c5d9c3',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderIcon: {
    fontSize: 40,
  },
  mapAddress: {
    position: 'absolute',
    bottom: theme.spacing.sm,
    left: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mapAddressText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
  },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: 14,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
  },
  attachIcon: {
    fontSize: 18,
  },
  attachText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  btnNext: {
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnNextText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  btnNextArrow: {
    fontSize: 18,
    color: theme.colors.white,
  },
  successContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  stepDots: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  stepDotActive: {
    height: 4,
    width: 56,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
  },
  checkWrapper: {
    position: 'relative',
    marginVertical: theme.spacing.lg,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8eaf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 36,
    color: theme.colors.primary,
  },
  checkBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.green,
    borderWidth: 3,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadgeIcon: {
    fontSize: 14,
    color: theme.colors.white,
    fontWeight: '800',
  },
  successTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    lineHeight: 30,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent,
    marginBottom: theme.spacing.lg,
  },
  statusPillText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  summaryLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    letterSpacing: 0.08,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
  summaryItem: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  summaryItemIcon: {
    fontSize: 16,
    marginTop: 2,
  },
  summaryItemMeta: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  summaryItemValue: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  btnPrimary: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  btnPrimaryText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.white,
  },
  btnSecondary: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
});
