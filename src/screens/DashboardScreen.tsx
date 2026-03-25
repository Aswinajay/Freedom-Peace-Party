import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GlassCard, SectionHeader, StatBox, Badge, TrustBadge } from '../components/UI';
import { useStore } from '../store/useStore';
import { mockVotes, mockLeaders, mockNotifications, mockPartyStats } from '../api/mockData';

const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toString();
};

const timeLeft = (iso: string): string => {
  const diff = new Date(iso).getTime() - Date.now();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
};

const voteTypeColor: Record<string, string> = {
  POLICY_VOTE: Colors.teal,
  LEADER_ELECTION: Colors.purple,
  RECALL_REFERENDUM: Colors.red,
  MONTHLY_REFERENDUM: Colors.gold,
  AMENDMENT_VOTE: Colors.orange,
};

const voteTypeLabel: Record<string, string> = {
  POLICY_VOTE: 'Policy Vote',
  LEADER_ELECTION: 'Election',
  RECALL_REFERENDUM: '🔴 Recall',
  MONTHLY_REFERENDUM: 'Monthly Referendum',
  AMENDMENT_VOTE: 'Amendment',
};

interface DashboardProps {
  onNavigate: (screen: string, params?: any) => void;
}

export const DashboardScreen: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { member, setVotes, setLeaders, setNotifications, setPartyStats, votes, notifications } = useStore();

  useEffect(() => {
    setVotes(mockVotes);
    setLeaders(mockLeaders);
    setNotifications(mockNotifications);
    setPartyStats(mockPartyStats);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeVotes = mockVotes.filter((v) => v.status === 'active' && !v.hasVoted);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening 🌙</Text>
            <Text style={styles.name}>{member?.displayName ?? 'Member'}</Text>
            <Text style={styles.chapter}>{member?.chapter}</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('Notifications')} style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
            {unreadCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Trust Level */}
        <View style={styles.trustRow}>
          <TrustBadge level={member?.trustLevel ?? 2} />
          <Text style={styles.memberId}>#{member?.id}</Text>
        </View>

        {/* Party Stats */}
        <GlassCard style={styles.statsCard}>
          <Text style={styles.statsTitle}>🌍 Freedom & Peace Party — Live Stats</Text>
          <View style={styles.statsRow}>
            <StatBox value={formatNumber(mockPartyStats.totalMembers)} label="Members" color={Colors.gold} />
            <StatBox value={mockPartyStats.countries.toString()} label="Countries" color={Colors.teal} />
            <StatBox value={formatNumber(mockPartyStats.votesToday)} label="Votes Today" color={Colors.purple} />
            <StatBox value={mockPartyStats.activeRecalls.toString()} label="Recalls" color={Colors.red} />
          </View>
        </GlassCard>

        {/* Urgent Notification */}
        {notifications.filter((n) => !n.read && n.priority === 'URGENT').map((n) => (
          <GlassCard key={n.id} style={styles.urgentCard}>
            <Text style={styles.urgentText}>{n.message}</Text>
          </GlassCard>
        ))}

        {/* Active votes needing attention */}
        <SectionHeader
          title={`🗳️ Votes Needing You (${activeVotes.length})`}
          action={{ label: 'See All', onPress: () => onNavigate('Voting') }}
        />
        {activeVotes.slice(0, 3).map((vote) => {
          const color = voteTypeColor[vote.type];
          const pct = Math.round((vote.yesCount / (vote.yesCount + vote.noCount)) * 100);
          return (
            <GlassCard key={vote.id} onPress={() => onNavigate('VoteDetail', { vote })}>
              <View style={styles.voteCardTop}>
                <Badge label={voteTypeLabel[vote.type]} color={color + '22'} textColor={color} />
                <Text style={[styles.voteTimer, { color }]}>{timeLeft(vote.endTime)}</Text>
              </View>
              <Text style={styles.voteTitle}>{vote.title}</Text>
              <Text style={styles.voteScope}>📍 {vote.chapter}</Text>
              {/* Progress bar */}
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: color }]} />
              </View>
              <View style={styles.voteStatsRow}>
                <Text style={styles.voteStatYes}>✅ {formatNumber(vote.yesCount)}</Text>
                <Text style={styles.voteStatPct}>{pct}% YES</Text>
                <Text style={styles.voteStatNo}>❌ {formatNumber(vote.noCount)}</Text>
              </View>
            </GlassCard>
          );
        })}

        {/* My Leaders */}
        <SectionHeader
          title="👥 My Leaders"
          action={{ label: 'All Leaders', onPress: () => onNavigate('Leaders') }}
        />
        {mockLeaders.slice(0, 2).map((leader) => (
          <GlassCard key={leader.id} onPress={() => onNavigate('LeaderProfile', { leader })}>
            <View style={styles.leaderRow}>
              <View style={styles.leaderAvatar}>
                <Text style={styles.leaderAvatarText}>{leader.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.leaderName}>{leader.name}</Text>
                <Text style={styles.leaderPos}>{leader.position}</Text>
                {leader.activeRecalls > 0 && (
                  <Badge label={`🔴 ${leader.activeRecalls} active recall`} color={Colors.red + '22'} textColor={Colors.red} />
                )}
              </View>
              <View style={styles.approvalBox}>
                <Text
                  style={[
                    styles.approvalRating,
                    { color: leader.approvalRating >= 70 ? Colors.green : leader.approvalRating >= 50 ? Colors.gold : Colors.red },
                  ]}
                >
                  {leader.approvalRating}%
                </Text>
                <Text style={styles.approvalLabel}>approval</Text>
                <Text style={{ fontSize: 12 }}>
                  {leader.approvalTrend === 'rising' ? '↑' : leader.approvalTrend === 'falling' ? '↓' : '→'}
                </Text>
              </View>
            </View>
          </GlassCard>
        ))}

        {/* Quick Actions */}
        <SectionHeader title="⚡ Quick Actions" />
        <View style={styles.quickGrid}>
          {[
            { label: '📋 Manifesto', screen: 'Manifesto', color: Colors.gold },
            { label: '🏛️ Recall', screen: 'Recall', color: Colors.red },
            { label: '🏆 Elections', screen: 'Elections', color: Colors.purple },
            { label: '🔍 Transparency', screen: 'Transparency', color: Colors.teal },
          ].map((a) => (
            <TouchableOpacity
              key={a.screen}
              onPress={() => onNavigate(a.screen)}
              style={[styles.quickBtn, { borderColor: a.color + '44' }]}
            >
              <Text style={[styles.quickBtnText, { color: a.color }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.base, paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: Spacing.xl, paddingBottom: Spacing.base },
  greeting: { color: Colors.textMuted, fontSize: Typography.size.sm },
  name: { color: Colors.textPrimary, fontSize: Typography.size.xl, fontWeight: Typography.weight.extrabold },
  chapter: { color: Colors.textSecondary, fontSize: Typography.size.xs, marginTop: 2 },
  notifBtn: { position: 'relative', padding: 8 },
  notifIcon: { fontSize: 22 },
  notifBadge: { position: 'absolute', top: 4, right: 4, backgroundColor: Colors.red, borderRadius: 9, width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { color: '#fff', fontSize: 10, fontWeight: Typography.weight.bold },
  trustRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.base },
  memberId: { color: Colors.textMuted, fontSize: Typography.size.xs },
  statsCard: { marginBottom: Spacing.md },
  statsTitle: { fontSize: Typography.size.xs, color: Colors.textMuted, marginBottom: Spacing.md, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  urgentCard: { backgroundColor: Colors.red + '15', borderColor: Colors.red + '44', marginBottom: Spacing.md },
  urgentText: { color: Colors.textPrimary, fontSize: Typography.size.sm, lineHeight: 20 },
  voteCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  voteTimer: { fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold },
  voteTitle: { color: Colors.textPrimary, fontSize: Typography.size.base, fontWeight: Typography.weight.bold, marginBottom: 4 },
  voteScope: { color: Colors.textMuted, fontSize: Typography.size.xs, marginBottom: Spacing.sm },
  progressBg: { height: 6, backgroundColor: Colors.surfaceLight, borderRadius: 3, overflow: 'hidden', marginBottom: Spacing.sm },
  progressFill: { height: '100%', borderRadius: 3 },
  voteStatsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  voteStatYes: { color: Colors.green, fontSize: Typography.size.xs },
  voteStatPct: { color: Colors.textSecondary, fontSize: Typography.size.xs },
  voteStatNo: { color: Colors.red, fontSize: Typography.size.xs },
  leaderRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  leaderAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.purple + '33', alignItems: 'center', justifyContent: 'center' },
  leaderAvatarText: { color: Colors.purple, fontWeight: Typography.weight.bold, fontSize: Typography.size.md },
  leaderName: { color: Colors.textPrimary, fontWeight: Typography.weight.bold, fontSize: Typography.size.base },
  leaderPos: { color: Colors.textSecondary, fontSize: Typography.size.xs, marginBottom: 4 },
  approvalBox: { alignItems: 'center' },
  approvalRating: { fontSize: Typography.size.xl, fontWeight: Typography.weight.extrabold },
  approvalLabel: { color: Colors.textMuted, fontSize: Typography.size.xs },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  quickBtn: { flex: 1, minWidth: '45%', borderWidth: 1, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', backgroundColor: Colors.glass },
  quickBtnText: { fontWeight: Typography.weight.semibold, fontSize: Typography.size.sm },
});
