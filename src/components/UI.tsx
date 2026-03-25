import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';

// ─── GlassCard ───────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export const GlassCard: React.FC<CardProps> = ({ children, style, onPress }) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.glassCard, style]}
    >
      {children}
    </Wrapper>
  );
};

// ─── Button ──────────────────────────────────────────────────────────────────
interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'gold' | 'teal' | 'purple' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'gold',
  size = 'md',
  style,
  disabled,
  icon,
}) => {
  const bgColor = {
    gold: Colors.gold,
    teal: Colors.teal,
    purple: Colors.purple,
    ghost: 'transparent',
    danger: Colors.red,
  }[variant];

  const textColor = variant === 'gold' ? '#000' : Colors.textPrimary;

  const padding = {
    sm: { paddingVertical: 8, paddingHorizontal: 14 },
    md: { paddingVertical: 13, paddingHorizontal: 20 },
    lg: { paddingVertical: 16, paddingHorizontal: 28 },
  }[size];

  const fontSize = { sm: 12, md: 14, lg: 16 }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: bgColor, ...padding, opacity: disabled ? 0.5 : 1 },
        variant === 'ghost' && styles.ghostBorder,
        style,
      ]}
    >
      {icon && <View style={{ marginRight: 6 }}>{icon}</View>}
      <Text style={[styles.buttonText, { color: textColor, fontSize }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// ─── Badge ───────────────────────────────────────────────────────────────────
interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = Colors.gold + '22',
  textColor = Colors.gold,
}) => (
  <View style={[styles.badge, { backgroundColor: color }]}>
    <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
  </View>
);

// ─── SectionHeader ───────────────────────────────────────────────────────────
export const SectionHeader: React.FC<{
  title: string;
  action?: { label: string; onPress: () => void };
}> = ({ title, action }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action && (
      <TouchableOpacity onPress={action.onPress}>
        <Text style={styles.sectionAction}>{action.label}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── StatBox ─────────────────────────────────────────────────────────────────
export const StatBox: React.FC<{
  value: string;
  label: string;
  color?: string;
}> = ({ value, label, color = Colors.gold }) => (
  <View style={styles.statBox}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── TrustBadge ──────────────────────────────────────────────────────────────
const trustLabels = ['', 'Guest', 'Basic', 'Verified', 'Trusted', 'Leader'];
const trustColors = ['', '#6B7280', '#3B82F6', Colors.teal, Colors.gold, Colors.purple];

export const TrustBadge: React.FC<{ level: 1 | 2 | 3 | 4 | 5 }> = ({ level }) => (
  <Badge
    label={`⭐ ${trustLabels[level]}`}
    color={trustColors[level] + '22'}
    textColor={trustColors[level]}
  />
);

const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: Colors.glass,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  button: {
    borderRadius: Radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: Typography.weight.bold,
    letterSpacing: 0.3,
  },
  ghostBorder: {
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.base,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  sectionAction: {
    fontSize: Typography.size.sm,
    color: Colors.gold,
    fontWeight: Typography.weight.semibold,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extrabold,
  },
  statLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
});
