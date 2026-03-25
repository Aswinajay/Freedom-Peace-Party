import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { Button, GlassCard, Badge } from '../components/UI';
import { useStore } from '../store/useStore';
import { mockMember } from '../api/mockData';

const VERIFICATION_METHODS = [
  {
    id: 'worldcoin',
    icon: '👁️',
    title: 'Worldcoin',
    desc: 'Iris scan — highest trust. No ID stored.',
    trust: 'Verified (Level 3)',
    color: Colors.teal,
  },
  {
    id: 'vouching',
    icon: '🤝',
    title: 'Community Vouching',
    desc: '3 existing members vouch for you. No ID required.',
    trust: 'Basic (Level 2)',
    color: Colors.purple,
  },
  {
    id: 'basic',
    icon: '📧',
    title: 'Email + OTP',
    desc: 'Quick start. Upgrade verification later.',
    trust: 'Basic (Level 2)',
    color: Colors.gold,
  },
  {
    id: 'anonymous',
    icon: '🔒',
    title: 'Anonymous (High-Risk)',
    desc: 'For members in authoritarian countries. Tor + ZK Proof.',
    trust: 'Guest (Level 1)',
    color: Colors.red,
  },
];

interface RegisterProps {
  onRegistered: () => void;
  onBack: () => void;
}

export const RegisterScreen: React.FC<RegisterProps> = ({ onRegistered, onBack }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [method, setMethod] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { setMember, setToken } = useStore();

  const handleRegister = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // Simulate API
    setMember({ ...mockMember, displayName: name || 'New Member' });
    setToken('mock_jwt_token_2026');
    setLoading(false);
    onRegistered();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Join Free 🌍</Text>
        <Text style={styles.subheading}>1 member = 1 vote. Always.</Text>

        {/* Progress steps */}
        <View style={styles.stepRow}>
          {['Details', 'Verify', 'Done'].map((s, i) => (
            <View key={s} style={styles.stepItem}>
              <View style={[styles.stepDot, { backgroundColor: i + 1 <= step ? Colors.gold : Colors.surfaceLight }]}>
                <Text style={[styles.stepNum, { color: i + 1 <= step ? '#000' : Colors.textMuted }]}>{i + 1}</Text>
              </View>
              <Text style={[styles.stepLabel, { color: i + 1 <= step ? Colors.gold : Colors.textMuted }]}>{s}</Text>
            </View>
          ))}
        </View>

        {/* Step 1 */}
        {step === 1 && (
          <View style={styles.form}>
            <Text style={styles.inputLabel}>Display Name (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="How you'll appear to members"
              placeholderTextColor={Colors.textMuted}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor={Colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Min. 8 characters"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <GlassCard style={styles.privacyNote}>
              <Text style={styles.privacyText}>
                🔒 Your email is hashed — we never store it in plain text. Your data belongs to you.
              </Text>
            </GlassCard>

            <Button
              label="Continue →"
              onPress={() => setStep(2)}
              variant="gold"
              size="lg"
              disabled={!email || !password}
              style={styles.stepBtn}
            />
          </View>
        )}

        {/* Step 2 — Verify */}
        {step === 2 && (
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Choose Verification Method</Text>
            <Text style={styles.sectionSub}>Higher verification = more voting power. You can always upgrade later.</Text>

            {VERIFICATION_METHODS.map((m) => (
              <TouchableOpacity
                key={m.id}
                onPress={() => setMethod(m.id)}
                style={[
                  styles.methodCard,
                  method === m.id && { borderColor: m.color, backgroundColor: m.color + '15' },
                ]}
                activeOpacity={0.85}
              >
                <Text style={styles.methodIcon}>{m.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.methodTitle}>{m.title}</Text>
                  <Text style={styles.methodDesc}>{m.desc}</Text>
                  <Badge label={m.trust} color={m.color + '22'} textColor={m.color} />
                </View>
                {method === m.id && <Text style={{ color: m.color, fontSize: 20 }}>✓</Text>}
              </TouchableOpacity>
            ))}

            <Button
              label="Register →"
              onPress={handleRegister}
              variant="gold"
              size="lg"
              disabled={!method || loading}
              style={styles.stepBtn}
            />
            {loading && <Text style={styles.loadingText}>🔐 Verifying and creating your member record on blockchain…</Text>}
          </View>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing['2xl'], paddingBottom: 60 },
  backBtn: { marginBottom: Spacing.base },
  backText: { color: Colors.textSecondary, fontSize: Typography.size.sm },
  heading: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.extrabold, color: Colors.gold, marginBottom: 4 },
  subheading: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginBottom: Spacing.xl },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing['2xl'], paddingHorizontal: Spacing.xl },
  stepItem: { alignItems: 'center', gap: 4 },
  stepDot: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  stepNum: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold },
  stepLabel: { fontSize: Typography.size.xs, fontWeight: Typography.weight.medium },
  form: { gap: 6 },
  inputLabel: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginBottom: 4, marginTop: Spacing.md },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.size.base,
    marginBottom: 4,
  },
  privacyNote: { marginVertical: Spacing.md },
  privacyText: { color: Colors.textSecondary, fontSize: Typography.size.xs, lineHeight: 18 },
  stepBtn: { marginTop: Spacing.xl },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.textPrimary, marginBottom: 4 },
  sectionSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginBottom: Spacing.base, lineHeight: 20 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.glass,
  },
  methodIcon: { fontSize: 28 },
  methodTitle: { fontSize: Typography.size.base, fontWeight: Typography.weight.bold, color: Colors.textPrimary, marginBottom: 2 },
  methodDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginBottom: 6, lineHeight: 17 },
  loadingText: { textAlign: 'center', color: Colors.textSecondary, fontSize: Typography.size.sm, marginTop: Spacing.md },
});
