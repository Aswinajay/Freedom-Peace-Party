import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GlassCard, Badge, Button, SectionHeader } from '../components/UI';
import { mockLeaders } from '../api/mockData';
import { Leader } from '../store/useStore';

const approvalColor = (r: number) =>
  r >= 70 ? Colors.green : r >= 50 ? Colors.gold : Colors.red;

const trendIcon = (t: string) =>
  t === 'rising' ? '↑' : t === 'falling' ? '↓' : '→';

export const LeadersScreen: React.FC<any> = ({ navigation }) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <Text style={styles.heading}>👥 Leaders</Text>
      <Text style={styles.sub}>Every decision, every promise — publicly tracked. Forever.</Text>
      {mockLeaders.map((leader) => (
        <GlassCard key={leader.id} onPress={() => navigation.navigate('LeaderProfile', { leader })}>
          <View style={styles.row}>
            <View style={[styles.avatar, { backgroundColor: Colors.purple + '33' }]}>
              <Text style={styles.avatarText}>{leader.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{leader.name}</Text>
              <Text style={styles.pos}>{leader.position}</Text>
              <Text style={styles.chapter}>📍 {leader.chapter}</Text>
              {leader.activeRecalls > 0 && (
                <Badge label={`🔴 ${leader.activeRecalls} recall pending`} color={Colors.red + '22'} textColor={Colors.red} />
              )}
            </View>
            <View style={styles.ratingBox}>
              <Text style={[styles.rating, { color: approvalColor(leader.approvalRating) }]}>
                {leader.approvalRating}%
              </Text>
              <Text style={[styles.trend, { color: approvalColor(leader.approvalRating) }]}>
                {trendIcon(leader.approvalTrend)}
              </Text>
            </View>
          </View>

          {/* Promise bar */}
          <View style={styles.promiseRow}>
            <View style={[styles.promiseDot, { backgroundColor: Colors.green }]} />
            <Text style={styles.promiseLabel}>{leader.promisesKept} kept</Text>
            <View style={[styles.promiseDot, { backgroundColor: Colors.red, marginLeft: Spacing.md }]} />
            <Text style={styles.promiseLabel}>{leader.promisesBroken} broken</Text>
            <View style={[styles.promiseDot, { backgroundColor: Colors.gold, marginLeft: Spacing.md }]} />
            <Text style={styles.promiseLabel}>{leader.promisesPending} pending</Text>
          </View>
        </GlassCard>
      ))}
    </ScrollView>
  </View>
);

// ─── Leader Profile ───────────────────────────────────────────────────────────
export const LeaderProfileScreen: React.FC<any> = ({ route, navigation }) => {
  const leader = route?.params?.leader;
  const termDaysLeft = Math.max(
    0,
    Math.floor((new Date(leader.termEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: Spacing.base }}>
          <Text style={{ color: Colors.textSecondary }}>← Leaders</Text>
        </TouchableOpacity>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroAvatar, { backgroundColor: Colors.purple + '33' }]}>
            <Text style={styles.heroAvatarText}>{leader.name[0]}</Text>
          </View>
          <Text style={styles.heroName}>{leader.name}</Text>
          <Text style={styles.heroPos}>{leader.position}</Text>
          <Text style={styles.heroChapter}>📍 {leader.chapter}</Text>

          <View style={styles.heroRating}>
            <Text style={[styles.heroRatingNum, { color: approvalColor(leader.approvalRating) }]}>
              {leader.approvalRating}%
            </Text>
            <Text style={styles.heroRatingLabel}>Approval {trendIcon(leader.approvalTrend)}</Text>
          </View>
        </View>

        {/* Term info */}
        <GlassCard>
          <Text style={styles.sectionLabel}>📅 Term</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.termValue}>{termDaysLeft}d</Text>
              <Text style={styles.termLabel}>days remaining</Text>
            </View>
            <View>
              <Text style={styles.termValue}>2 / 2</Text>
              <Text style={styles.termLabel}>max terms</Text>
            </View>
            <View>
              <Text style={styles.termValue}>{new Date(leader.termEnd).getFullYear()}</Text>
              <Text style={styles.termLabel}>term ends</Text>
            </View>
          </View>
        </GlassCard>

        {/* Promises */}
        <GlassCard>
          <Text style={styles.sectionLabel}>📋 Promise Tracker</Text>
          {[
            { label: 'Kept', value: leader.promisesKept, color: Colors.green },
            { label: 'Broken', value: leader.promisesBroken, color: Colors.red },
            { label: 'Pending', value: leader.promisesPending, color: Colors.gold },
          ].map((p) => (
            <View key={p.label} style={styles.promiseBarRow}>
              <Text style={[styles.promiseBarLabel, { color: p.color }]}>{p.label}</Text>
              <View style={styles.promiseBarBg}>
                <View
                  style={[
                    styles.promiseBarFill,
                    {
                      width: `${(p.value / (leader.promisesKept + leader.promisesBroken + leader.promisesPending)) * 100}%`,
                      backgroundColor: p.color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.promiseBarValue, { color: p.color }]}>{p.value}</Text>
            </View>
          ))}
        </GlassCard>

        {/* Recall status */}
        {leader.activeRecalls > 0 && (
          <GlassCard style={{ borderColor: Colors.red + '44', backgroundColor: Colors.red + '10' }}>
            <Text style={{ color: Colors.red, fontWeight: Typography.weight.bold, fontSize: Typography.size.base }}>
              🔴 {leader.activeRecalls} Active Recall Petition
            </Text>
            <Text style={{ color: Colors.textSecondary, fontSize: Typography.size.xs, marginTop: 4 }}>
              A recall petition has been validated and is currently active. Referendum opens when signatures reach 10% of chapter members.
            </Text>
          </GlassCard>
        )}

        {/* Actions */}
        <Button
          label="🔴 Start Recall Petition"
          onPress={() => onStartRecall(leader)}
          variant="danger"
          size="md"
          style={{ marginBottom: Spacing.sm }}
        />
        <Button label="⭐ Rate This Leader" onPress={() => {}} variant="ghost" size="md" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.base, paddingBottom: 80 },
  heading: { color: Colors.textPrimary, fontSize: Typography.size['2xl'], fontWeight: Typography.weight.extrabold, marginBottom: 4 },
  sub: { color: Colors.textSecondary, fontSize: Typography.size.sm, marginBottom: Spacing.base },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Colors.purple, fontWeight: Typography.weight.bold, fontSize: Typography.size.xl },
  name: { color: Colors.textPrimary, fontWeight: Typography.weight.bold, fontSize: Typography.size.base },
  pos: { color: Colors.textSecondary, fontSize: Typography.size.xs, marginBottom: 2 },
  chapter: { color: Colors.textMuted, fontSize: Typography.size.xs, marginBottom: 4 },
  ratingBox: { alignItems: 'center' },
  rating: { fontSize: Typography.size.xl, fontWeight: Typography.weight.extrabold },
  trend: { fontSize: 18, fontWeight: Typography.weight.bold },
  promiseRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  promiseDot: { width: 8, height: 8, borderRadius: 4 },
  promiseLabel: { color: Colors.textSecondary, fontSize: Typography.size.xs, marginLeft: 4 },
  // Profile styles
  hero: { alignItems: 'center', paddingVertical: Spacing.xl },
  heroAvatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  heroAvatarText: { color: Colors.purple, fontSize: Typography.size['2xl'], fontWeight: Typography.weight.extrabold },
  heroName: { color: Colors.textPrimary, fontSize: Typography.size.xl, fontWeight: Typography.weight.extrabold },
  heroPos: { color: Colors.textSecondary, fontSize: Typography.size.sm, marginTop: 2 },
  heroChapter: { color: Colors.textMuted, fontSize: Typography.size.xs, marginTop: 2 },
  heroRating: { alignItems: 'center', marginTop: Spacing.md },
  heroRatingNum: { fontSize: Typography.size['3xl'], fontWeight: Typography.weight.extrabold },
  heroRatingLabel: { color: Colors.textSecondary, fontSize: Typography.size.xs },
  sectionLabel: { color: Colors.textMuted, fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold, marginBottom: Spacing.md, textTransform: 'uppercase' },
  termValue: { color: Colors.textPrimary, fontSize: Typography.size.xl, fontWeight: Typography.weight.bold },
  termLabel: { color: Colors.textMuted, fontSize: Typography.size.xs },
  promiseBarRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  promiseBarLabel: { width: 52, fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold },
  promiseBarBg: { flex: 1, height: 6, backgroundColor: Colors.surfaceLight, borderRadius: 3, overflow: 'hidden' },
  promiseBarFill: { height: '100%', borderRadius: 3 },
  promiseBarValue: { width: 24, fontSize: Typography.size.xs, textAlign: 'right', fontWeight: Typography.weight.bold },
});
