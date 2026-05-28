import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CardDemanda from '../../components/CardDemanda';
import { useDemands } from '../../services/queries/useDemands';
import { theme } from '../../theme';

export default function HomeScreen() {
  const { data: demands, isLoading } = useDemands();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Demandas</Text>
      {isLoading ? (
        <Text style={styles.empty}>Carregando...</Text>
      ) : (
        <FlatList
          data={demands || []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CardDemanda demand={item} />}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma demanda encontrada</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  header: {
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  empty: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});
