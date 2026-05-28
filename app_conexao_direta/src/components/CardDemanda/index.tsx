import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface Demand {
  id: number;
  title: string;
  description?: string | null;
  status: 'SOLVED' | 'ONGOING';
  author: { name: string };
}

interface CardDemandaProps {
  demand: Demand;
  onPress?: () => void;
}

export default function CardDemanda({ demand, onPress }: CardDemandaProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{demand.title}</Text>
      {demand.description && <Text style={styles.description}>{demand.description}</Text>}
      <View style={styles.footer}>
        <View
          style={[
            styles.statusBadge,
            demand.status === 'SOLVED' ? styles.statusSolved : styles.statusOngoing,
          ]}
        >
          <Text style={styles.statusText}>
            {demand.status === 'SOLVED' ? 'Resolvido' : 'Em andamento'}
          </Text>
        </View>
        <Text style={styles.author}>{demand.author.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
