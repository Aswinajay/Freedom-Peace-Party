import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GlassCard, Badge } from '../components/UI';

const MANIFESTO_PILLARS = [
  { icon: '🗽', num: 1, title: 'Digital Freedom', tagline: 'Free, open, uncensored internet as a human right.', belief: 'The internet is the printing press of our era. Those who censor it are the tyrants of our era.', deadline: 'Legally binding in all member nations by 2027', color: Colors.gold },
  { icon: '☮️', num: 2, title: 'World Peace', tagline: 'Binding arbitration before any military action.', belief: 'War is a failure of imagination — and a crime against humanity.', deadline: '50 nations sign peace arbitration treaty by 2027', color: Colors.teal },
  { icon: '⚖️', num: 3, title: 'Justice & Human Rights', tagline: 'One law for every human. No immunity for anyone.', belief: 'Justice is not a service to be purchased. It is a right to be guaranteed.', deadline: 'Full legal framework in all member nations by 2028', color: Colors.purple },
  { icon: '🌱', num: 4, title: 'Ecological Revolution', tagline: '100% renewable energy by 2045. No exceptions.', belief: 'Climate change is not a future problem. It is a present emergency.', deadline: 'All policies enforceable law by 2028', color: Colors.green },
  { icon: '🏥', num: 5, title: 'Health For All', tagline: 'Walk in, get treated, never billed beyond means.', belief: 'Healthcare is not a market. Health is a human right.', deadline: 'Every member nation healthcare reformed by 2028', color: Colors.red },
  { icon: '📚', num: 6, title: 'Education as Liberation', tagline: 'Free — birth through university. Debt-free. Everywhere.', belief: 'Education is the awakening of a human mind — not preparation for servitude.', deadline: 'Free education enacted in all member nations by 2027', color: Colors.teal },
  { icon: '💰', num: 7, title: 'Economic Revolution', tagline: 'UBI for all. Wealth cap $10B. 4-day work week.', belief: 'Poverty is manufactured by policy. The money to end it exists. It is simply in the wrong hands.', deadline: 'UBI pilots by 2026, mandatory global standard by 2032', color: Colors.gold },
  { icon: '🤝', num: 8, title: 'Cultural Freedom & Equality', tagline: 'Every identity deserves full legal protection.', belief: 'Every culture carries irreplaceable wisdom. Every identity deserves protection.', deadline: 'All equality laws enacted by 2027', color: Colors.purple },
  { icon: '🤖', num: 9, title: 'Technology for Humanity', tagline: 'AI serves people. Never to surveil or control.', belief: 'Technology becomes good or evil based on who controls it and for whose benefit.', deadline: 'First AI governance laws by 2027', color: Colors.teal },
  { icon: '🏛️', num: 10, title: 'Democratic Revolution', tagline: 'Liquid democracy. Blockchain voting. Instant recall.', belief: 'Real democracy means real power for real people — every single day.', deadline: 'First member nations fully implement by 2028', color: Colors.gold },
  { icon: '🌐', num: 11, title: 'Equal Nations Doctrine', tagline: 'USA and Nepal vote identically. Always.', belief: 'No country is more important than another. No citizen is more valuable than another.', deadline: 'Immediate and permanent', color: Colors.green },
  { icon: '🔐', num: 12, title: "Verified People's Democracy", tagline: 'ZK Proofs: proves humanity without revealing identity.', belief: 'Every vote must come from a real human. Every voter must be safe.', deadline: 'Core to platform architecture', color: Colors.purple },
];

const CORE_VALUES = [
  { emoji: '🗽', name: 'Freedom', desc: 'Political, digital, personal, economic, cultural freedom — for every human being.' },
  { emoji: '☮️', name: 'Peace', desc: 'Peace is the presence of justice. We choose dialogue over destruction. Every single time.' },
  { emoji: '⚖️', name: 'Equality', desc: 'Every human life has identical worth. No nationality, race, religion, or documentation changes this.' },
  { emoji: '📖', name: 'Transparency', desc: 'If it cannot be said publicly, it will not be done privately. Everything on blockchain.' },
  { emoji: '🔒', name: 'Accountability', desc: 'Every leader answers to every member. Every promise has a deadline. Every failure is admitted.' },
];

export const ManifestoScreen: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <GlassCard style={styles.hero}>
          <Text style={styles.heroEmoji}>🌍</Text>
          <Text style={styles.heroTitle}>Freedom & Peace Party</Text>
          <Text style={styles.heroSubtitle}>Complete Grand Unified Manifesto — v9.0</Text>
          <Text style={styles.heroQuote}>
            "Born From Pain. Built From Hope. Verified By People. Applied In Real Politics. Owned By All Humanity. Forever."
          </Text>
          <View style={styles.heroBadges}>
            <Badge label="March 2026" color={Colors.gold + '22'} textColor={Colors.gold} />
            <Badge label="Public Domain" color={Colors.teal + '22'} textColor={Colors.teal} />
            <Badge label="Blockchain-stored" color={Colors.purple + '22'} textColor={Colors.purple} />
          </View>
        </GlassCard>

        {/* 5 Core Values */}
        <Text style={styles.sectionTitle}>⚡ 5 Core Values</Text>
        {CORE_VALUES.map((v) => (
          <GlassCard key={v.name}>
            <Text style={styles.valueEmoji}>{v.emoji}</Text>
            <Text style={styles.valueName}>{v.name}</Text>
            <Text style={styles.valueDesc}>{v.desc}</Text>
          </GlassCard>
        ))}

        {/* 12 Pillars */}
        <Text style={styles.sectionTitle}>🏛️ 12 Revolutionary Pillars</Text>
        {MANIFESTO_PILLARS.map((p) => (
          <GlassCard
            key={p.num}
            onPress={() => setExpanded(expanded === p.num ? null : p.num)}
            style={expanded === p.num ? { borderColor: p.color + '66' } : undefined}
          >
            <View style={styles.pillarRow}>
              <View style={[styles.pillarNum, { backgroundColor: p.color + '22' }]}>
                <Text style={[styles.pillarNumText, { color: p.color }]}>{p.num}</Text>
              </View>
              <Text style={styles.pillarIcon}>{p.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.pillarTitle, { color: p.color }]}>{p.title}</Text>
                <Text style={styles.pillarTagline}>{p.tagline}</Text>
              </View>
              <Text style={{ color: Colors.textMuted, fontSize: 16 }}>{expanded === p.num ? '▲' : '▼'}</Text>
            </View>
            {expanded === p.num && (
              <View style={[styles.pillarExpanded, { borderTopColor: p.color + '33' }]}>
                <Text style={styles.pillarBelief}>"{p.belief}"</Text>
                <View style={styles.deadlineRow}>
                  <Text style={styles.deadlineIcon}>⏰</Text>
                  <Text style={styles.pillarDeadline}>{p.deadline}</Text>
                </View>
              </View>
            )}
          </GlassCard>
        ))}

        {/* Timeline */}
        <Text style={styles.sectionTitle}>📅 Implementation Timeline</Text>
        {[
          ['2026', 'App live globally · 100K members · Party registered in 5 countries'],
          ['2027', '1M members · First local election wins in 10 countries'],
          ['2028', '10M members · Universal Ethics Court operational'],
          ['2030', '100M members · UBI in 20 countries · Parliament seats in 5 nations'],
          ['2035', '500M members · Coalition governments in 10 countries'],
          ['2040', '1B members · Nuclear disarmament 50% complete · Fossil fuels nearly eliminated'],
          ['2050', '2B members — Freedom & Peace governance is the global standard'],
        ].map(([year, desc]) => (
          <GlassCard key={year}>
            <View style={{ flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start' }}>
              <Text style={styles.year}>{year}</Text>
              <Text style={styles.yearDesc}>{desc}</Text>
            </View>
          </GlassCard>
        ))}

        <GlassCard style={styles.footer}>
          <Text style={styles.footerText}>
            {'"This manifesto belongs to every human being equally.\nNo individual, government, corporation, or algorithm owns it.\nIt is the property of humanity — and humanity alone."'}
          </Text>
        </GlassCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.base, paddingBottom: 80 },
  hero: { alignItems: 'center', paddingVertical: Spacing.xl, marginBottom: Spacing.base },
  heroEmoji: { fontSize: 56, marginBottom: Spacing.sm },
  heroTitle: { color: Colors.gold, fontSize: Typography.size.xl, fontWeight: Typography.weight.extrabold, textAlign: 'center' },
  heroSubtitle: { color: Colors.textSecondary, fontSize: Typography.size.xs, marginTop: 4, textAlign: 'center' },
  heroQuote: { color: Colors.textSecondary, fontSize: Typography.size.xs, lineHeight: 18, textAlign: 'center', fontStyle: 'italic', marginVertical: Spacing.md, paddingHorizontal: Spacing.md },
  heroBadges: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap', justifyContent: 'center' },
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.size.md, fontWeight: Typography.weight.bold, marginBottom: Spacing.md, marginTop: Spacing.base },
  valueEmoji: { fontSize: 28, marginBottom: 4 },
  valueName: { color: Colors.gold, fontWeight: Typography.weight.bold, fontSize: Typography.size.base, marginBottom: 4 },
  valueDesc: { color: Colors.textSecondary, fontSize: Typography.size.xs, lineHeight: 18 },
  pillarRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  pillarNum: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  pillarNumText: { fontWeight: Typography.weight.bold, fontSize: Typography.size.sm },
  pillarIcon: { fontSize: 22 },
  pillarTitle: { fontWeight: Typography.weight.bold, fontSize: Typography.size.sm },
  pillarTagline: { color: Colors.textSecondary, fontSize: Typography.size.xs, lineHeight: 16, marginTop: 2 },
  pillarExpanded: { borderTopWidth: 1, marginTop: Spacing.md, paddingTop: Spacing.md },
  pillarBelief: { color: Colors.textPrimary, fontSize: Typography.size.sm, lineHeight: 20, fontStyle: 'italic', marginBottom: Spacing.sm },
  deadlineRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.surface, padding: 8, borderRadius: Radius.sm },
  deadlineIcon: { fontSize: 14 },
  pillarDeadline: { color: Colors.gold, fontSize: Typography.size.xs, fontWeight: Typography.weight.bold },
  year: { color: Colors.gold, fontWeight: Typography.weight.extrabold, fontSize: Typography.size.base, minWidth: 44 },
  yearDesc: { color: Colors.textSecondary, fontSize: Typography.size.xs, flex: 1, lineHeight: 18 },
  footer: { backgroundColor: Colors.purple + '15', borderColor: Colors.purple + '33', alignItems: 'center', paddingVertical: Spacing.xl },
  footerText: { color: Colors.textSecondary, fontSize: Typography.size.xs, lineHeight: 20, textAlign: 'center', fontStyle: 'italic' },
});
