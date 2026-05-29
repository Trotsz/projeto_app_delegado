import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screens/Home';
import NovaDemandaScreen from '../screens/NovaDemanda';
import PerfilScreen from '../screens/Perfil';
import { theme } from '../theme';

const tabs = [
  { key: 'home', label: 'Acompanhamento', icon: '📋' },
  { key: 'nova', label: 'Nova Demanda', icon: '➕' },
  { key: 'perfil', label: 'Perfil', icon: '👤' },
];

export default function TabNavigator() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'nova' && <NovaDemandaScreen />}
        {activeTab === 'perfil' && <PerfilScreen />}
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
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
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabActive: {},
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  tabLabelActive: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
});
