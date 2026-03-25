import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GlassCard, Button, Badge } from '../components/UI';
import { mockLeaders } from '../api/mockData';
import { Leader } from '../store/useStore';

const RECALL_REASONS = [
  'Failed to publish monthly report',
  'Unanswered member questions (30+ days)',
  'Conflict of interest not declared',
  'Corporate/government gift accepted',
  'Override of democratic member vote',
  'Term extension attempt',
  'Corruption evidence',
  'Other',
];

interface RecallProps {
  preSelectedLeader?: Leader;
  onBack: () => void;
}

export const RecallScreen: React.FC<RecallProps> = ({ preSelectedLeader, onBack }) => {
  const [stage, setStage] = useState<'list' | 'file' | 'submitted'>('list');
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(preSelectedLeader ?? null);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [recallId, setRecallId] = useState('');

  const handleFile = async () => {
    if (!selectedLeader || !reason) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const id = 'RCL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setRecallId(id);
    setLoading(false);
    setStage('submitted');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: Spacing.base }}>
          <Text style={{ color: Colors.textSecondary }}>← Back</Text>
        </TouchableOpacity>

        {stage === 'list' && (
          <>
            <Text style={styles.heading}>🏛️ Recall System</Text>
            <Text style={styles.sub}>
              Hold leaders accountable. Any member can file a recall with evidence. A 5-person neutral committee reviews it in 7 days. Verified recalls trigger a chapter-wide referendum.
            </Text>

            {/* How it works */}
            <GlassCard style={styles.flowCard}>
              {[
                ['1', '📝 File Recall', 'Submit evidence to IPFS — permanent & uncensorable'],
                ['2', '⚖️ Committee Review', '7-day neutral review by 5 random senior members'],
                ['3', '🗳️ Referendum', 'Chapter votes: Remove / Warning / Endorse'],
                ['4', '⚡ Auto Execute', '50%+ Remove → leader gone within 21 days'],
              ].map(([step, title, desc]) => (
                <View key={step} style={styles.flowStep}>
                  <View style={styles.flowNum}>
                    <Text style={styles.flowNumText}>{step}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.flowTitle}>{title}</Text>
                    <Text style={styles.flowDesc}>{desc}</Text>
                  </View>
                </View>
              ))}
            </GlassCard>

            <Text style={styles.subHeading}>Select a Leader to Recall</Text>
            {mockLeaders.map((l) => (
              <GlassCard
                key={l.id}
                onPress={() => { setSelectedLeader(l); setStage('file'); }}
              style={l.approvalRating < 50 ? { borderColor: Colors.red + '44' } : undefined}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{l.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.leaderName}>{l.name}</Text>
                    <Text style={styles.leaderPos}>{l.position}</Text>
                    {l.activeRecalls > 0 && <Badge label="🔴 Recall active" color={Colors.red + '22'} textColor={Colors.red} />}
                  </View>
                  <Text style={{ color: l.approvalRating < 50 ? Colors.red : Colors.green, fontWeight: Typography.weight.bold, fontSize: Typography.size.lg }}>
                    {l.approvalRating}%
                  </Text>
                </View>
              </GlassCard>
            ))}
          </>
        )}

        {stage === 'file' && selectedLeader && (
          <>
            <Text style={styles.heading}>File Recall</Text>
            <Badge label={`Against: ${selectedLeader.name}`} color={Colors.red + '22'} textColor={Colors.red} />

            <Text style={[styles.subHeading, { marginTop: Spacing.xl }]}>Select Reason</Text>
            {RECALL_REASONS.map((r) => (
              <TouchableOpacity
                key={r}
                onPress={() => setReason(r)}
                style={[styles.reasonBtn, reason === r && { borderColor: Colors.red, backgroundColor: Colors.red + '15' }]}
              >
                <Text style={[styles.reasonText, reason === r && { color: Colors.red }]}>{r}</Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.subHeading, { marginTop: Spacing.md }]}>Details & Evidence</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the specific actions, dates, and incidents. All evidence is uploaded to IPFS permanently."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={6}
              value={details}
              onChangeText={setDetails}
              textAlignVertical="top"
            />

            <GlassCard style={{ marginTop: Spacing.md }}>
              <Text style={{ color: Colors.textMuted, fontSize: Typography.size.xs }}>
                🔒 Evidence is uploaded to IPFS — permanent and uncensorable. This recall will be publicly visible to all chapter members immediately.
              </Text>
            </GlassCard>

            <Button
              label={loading ? 'Filing to blockchain…' : '📨 File Recall Petition'}
              onPress={handleFile}
              variant="danger"
              size="lg"
              disabled={!reason || loading}
              style={{ marginTop: Spacing.xl }}
            />
            <Button label="Cancel" onPress={() => setStage('list')} variant="ghost" size="md" style={{ marginTop: Spacing.sm }} />
          </>
        )}

        {stage === 'submitted' && (
          <View style={{ alignItems: 'center', paddingTop: Spacing['3xl'] }}>
            <Text style={{ fontSize: 64 }}>📨</Text>
            <Text style={[styles.heading, { textAlign: 'center', color: Colors.red }]}>Recall Filed</Text>
            <Text style={styles.sub}>
              Your recall petition against {selectedLeader?.name} has been filed and recorded permanently on the blockchain.
            </Text>
            <GlassCard style={{ width: '100%', marginTop: Spacing.xl }}>
              <Text style={styles.subHeading}>What happens next</Text>
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.size.sm, lineHeight: 22 }}>
                {'→'} 5 senior members randomly selected as committee{'\n'}
                {'→'} 7-day neutral review with public hearing{'\n'}
                {'→'} If valid: chapter-wide referendum opens{'\n'}
                {'→'} 50% Remove vote → leader gone in 21 days
              </Text>
            </GlassCard>
            <Text style={styles.recallId}>Recall ID: {recallId}</Text>
            <Button label="Done" onPress={onBack} variant="gold" size="md" style={{ marginTop: Spacing.xl }} />
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
  subHeading: { color: Colors.textPrimary, fontSize: Typography.size.base, fontWeight: Typography.weight.bold, marginBottom: Spacing.md },
  flowCard: { marginBottom: Spacing.base },
  flowStep: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, marginBottom: Spacing.md },
  flowNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.red + '33', alignItems: 'center', justifyContent: 'center' },
  flowNumText: { color: Colors.red, fontWeight: Typography.weight.bold, fontSize: Typography.size.sm },
  flowTitle: { color: Colors.textPrimary, fontWeight: Typography.weight.semibold, fontSize: Typography.size.sm },
  flowDesc: { color: Colors.textSecondary, fontSize: Typography.size.xs, lineHeight: 18 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.purple + '33', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Colors.purple, fontWeight: Typography.weight.bold, fontSize: Typography.size.md },
  leaderName: { color: Colors.textPrimary, fontWeight: Typography.weight.bold, fontSize: Typography.size.base },
  leaderPos: { color: Colors.textSecondary, fontSize: Typography.size.xs, marginBottom: 4 },
  reasonBtn: { borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, backgroundColor: Colors.glass },
  reasonText: { color: Colors.textPrimary, fontSize: Typography.size.sm },
  textArea: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.size.sm,
    minHeight: 120,
    lineHeight: 20,
  },
  recallId: { color: Colors.textMuted, fontSize: Typography.size.xs, marginTop: Spacing.md, fontFamily: 'monospace' },
});
