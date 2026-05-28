import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

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
    <TouchableOpacity
      style={[styles.base, disabled ? styles.disabled : styles[variant]]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.label,
          disabled
            ? styles.labelDisabled
            : styles[
                `label${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles
              ],
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
