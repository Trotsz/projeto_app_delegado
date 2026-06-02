import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  accent: {
    backgroundColor: theme.colors.accent,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconWrap: {
    marginRight: 4,
  },
  label: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.base,
  },
  labelPrimary: {
    color: theme.colors.white,
  },
  labelAccent: {
    color: theme.colors.white,
  },
  labelOutline: {
    color: theme.colors.text,
  },
  labelGhost: {
    color: theme.colors.text,
  },
});
