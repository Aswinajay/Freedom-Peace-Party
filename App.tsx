import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { VotingScreen, VoteDetailScreen } from './src/screens/VotingScreen';
import { LeadersScreen, LeaderProfileScreen } from './src/screens/LeadersScreen';
import { RecallScreen } from './src/screens/RecallScreen';
import { TransparencyScreen } from './src/screens/TransparencyScreen';
import { ManifestoScreen } from './src/screens/ManifestoScreen';
import { ElectionScreen } from './src/screens/ElectionScreen';
import { ForumScreen } from './src/screens/ForumScreen';
import { useStore } from './src/store/useStore';
import { Colors, Typography } from './src/theme';

export type RootStackParamList = {
  Onboarding: undefined;
  Register: undefined;
  MainTabs: undefined;
  VoteDetail: { vote: any };
  LeaderProfile: { leader: any };
  Recall: { leader?: any };
  ElectionScreen: undefined;
  Forum: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Voting: undefined;
  Leaders: undefined;
  Manifesto: undefined;
  Transparency: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: Typography.size.xs,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ tabBarIcon: () => <span style={{fontSize: 20}}>🏠</span>, tabBarLabel: 'Home' }} 
      />
      <Tab.Screen 
        name="Voting" 
        component={VotingScreen} 
        options={{ tabBarIcon: () => <span style={{fontSize: 20}}>🗳️</span>, tabBarLabel: 'Vote' }} 
      />
      <Tab.Screen 
        name="Leaders" 
        component={LeadersScreen} 
        options={{ tabBarIcon: () => <span style={{fontSize: 20}}>👥</span>, tabBarLabel: 'Leaders' }} 
      />
      <Tab.Screen 
        name="Manifesto" 
        component={ManifestoScreen} 
        options={{ tabBarIcon: () => <span style={{fontSize: 20}}>📜</span>, tabBarLabel: 'Manifesto' }} 
      />
      <Tab.Screen 
        name="Transparency" 
        component={TransparencyScreen} 
        options={{ tabBarIcon: () => <span style={{fontSize: 20}}>🔍</span>, tabBarLabel: 'Transparency' }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { member } = useStore();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <Stack.Navigator
        initialRouteName={member ? "MainTabs" : "Onboarding"}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background }
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        
        {/* Modals & Detail Screens */}
        <Stack.Screen name="VoteDetail" component={VoteDetailScreen} />
        <Stack.Screen name="LeaderProfile" component={LeaderProfileScreen} />
        <Stack.Screen name="Recall" component={RecallScreen} />
        <Stack.Screen name="ElectionScreen" component={ElectionScreen} />
        <Stack.Screen name="Forum" component={ForumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
