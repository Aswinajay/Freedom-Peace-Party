import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import { GlassCard, SectionHeader, Button, Badge } from '../components/UI';
import { useStore, Leader } from '../store/useStore';

export function ElectionScreen({ navigation, route }: any) {
  const { member } = useStore();
  const [hasVoted, setHasVoted] = useState(false);

  // Mock candidates for now
  const candidates: Leader[] = [
    {
      id: 'l1',
      name: 'Dr. Sarah Chen',
      role: 'Global Health Coordinator',
      chapter: 'Global',
      approvalRating: 92,
      decisionsCount: 145,
      promisesKept: 28,
      promisesMade: 30,
      recentActivity: [],
    },
    {
      id: 'l2',
      name: 'Ahmad Rahman',
      role: 'Global Health Coordinator Candidate',
      chapter: 'Global',
      approvalRating: 0,
      decisionsCount: 0,
      promisesKept: 0,
      promisesMade: 12,
      recentActivity: [],
    }
  ];

  const handleVote = (candidate: Leader) => {
    Alert.alert(
      "Confirm Vote",
      `Are you sure you want to cast your anonymous ZK-Proof vote for ${candidate.name}? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm Vote", 
          style: "default",
          onPress: () => {
            setHasVoted(true);
            Alert.alert("Vote Recorded", "Your vote has been cryptographically secured to the Polygon blockchain.");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="Global Health Coordinator Election" subtitle="Polls close in 3 Days" />
      
      {!hasVoted ? (
        <View style={styles.candidatesList}>
          {candidates.map(candidate => (
            <GlassCard key={candidate.id} style={styles.candidateCard}>
              <View style={styles.candidateHeader}>
                <View>
                  <SectionHeader title={candidate.name} subtitle={candidate.role} />
                  {candidate.approvalRating > 0 && (
                    <Badge text={`${candidate.approvalRating}% Incumbent Approval`} variant="success" />
                  )}
                </View>
              </View>
              
              <Button 
                title={`Vote for ${candidate.name.split(' ')[0]}`}
                onPress={() => handleVote(candidate)}
                variant="primary"
                style={styles.voteBtn}
              />
            </GlassCard>
          ))}
        </View>
      ) : (
        <GlassCard style={styles.successCard}>
          <SectionHeader title="Verification Complete" subtitle="Your vote has been securely tallied." />
          <Button 
            title="Return to Dashboard" 
            onPress={() => navigation.navigate('Dashboard')} 
            variant="outline" 
          />
        </GlassCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
  },
  candidatesList: {
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  candidateCard: {
    padding: Spacing.md,
  },
  candidateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  voteBtn: {
    marginTop: Spacing.sm,
  },
  successCard: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  }
});
