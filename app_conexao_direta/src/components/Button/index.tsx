import React from 'react';
import { Container, Label } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <Container variant={variant} disabled={disabled} onPress={onPress}>
      <Label variant={variant}>{title}</Label>
    </Container>
  );
}
