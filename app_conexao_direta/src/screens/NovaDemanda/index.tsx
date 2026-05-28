import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useCreateDemand } from '../../services/queries/useDemands';
import { theme } from '../../theme';

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
    <View style={styles.container}>
      <Text style={styles.title}>Nova Demanda</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
});
