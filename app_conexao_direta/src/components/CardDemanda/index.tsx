import React from 'react';
import {
  Container,
  Title,
  Description,
  Footer,
  StatusBadge,
  StatusText,
  AuthorText,
} from './styles';

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
    <Container onPress={onPress}>
      <Title>{demand.title}</Title>
      {demand.description && <Description>{demand.description}</Description>}
      <Footer>
        <StatusBadge status={demand.status}>
          <StatusText>{demand.status === 'SOLVED' ? 'Resolvido' : 'Em andamento'}</StatusText>
        </StatusBadge>
        <AuthorText>{demand.author.name}</AuthorText>
      </Footer>
    </Container>
  );
}
