import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/Home';
import NovaDemandaScreen from '../screens/NovaDemanda';
import PerfilScreen from '../screens/Perfil';
import DadosPessoaisScreen from '../screens/DadosPessoais';
import MinhasDemandasScreen from '../screens/MinhasDemandas';
import AlterarSenhaScreen from '../screens/AlterarSenha';
import DemandDetailsScreen from '../screens/DemandDetails';
import { theme } from '../theme';

const tabs = [
  { key: 'home', label: 'Início', icon: '🏠' },
  { key: 'mapa', label: 'Mapa', icon: '🗺️' },
  { key: 'nova', label: 'Nova', icon: '➕' },
  { key: 'notificacoes', label: 'Notificações', icon: '🔔' },
  { key: 'perfil', label: 'Perfil', icon: '👤' },
];

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('home');
  const [profileSubScreen, setProfileSubScreen] = useState<string | null>(null);
  const [demandDetailsId, setDemandDetailsId] = useState<number | null>(null);

  function renderProfileSubScreen() {
    switch (profileSubScreen) {
      case 'dados-pessoais':
        return <DadosPessoaisScreen onGoBack={() => setProfileSubScreen(null)} />;
      case 'minhas-demandas':
        return (
          <MinhasDemandasScreen
            onGoBack={() => setProfileSubScreen(null)}
            onDemandPress={(id) => setDemandDetailsId(id)}
          />
        );
      case 'alterar-senha':
        return <AlterarSenhaScreen onGoBack={() => setProfileSubScreen(null)} />;
      default:
        return <PerfilScreen onNavigateToSubScreen={setProfileSubScreen} />;
    }
  }

  if (demandDetailsId !== null) {
    return (
      <DemandDetailsScreen demandId={demandDetailsId} onGoBack={() => setDemandDetailsId(null)} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && (
          <HomeScreen
            onNavigateToTab={setActiveTab}
            onDemandPress={(id) => setDemandDetailsId(id)}
          />
        )}
        {activeTab === 'nova' && <NovaDemandaScreen onNavigateToTab={setActiveTab} />}
        {activeTab === 'perfil' && renderProfileSubScreen()}
        {activeTab === 'mapa' && (
          <View style={styles.placeholderScreen}>
            <Text style={styles.placeholderIcon}>🗺️</Text>
            <Text style={styles.placeholderText}>Mapa de Demandas</Text>
          </View>
        )}
        {activeTab === 'notificacoes' && (
          <View style={styles.placeholderScreen}>
            <Text style={styles.placeholderIcon}>🔔</Text>
            <Text style={styles.placeholderText}>Notificações</Text>
          </View>
        )}
      </View>
      <View style={[styles.tabBar, { paddingBottom: insets.bottom + 8 }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, activeTab === tab.key && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabIcon: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.5)',
  },
  tabIconActive: {
    color: theme.colors.accent,
  },
  tabLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  tabLabelActive: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.accent,
  },
  placeholderScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  placeholderText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
  },
});
