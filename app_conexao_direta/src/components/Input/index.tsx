import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, StyledInput, Label, ErrorText } from './styles';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...rest }: InputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput $hasError={!!error} placeholderTextColor="#9E9E9E" {...rest} />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
