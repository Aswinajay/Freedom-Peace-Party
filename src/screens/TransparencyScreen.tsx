import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GlassCard, SectionHeader, StatBox, Badge } from '../components/UI';
import { mockPartyStats } from '../api/mockData';

const FINANCES = [
  { type: 'Donation', amount: '+₹5,200', from: 'Anonymous member', time: '2h ago', color: Colors.green },
  { type: 'Expense', amount: '-₹1,800', from: 'Legal aid camp — Thrissur', time: '1d ago', color: Colors.red },
  { type: 'Donation', amount: '+₹12,000', from: 'Anonymous member', time: '2d ago', color: Colors.green },
  { type: 'Expense', amount: '-₹3,400', from: 'Chapter meeting venue', time: '3d ago', color: Colors.red },
  { type: 'Donation', amount: '+₹2,500', from: 'Anonymous member', time: '4d ago', color: Colors.green },
];

const PROMISES = [
  { pillar: '📚 Education', text: 'Free tuition program — 200 students', status: 'kept', deadline: 'Jan 2026' },
  { pillar: '🏥 Health', text: 'Mobile health camp — 5 villages', status: 'kept', deadline: 'Feb 2026' },
  { pillar: '⚖️ Justice', text: 'Free legal aid clinic monthly', status: 'pending', deadline: 'Apr 2026' },
  { pillar: '🌱 Climate', text: '10,000 trees planted in district', status: 'overdue', deadline: 'Dec 2025' },
  { pillar: '💰 Economy', text: 'UBI pilot proposal to state govt', status: 'broken', deadline: 'Jan 2026' },
];

const statusColor: Record<string, string> = {
  kept: Colors.green,
  pending: Colors.gold,
  overdue: Colors.orange,
  broken: Colors.red,
};

export const TransparencyScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finances' | 'promises' | 'members' | 'audit'>('finances');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>🔍 Transparency</Text>
        <Text style={styles.sub}>Every cent. Every decision. Every promise. Publicly recorded on blockchain forever.</Text>

        {/* Balance card */}
        <GlassCard style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Kerala Chapter Balance</Text>
          <Text style={styles.balanceAmount}>₹2,84,750</Text>
          <Text style={styles.balanceSub}>
            🔗{' '}
            <Text style={{ color: Colors.teal, textDecorationLine: 'underline' }}>
              Verify on Polygon →
            </Text>
          </Text>
        </GlassCard>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['finances', 'promises', 'members', 'audit'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setActiveTab(t)}
              style={[styles.tab, activeTab === t && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                {t === 'finances' ? '💰' : t === 'promises' ? '📋' : t === 'members' ? '👥' : '🤖'}
              </Text>
              <Text style={[styles.tabLabel, activeTab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Finances */}
        {activeTab === 'finances' && (
          <View>
            <SectionHeader title="Recent Transactions" />
            {FINANCES.map((f, i) => (
              <GlassCard key={i}>
                <View style={styles.txRow}>
                  <View>
                    <Text style={styles.txType}>{f.type}</Text>
                    <Text style={styles.txFrom}>{f.from}</Text>
                    <Text style={styles.txTime}>{f.time}</Text>
                  </View>
                  <Text style={[styles.txAmount, { color: f.color }]}>{f.amount}</Text>
                </View>
              </GlassCard>
            ))}
            <GlassCard style={{ marginTop: 8 }}>
              <Text style={{ color: Colors.textMuted, fontSize: Typography.size.xs, textAlign: 'center' }}>
                📥 Download full CSV · All data downloadable by any member
              </Text>
            </GlassCard>
          </View>
        )}

        {/* Promises */}
        {activeTab === 'promises' && (
          <View>
            <SectionHeader title="Promise Tracker" />
            {[
              { label: 'Kept', count: 2, color: Colors.green },
              { label: 'Pending', count: 1, color: Colors.gold },
              { label: 'Overdue', count: 1, color: Colors.orange },
              { label: 'Broken', count: 1, color: Colors.red },
            ].map((s) => (
              <GlassCard key={s.label} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: Colors.textSecondary, fontSize: Typography.size.sm }}>{s.label}</Text>
                <Text style={{ color: s.color, fontWeight: Typography.weight.bold, fontSize: Typography.size.xl }}>{s.count}</Text>
              </GlassCard>
            ))}
            <SectionHeader title="All Promises" />
            {PROMISES.map((p, i) => (
              <GlassCard key={i}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pillarLabel}>{p.pillar}</Text>
                    <Text style={styles.promiseText}>{p.text}</Text>
                    <Text style={styles.deadline}>Deadline: {p.deadline}</Text>
                  </View>
                  <Badge
                    label={p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    color={statusColor[p.status] + '22'}
                    textColor={statusColor[p.status]}
                  />
                </View>
              </GlassCard>
            ))}
          </View>
        )}

        {/* Members */}
        {activeTab === 'members' && (
          <View>
            <SectionHeader title="Global Member Stats" />
            <View style={styles.statsGrid}>
              <GlassCard style={styles.statCard}>
                <StatBox value="1.24M" label="Total Members" color={Colors.gold} />
              </GlassCard>
              <GlassCard style={styles.statCard}>
                <StatBox value="48" label="Countries" color={Colors.teal} />
              </GlassCard>
              <GlassCard style={styles.statCard}>
                <StatBox value="84K" label="Votes Today" color={Colors.purple} />
              </GlassCard>
              <GlassCard style={styles.statCard}>
                <StatBox value="7" label="Active Recalls" color={Colors.red} />
              </GlassCard>
            </View>
            <SectionHeader title="Trust Level Breakdown" />
            {[
              { level: 'Leader (5)', pct: 2, color: Colors.purple },
              { level: 'Trusted (4)', pct: 8, color: Colors.gold },
              { level: 'Verified (3)', pct: 34, color: Colors.teal },
              { level: 'Basic (2)', pct: 41, color: Colors.textSecondary },
              { level: 'Guest (1)', pct: 15, color: Colors.textMuted },
            ].map((l) => (
              <GlassCard key={l.level}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ color: Colors.textSecondary, fontSize: Typography.size.xs }}>{l.level}</Text>
                  <Text style={{ color: l.color, fontSize: Typography.size.xs, fontWeight: Typography.weight.bold }}>{l.pct}%</Text>
                </View>
                <View style={{ height: 6, backgroundColor: Colors.surfaceLight, borderRadius: 3, overflow: 'hidden' }}>
                  <View style={{ width: `${l.pct}%`, height: '100%', backgroundColor: l.color, borderRadius: 3 }} />
                </View>
              </GlassCard>
            ))}
          </View>
        )}

        {/* AI Audit */}
        {activeTab === 'audit' && (
          <View>
            <SectionHeader title="AI Governance Audit" />
            <GlassCard style={{ borderColor: Colors.green + '44', backgroundColor: Colors.green + '08' }}>
              <Text style={{ color: Colors.green, fontWeight: Typography.weight.bold, fontSize: Typography.size.base }}>
                ✅ Status: Clean
              </Text>
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.size.xs, marginTop: 4 }}>
                Last run: 2 hours ago · Next run: 22 hours
              </Text>
            </GlassCard>
            {[
              { check: 'Duplicate vote detection', result: 'PASS', detail: '0 anomalies found' },
              { check: 'Sybil account analysis', result: 'PASS', detail: '0 suspected multi-accounts' },
              { check: 'Treasury multi-sig compliance', result: 'PASS', detail: 'All 5 signatures verified' },
              { check: 'Term limit enforcement', result: 'PASS', detail: 'All contracts enforced on-chain' },
              { check: 'Financial anomaly detection', result: 'PASS', detail: 'No unusual transactions' },
            ].map((a, i) => (
              <GlassCard key={i}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: Colors.textPrimary, fontSize: Typography.size.sm, fontWeight: Typography.weight.medium }}>
                      {a.check}
                    </Text>
                    <Text style={{ color: Colors.textMuted, fontSize: Typography.size.xs, marginTop: 2 }}>{a.detail}</Text>
                  </View>
                  <Badge label={a.result} color={Colors.green + '22'} textColor={Colors.green} />
                </View>
              </GlassCard>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.base, paddingBottom: 80 },
  heading: { color: Colors.textPrimary, fontSize: Typography.size['2xl'], fontWeight: Typography.weight.extrabold, marginBottom: 4 },
  sub: { color: Colors.textSecondary, fontSize: Typography.size.sm, lineHeight: 20, marginBottom: Spacing.base },
  balanceCard: { alignItems: 'center', paddingVertical: Spacing.xl, marginBottom: Spacing.md },
  balanceLabel: { color: Colors.textMuted, fontSize: Typography.size.xs, textTransform: 'uppercase', marginBottom: 4 },
  balanceAmount: { color: Colors.gold, fontSize: Typography.size['3xl'], fontWeight: Typography.weight.extrabold },
  balanceSub: { color: Colors.textMuted, fontSize: Typography.size.xs, marginTop: Spacing.sm },
  tabs: { flexDirection: 'row', gap: 4, marginBottom: Spacing.base },
  tab: { flex: 1, alignItems: 'center', paddingVertical: Spacing.sm, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border },
  tabActive: { backgroundColor: Colors.gold + '22', borderColor: Colors.gold },
  tabText: { fontSize: 16 },
  tabLabel: { fontSize: Typography.size.xs, color: Colors.textMuted, marginTop: 2 },
  tabTextActive: { color: Colors.gold },
  txRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txType: { color: Colors.textPrimary, fontWeight: Typography.weight.semibold, fontSize: Typography.size.sm },
  txFrom: { color: Colors.textSecondary, fontSize: Typography.size.xs },
  txTime: { color: Colors.textMuted, fontSize: Typography.size.xs },
  txAmount: { fontSize: Typography.size.md, fontWeight: Typography.weight.bold },
  pillarLabel: { color: Colors.teal, fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold, marginBottom: 2 },
  promiseText: { color: Colors.textPrimary, fontSize: Typography.size.sm, fontWeight: Typography.weight.medium },
  deadline: { color: Colors.textMuted, fontSize: Typography.size.xs, marginTop: 2 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  statCard: { flex: 1, minWidth: '45%', justifyContent: 'center', alignItems: 'center', paddingVertical: Spacing.xl },
});
