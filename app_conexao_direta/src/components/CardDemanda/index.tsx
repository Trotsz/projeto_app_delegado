import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, type ViewStyle } from 'react-native';
import { styles } from './styles';
import { getImageUrl } from '../../utils/imageUrl';

interface Demand {
  id: number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  status: 'PENDING' | 'ONGOING' | 'SOLVED';
  approved: boolean;
  author: { name: string };
  category?: string | null;
  date?: string;
}

interface CardDemandaProps {
  demand: Demand;
  variant?: 'dark' | 'light';
  onPress?: () => void;
}

const statusConfig: Record<string, { label: string; style: 'pending' | 'inProgress' | 'solved' }> =
  {
    PENDING: { label: 'Pendente', style: 'pending' },
    IN_PROGRESS: { label: 'Em processo', style: 'inProgress' },
    ONGOING: { label: 'Em andamento', style: 'inProgress' },
    SOLVED: { label: 'Resolvida', style: 'solved' },
  };

export default function CardDemanda({ demand, variant = 'light', onPress }: CardDemandaProps) {
  const status = statusConfig[demand.status] || statusConfig.PENDING;
  const [imageError, setImageError] = useState(false);

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
        <View style={styles.badgesRow}>
          <View style={[styles.statusPill, styles[statusStyleKey] as ViewStyle]}>
            <Text style={styles.statusText}>{status.label}</Text>
          </View>
          {!demand.approved && (
            <View style={[styles.statusPill, styles.statusPendingApproval as ViewStyle]}>
              <Text style={styles.statusText}>Pendente</Text>
            </View>
          )}
        </View>
        {demand.date && (
          <Text style={[styles.date, variant === 'dark' && styles.dateDark]}>{demand.date}</Text>
        )}
      </View>
      {demand.imageUrl && !imageError ? (
        <Image
          source={{ uri: getImageUrl(demand.imageUrl) }}
          style={styles.cardImage}
          resizeMode="contain"
          onError={() => setImageError(true)}
        />
      ) : null}
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
