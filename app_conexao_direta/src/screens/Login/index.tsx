import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/user/login', { email, password });
      const user = JSON.parse(atob(data.split('.')[1]));
      setAuth(data, { id: user.id, name: user.name, email: user.email, role: user.role });
    } catch {
      Alert.alert('Erro', 'Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Title>App Delegado</Title>
      <Subtitle>Acompanhamento de Demandas</Subtitle>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
    </Container>
  );
}
