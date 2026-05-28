import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/useAuthStore';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl}px;
  justify-content: center;
`;

const Avatar = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const AvatarText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 32px;
  color: #ffffff;
`;

const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Email = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export default function PerfilScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Container>
      <Avatar>
        <AvatarText>{user?.name?.charAt(0)?.toUpperCase() || '?'}</AvatarText>
      </Avatar>
      <Name>{user?.name || 'Usuário'}</Name>
      <Email>{user?.email || ''}</Email>
      <Button title="Sair" variant="outline" onPress={logout} />
    </Container>
  );
}
