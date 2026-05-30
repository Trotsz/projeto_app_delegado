import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import type { TextInputProps } from 'react-native';
import { styles } from './styles';
import { theme } from '../../theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, leftIcon ? styles.inputWithLeftIcon : undefined]}
          placeholderTextColor={theme.colors.textLight}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
