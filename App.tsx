import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { VotingScreen, VoteDetailScreen } from './src/screens/VotingScreen';
import { LeadersScreen, LeaderProfileScreen } from './src/screens/LeadersScreen';
import { RecallScreen } from './src/screens/RecallScreen';
import { TransparencyScreen } from './src/screens/TransparencyScreen';
import { ManifestoScreen } from './src/screens/ManifestoScreen';
import { useStore } from './src/store/useStore';
import { Colors, Typography, Spacing } from './src/theme';
import { Vote, Leader } from './src/store/useStore';

type Screen =
  | 'Onboarding'
  | 'Register'
  | 'Dashboard'
  | 'Voting'
  | 'VoteDetail'
  | 'Leaders'
  | 'LeaderProfile'
  | 'Recall'
  | 'Transparency'
  | 'Manifesto';

interface NavState {
  screen: Screen;
  params?: any;
}

const TABS: { id: Screen; icon: string; label: string }[] = [
  { id: 'Dashboard', icon: '🏠', label: 'Home' },
  { id: 'Voting', icon: '🗳️', label: 'Vote' },
  { id: 'Leaders', icon: '👥', label: 'Leaders' },
  { id: 'Manifesto', icon: '📜', label: 'Manifesto' },
  { id: 'Transparency', icon: '🔍', label: 'Transparency' },
];

export default function App() {
  const { member } = useStore();
  const [navStack, setNavStack] = useState<NavState[]>([
    { screen: member ? 'Dashboard' : 'Onboarding' },
  ]);

  const current = navStack[navStack.length - 1];

  const navigate = (screen: string, params?: any) => {
    setNavStack((prev) => [...prev, { screen: screen as Screen, params }]);
  };

  const goBack = () => {
    setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const switchTab = (tab: Screen) => {
    setNavStack([{ screen: tab }]);
  };

  const isMainTab = TABS.some((t) => t.id === current.screen);
  const showTabBar = !!member && isMainTab;

  const renderScreen = () => {
    switch (current.screen) {
      case 'Onboarding':
        return (
          <OnboardingScreen
            onJoin={() => navigate('Register')}
            onReadManifesto={() => navigate('Manifesto')}
          />
        );
      case 'Register':
        return (
          <RegisterScreen
            onRegistered={() => setNavStack([{ screen: 'Dashboard' }])}
            onBack={goBack}
          />
        );
      case 'Dashboard':
        return <DashboardScreen onNavigate={navigate} />;
      case 'Voting':
        return <VotingScreen onVoteDetail={(vote) => navigate('VoteDetail', { vote })} />;
      case 'VoteDetail':
        return <VoteDetailScreen vote={current.params?.vote as Vote} onBack={goBack} />;
      case 'Leaders':
        return (
          <LeadersScreen
            onLeaderPress={(leader) => navigate('LeaderProfile', { leader })}
          />
        );
      case 'LeaderProfile':
        return (
          <LeaderProfileScreen
            leader={current.params?.leader as Leader}
            onBack={goBack}
            onStartRecall={(leader) => navigate('Recall', { leader })}
          />
        );
      case 'Recall':
        return (
          <RecallScreen
            preSelectedLeader={current.params?.leader}
            onBack={goBack}
          />
        );
      case 'Transparency':
        return <TransparencyScreen />;
      case 'Manifesto':
        return <ManifestoScreen />;
      default:
        return <DashboardScreen onNavigate={navigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.app}>
        {renderScreen()}

        {/* Bottom Tab Bar */}
        {showTabBar && (
          <View style={styles.tabBar}>
            {TABS.map((tab) => {
              const active = current.screen === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => switchTab(tab.id)}
                  style={styles.tabItem}
                  activeOpacity={0.7}
                >
                  <Text style={styles.tabIcon}>{tab.icon}</Text>
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: active ? Colors.gold : Colors.textMuted },
                    ]}
                  >
                    {tab.label}
                  </Text>
                  {active && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  app: { flex: 1, backgroundColor: Colors.background },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 4,
  },
  tabIcon: { fontSize: 20 },
  tabLabel: {
    fontSize: Typography.size.xs,
    marginTop: 2,
    fontWeight: Typography.weight.medium,
  },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    width: 20,
    height: 2,
    backgroundColor: Colors.gold,
    borderRadius: 1,
  },
});
