import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{
  $variant: 'primary' | 'secondary' | 'outline';
  $disabled: boolean;
}>`
  background-color: ${({ $variant, $disabled, theme }) =>
    $disabled
      ? theme.colors.disabled
      : $variant === 'primary'
        ? theme.colors.primary
        : $variant === 'secondary'
          ? theme.colors.secondary
          : 'transparent'};
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border-width: ${({ $variant }) => ($variant === 'outline' ? 2 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const Label = styled.Text<{ $variant: 'primary' | 'secondary' | 'outline' }>`
  color: ${({ $variant, theme }) => ($variant === 'outline' ? theme.colors.primary : '#FFFFFF')};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`;
