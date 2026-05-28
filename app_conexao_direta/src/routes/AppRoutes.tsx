import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import NovaDemandaScreen from '../screens/NovaDemanda';
import PerfilScreen from '../screens/Perfil';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1B5E20',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { paddingBottom: 8, paddingTop: 8, height: 60 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Acompanhamento' }} />
      <Tab.Screen
        name="NovaDemanda"
        component={NovaDemandaScreen}
        options={{ tabBarLabel: 'Nova Demanda' }}
      />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}
