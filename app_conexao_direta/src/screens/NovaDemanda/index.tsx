import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useCreateDemand } from '../../services/queries/useDemands';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export default function NovaDemandaScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { mutateAsync: createDemand, isPending } = useCreateDemand();

  async function handleCreate() {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório');
      return;
    }

    try {
      await createDemand({ title, description });
      Alert.alert('Sucesso', 'Demanda criada com sucesso');
      setTitle('');
      setDescription('');
    } catch {
      Alert.alert('Erro', 'Não foi possível criar a demanda');
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Title>Nova Demanda</Title>
      <Input
        label="Título"
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título da demanda"
      />
      <Input
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        placeholder="Descreva a demanda"
        multiline
        numberOfLines={4}
      />
      <Button
        title={isPending ? 'Criando...' : 'Criar Demanda'}
        onPress={handleCreate}
        disabled={isPending}
      />
    </Container>
  );
}
