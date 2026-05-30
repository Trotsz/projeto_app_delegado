import React from 'react';
import { View, Text, TouchableOpacity, type ViewStyle } from 'react-native';
import { styles } from './styles';

interface Demand {
  id: number;
  title: string;
  description?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'SOLVED' | 'ONGOING';
  author: { name: string };
  category?: string;
  date?: string;
}

interface CardDemandaProps {
  demand: Demand;
  variant?: 'dark' | 'light';
  onPress?: () => void;
}

const statusConfig = {
  PENDING: { label: 'Pendente', style: 'pending' as const },
  IN_PROGRESS: { label: 'Em processo', style: 'inProgress' as const },
  ONGOING: { label: 'Em andamento', style: 'inProgress' as const },
  SOLVED: { label: 'Resolvida', style: 'solved' as const },
};

export default function CardDemanda({ demand, variant = 'light', onPress }: CardDemandaProps) {
  const status = statusConfig[demand.status] || statusConfig.PENDING;

  const statusStyleKey =
    `status${status.style.charAt(0).toUpperCase() + status.style.slice(1)}` as keyof typeof styles;
  const containerStyle: ViewStyle =
    variant === 'dark' ? (styles.containerDark as ViewStyle) : (styles.containerLight as ViewStyle);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.statusPill, styles[statusStyleKey] as ViewStyle]}>
          <Text style={styles.statusText}>{status.label}</Text>
        </View>
        {demand.date && (
          <Text style={[styles.date, variant === 'dark' && styles.dateDark]}>{demand.date}</Text>
        )}
      </View>
      <Text style={[styles.title, variant === 'dark' && styles.titleDark]}>{demand.title}</Text>
      {demand.description && (
        <Text
          style={[styles.description, variant === 'dark' && styles.descriptionDark]}
          numberOfLines={2}
        >
          {demand.description}
        </Text>
      )}
      <View style={styles.footer}>
        <View style={styles.userRow}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>{demand.author.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={[styles.authorName, variant === 'dark' && styles.authorNameDark]}>
            {demand.author.name}
          </Text>
        </View>
        <Text style={styles.actionLink}>Ver mais</Text>
      </View>
    </TouchableOpacity>
  );
}
