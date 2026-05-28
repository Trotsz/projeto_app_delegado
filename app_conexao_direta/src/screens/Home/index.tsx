import React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import CardDemanda from '../../components/CardDemanda';
import { useDemands } from '../../services/queries/useDemands';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Header = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const EmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;

export default function HomeScreen() {
  const { data: demands, isLoading } = useDemands();

  return (
    <Container>
      <Header>Demandas</Header>
      {isLoading ? (
        <EmptyText>Carregando...</EmptyText>
      ) : (
        <FlatList
          data={demands || []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CardDemanda demand={item} />}
          ListEmptyComponent={<EmptyText>Nenhuma demanda encontrada</EmptyText>}
        />
      )}
    </Container>
  );
}
