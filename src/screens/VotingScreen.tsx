import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GlassCard, SectionHeader, Badge, Button } from '../components/UI';
import { useStore, Vote } from '../store/useStore';
import { mockVotes } from '../api/mockData';

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
  RECALL_REFERENDUM: '🔴 Recall Referendum',
  MONTHLY_REFERENDUM: '📋 Monthly Referendum',
  AMENDMENT_VOTE: '📜 Amendment',
};

const scopeEmoji: Record<string, string> = {
  local: '🏘️',
  national: '🏛️',
  global: '🌍',
};

const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toString();
};

const timeLeft = (iso: string): string => {
  const diff = new Date(iso).getTime() - Date.now();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};

interface VotingProps {
  onVoteDetail: (vote: Vote) => void;
}

export const VotingScreen: React.FC<VotingProps> = ({ onVoteDetail }) => {
  const [filter, setFilter] = useState<'all' | 'unvoted' | 'voted'>('all');

  const filtered = mockVotes.filter((v) => {
    if (filter === 'unvoted') return !v.hasVoted;
    if (filter === 'voted') return v.hasVoted;
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>🗳️ Votes</Text>
        <Text style={styles.subheading}>Anonymous · Blockchain-recorded · Instantly binding</Text>

        {/* Filter tabs */}
        <View style={styles.tabs}>
          {(['all', 'unvoted', 'voted'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setFilter(t)}
              style={[styles.tab, filter === t && styles.tabActive]}
            >
              <Text style={[styles.tabText, filter === t && styles.tabTextActive]}>
                {t === 'all' ? 'All' : t === 'unvoted' ? '⚡ Need Vote' : '✅ Voted'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.map((vote) => {
          const color = voteTypeColor[vote.type];
          const pct = Math.round((vote.yesCount / (vote.yesCount + vote.noCount)) * 100);
          return (
            <GlassCard key={vote.id} onPress={() => onVoteDetail(vote)}>
              <View style={styles.cardTop}>
                <Badge label={voteTypeLabel[vote.type]} color={color + '22'} textColor={color} />
                <View style={styles.rightMeta}>
                  <Text style={styles.scopeText}>{scopeEmoji[vote.scope]} {vote.scope}</Text>
                  {!vote.hasVoted && (
                    <View style={styles.closingBadge}>
                      <Text style={styles.closingText}>⏰ {timeLeft(vote.endTime)}</Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={styles.voteTitle}>{vote.title}</Text>
              <Text style={styles.chapter}>📍 {vote.chapter}</Text>

              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: color }]} />
              </View>

              <View style={styles.statsRow}>
                <Text style={styles.statYes}>✅ {formatNumber(vote.yesCount)}</Text>
                <Text style={styles.statPct}>{pct}% YES · {formatNumber(vote.totalVoters)} eligible</Text>
                <Text style={styles.statNo}>❌ {formatNumber(vote.noCount)}</Text>
              </View>

              {vote.hasVoted ? (
                <Badge label="✓ You voted" color={Colors.green + '22'} textColor={Colors.green} />
              ) : (
                <Button
                  label="Cast Your Vote →"
                  onPress={() => onVoteDetail(vote)}
                  variant="teal"
                  size="sm"
                  style={{ marginTop: Spacing.sm, alignSelf: 'flex-end' }}
                />
              )}
            </GlassCard>
          );
        })}
      </ScrollView>
    </View>
  );
};

// ─── Vote Detail / Casting Screen ────────────────────────────────────────────
interface VoteDetailProps {
  vote: Vote;
  onBack: () => void;
}

export const VoteDetailScreen: React.FC<VoteDetailProps> = ({ vote, onBack }) => {
  const [choice, setChoice] = useState<'yes' | 'no' | 'abstain' | null>(null);
  const [submitted, setSubmitted] = useState(vote.hasVoted);
  const [receipt, setReceipt] = useState<string | null>(null);
  const color = voteTypeColor[vote.type];

  const handleSubmit = async () => {
    if (!choice) return;
    await new Promise((r) => setTimeout(r, 1200));
    const txHash = '0x' + Math.random().toString(16).substring(2, 18);
    setReceipt(txHash);
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: Spacing.base }}>
          <Text style={{ color: Colors.textSecondary }}>← Back to Votes</Text>
        </TouchableOpacity>

        <Badge label={voteTypeLabel[vote.type]} color={color + '22'} textColor={color} />
        <Text style={[styles.heading, { marginTop: Spacing.md, fontSize: Typography.size.xl }]}>{vote.title}</Text>
        <Text style={styles.chapter}>📍 {vote.chapter} · {scopeEmoji[vote.scope]} {vote.scope}</Text>

        <GlassCard style={{ marginTop: Spacing.md }}>
          <Text style={styles.descText}>{vote.description}</Text>
        </GlassCard>

        {/* Current tally */}
        <GlassCard style={{ marginTop: Spacing.sm }}>
          <Text style={[styles.subheading, { marginBottom: Spacing.sm }]}>Live Tally</Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${Math.round(vote.yesCount / (vote.yesCount + vote.noCount) * 100)}%`, backgroundColor: color }]} />
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statYes}>✅ {formatNumber(vote.yesCount)}</Text>
            <Text style={styles.statPct}>{Math.round(vote.yesCount / (vote.yesCount + vote.noCount) * 100)}% YES</Text>
            <Text style={styles.statNo}>❌ {formatNumber(vote.noCount)}</Text>
          </View>
        </GlassCard>

        {/* Vote casting */}
        {!submitted ? (
          <View style={{ marginTop: Spacing.base }}>
            <Text style={styles.subheading}>Cast Your Anonymous Vote</Text>
            <Text style={[styles.chapter, { marginBottom: Spacing.md }]}>
              🔒 Your identity is removed. Even the app cannot see how you voted.
            </Text>
            {(['yes', 'no', 'abstain'] as const).map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => setChoice(opt)}
                style={[
                  styles.choiceBtn,
                  choice === opt && {
                    borderColor: opt === 'yes' ? Colors.green : opt === 'no' ? Colors.red : Colors.textMuted,
                    backgroundColor: (opt === 'yes' ? Colors.green : opt === 'no' ? Colors.red : Colors.textMuted) + '15',
                  },
                ]}
              >
                <Text style={styles.choiceText}>
                  {opt === 'yes' ? '✅ YES — Support' : opt === 'no' ? '❌ NO — Against' : '⬜ ABSTAIN — No Opinion'}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              label="Submit Vote to Blockchain"
              onPress={handleSubmit}
              variant="gold"
              size="lg"
              disabled={!choice}
              style={{ marginTop: Spacing.xl }}
            />
          </View>
        ) : (
          <GlassCard style={{ marginTop: Spacing.base, borderColor: Colors.green + '44' }}>
            <Text style={{ color: Colors.green, fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, textAlign: 'center' }}>
              ✅ Vote Recorded
            </Text>
            <Text style={{ color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, fontSize: Typography.size.xs }}>
              Your anonymous vote is permanently recorded on the Polygon blockchain.
            </Text>
            {receipt && (
              <Text style={{ color: Colors.textMuted, textAlign: 'center', marginTop: Spacing.sm, fontSize: Typography.size.xs }}>
                TX: {receipt}
              </Text>
            )}
          </GlassCard>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.base, paddingBottom: 80 },
  heading: { color: Colors.textPrimary, fontSize: Typography.size['2xl'], fontWeight: Typography.weight.extrabold, marginBottom: 4 },
  subheading: { color: Colors.textSecondary, fontSize: Typography.size.sm, marginBottom: Spacing.md },
  tabs: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.base },
  tab: { flex: 1, padding: Spacing.sm, borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  tabActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  tabText: { color: Colors.textSecondary, fontSize: Typography.size.xs, fontWeight: Typography.weight.medium },
  tabTextActive: { color: '#000', fontWeight: Typography.weight.bold },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  rightMeta: { alignItems: 'flex-end', gap: 4 },
  scopeText: { color: Colors.textMuted, fontSize: Typography.size.xs },
  closingBadge: { backgroundColor: Colors.red + '22', borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 2 },
  closingText: { color: Colors.red, fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold },
  voteTitle: { color: Colors.textPrimary, fontSize: Typography.size.base, fontWeight: Typography.weight.bold, marginBottom: 4 },
  chapter: { color: Colors.textMuted, fontSize: Typography.size.xs, marginBottom: Spacing.sm },
  progressBg: { height: 6, backgroundColor: Colors.surfaceLight, borderRadius: 3, overflow: 'hidden', marginBottom: Spacing.sm },
  progressFill: { height: '100%', borderRadius: 3 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statYes: { color: Colors.green, fontSize: Typography.size.xs },
  statPct: { color: Colors.textSecondary, fontSize: Typography.size.xs },
  statNo: { color: Colors.red, fontSize: Typography.size.xs },
  descText: { color: Colors.textSecondary, fontSize: Typography.size.sm, lineHeight: 22 },
  choiceBtn: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  choiceText: { color: Colors.textPrimary, fontWeight: Typography.weight.semibold, fontSize: Typography.size.base },
});
