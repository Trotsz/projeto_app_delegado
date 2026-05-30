import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surface,
  },
  inputRowError: {
    borderColor: theme.colors.red,
  },
  leftIcon: {
    paddingLeft: 14,
  },
  rightIcon: {
    paddingRight: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  inputWithLeftIcon: {
    paddingLeft: 12,
  },
  error: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.red,
    marginTop: theme.spacing.xs,
  },
});
