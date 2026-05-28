import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
    opacity: 0.6,
  },
  label: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
  labelPrimary: {
    color: '#FFFFFF',
  },
  labelSecondary: {
    color: '#FFFFFF',
  },
  labelOutline: {
    color: theme.colors.primary,
  },
  labelDisabled: {
    color: '#FFFFFF',
  },
});
