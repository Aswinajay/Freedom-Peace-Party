import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { Button, GlassCard, Badge } from '../components/UI';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    emoji: '🌍',
    tag: 'Who We Are',
    title: 'Born From Pain.\nBuilt From Hope.',
    body: 'Verified By People. Applied In Real Politics. Owned By All Humanity. Forever.',
    accent: Colors.gold,
  },
  {
    id: 2,
    emoji: '⚖️',
    tag: 'What We Believe',
    title: '5 Values That\nChange Everything',
    body: 'Freedom · Peace · Equality · Transparency · Accountability\n\nNot as slogans. As legally binding guarantees enforced by blockchain.',
    accent: Colors.teal,
  },
  {
    id: 3,
    emoji: '🗳️',
    tag: 'Your Power',
    title: 'Real Democracy.\nEvery Day.',
    body: 'Vote on real laws. Elect leaders. Recall them instantly. Propose policy. All anonymous. All permanent. All yours.',
    accent: Colors.purple,
  },
  {
    id: 4,
    emoji: '✊',
    tag: 'Join Free',
    title: 'One World.\nOne Movement.',
    body: 'Join 1.2 million members across 48 countries. Free forever. Verified by mathematics, not governments.',
    accent: Colors.gold,
    isLast: true,
  },
];

export const OnboardingScreen: React.FC<any> = ({ navigation }) => {
  const [current, setCurrent] = React.useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goToSlide = (idx: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -30, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setCurrent(idx);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    });
  };

  const slide = SLIDES[current];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Background accent blob */}
      <View style={[styles.blob, { backgroundColor: slide.accent + '15' }]} />

      <View style={styles.skipRow}>
        {current < SLIDES.length - 1 && (
          <TouchableOpacity onPress={() => goToSlide(SLIDES.length - 1)}>
            <Text style={styles.skipText}>Skip →</Text>
          </TouchableOpacity>
        )}
      </View>

      <Animated.View
        style={[
          styles.slideContent,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Badge
          label={slide.tag}
          color={slide.accent + '22'}
          textColor={slide.accent}
        />
        <Text style={[styles.title, { color: slide.accent === Colors.gold ? Colors.gold : Colors.textPrimary }]}>
          {slide.title}
        </Text>
        <Text style={styles.body}>{slide.body}</Text>
      </Animated.View>

      {/* Progress dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => goToSlide(i)}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: i === current ? slide.accent : Colors.border,
                  width: i === current ? 24 : 8,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* CTA Area */}
      {slide.isLast ? (
        <View style={styles.ctaArea}>
          <Button label="🌍  Join Free — Verify Your Humanity" onPress={() => navigation.navigate('Register')} variant="gold" size="lg" style={styles.ctaBtn} />
          <Button label="Read Full Manifesto First" onPress={() => navigation.navigate('MainTabs', { screen: 'Manifesto' })} variant="ghost" size="md" style={{ marginTop: 12 }} />
        </View>
      ) : (
        <View style={styles.ctaArea}>
          <Button label="Next →" onPress={() => goToSlide(current + 1)} variant="teal" size="md" style={styles.nextBtn} />
        </View>
      )}

      <Text style={styles.footer}>🔒 Public Domain · Blockchain-secured · Free forever</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: 60,
    paddingBottom: 40,
  },
  blob: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    top: -width * 0.3,
    left: -width * 0.1,
  },
  skipRow: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  skipText: {
    color: Colors.textSecondary,
    fontSize: Typography.size.sm,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.base,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.extrabold,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.base,
    lineHeight: 38,
  },
  body: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  ctaArea: {
    width: '100%',
  },
  ctaBtn: {
    width: '100%',
  },
  nextBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 28,
  },
  footer: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: Typography.size.xs,
    marginTop: Spacing.base,
  },
});
