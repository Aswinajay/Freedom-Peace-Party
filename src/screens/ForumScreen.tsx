import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GlassCard, Badge, Button } from '../components/UI';
import { useStore } from '../store/useStore';

type Region = 'LOCAL' | 'NATIONAL' | 'GLOBAL';

interface Post {
  id: string;
  author: string;
  region: Region;
  content: string;
  upvotes: number;
  comments: number;
  timestamp: string;
  isAIModerated?: boolean;
}

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Member #4928',
    region: 'LOCAL',
    content: 'The new city council zoning proposal contradicts the Freedom & Peace Party manifesto on open housing. We need to organize a petition before the town hall next Tuesday.',
    upvotes: 245,
    comments: 42,
    timestamp: '2h ago',
  },
  {
    id: 'p2',
    author: 'Member #1103',
    region: 'NATIONAL',
    content: 'Has anyone reviewed the technical specifications for the upcoming national infrastructure bill? The budget allocation seems heavily skewed towards legacy contractors.',
    upvotes: 1832,
    comments: 356,
    timestamp: '5h ago',
  },
  {
    id: 'p3',
    author: 'Member #8812',
    region: 'GLOBAL',
    content: 'Proposing an amendment to the core manifesto regarding AI alignment. As systems become more autonomous, our ZK-proof verification needs quantum resistance.',
    upvotes: 5204,
    comments: 1120,
    timestamp: '1d ago',
    isAIModerated: true,
  },
];

export const ForumScreen: React.FC<any> = ({ navigation }) => {
  const [activeRegion, setActiveRegion] = useState<Region>('LOCAL');
  const [newPost, setNewPost] = useState('');
  const { member } = useStore();

  const filteredPosts = MOCK_POSTS.filter((p) => p.region === activeRegion);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Community Forum</Text>
        <Text style={styles.subtitle}>Open debate, secured by cryptographic identity.</Text>
      </View>

      {/* Multi-Regional Selector */}
      <View style={styles.regionSelector}>
        {(['LOCAL', 'NATIONAL', 'GLOBAL'] as Region[]).map((region) => (
          <TouchableOpacity
            key={region}
            style={[
              styles.regionTab,
              activeRegion === region && styles.regionTabActive,
            ]}
            onPress={() => setActiveRegion(region)}
          >
            <Text
              style={[
                styles.regionTabText,
                activeRegion === region && styles.regionTabTextActive,
              ]}
            >
              {region === 'LOCAL' ? `📍 ${member?.chapter || 'Local'}` : region === 'NATIONAL' ? '🇺🇸 National' : '🌍 Global'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* Create Post Action */}
        <GlassCard style={styles.createBox}>
          <Text style={styles.createBoxTitle}>Start a Discussion ({activeRegion})</Text>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind? Keep it respectful."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
            value={newPost}
            onChangeText={setNewPost}
          />
          <View style={styles.createBoxFooter}>
            <Text style={styles.aiNote}>🤖 AI pre-moderation active</Text>
            <Button 
              label="Post" 
              onPress={() => setNewPost('')} 
              variant="gold" 
              size="sm" 
              disabled={!newPost.trim()}
            />
          </View>
        </GlassCard>

        {/* Posts Feed */}
        {filteredPosts.map((post) => (
          <GlassCard key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{post.author[0]}</Text>
                </View>
                <View>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTime}>{post.timestamp}</Text>
                </View>
              </View>
              {post.isAIModerated && (
                <Badge label="AI Verified Fact" color={Colors.teal + '22'} textColor={Colors.teal} />
              )}
            </View>
            
            <Text style={styles.postContent}>{post.content}</Text>
            
            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>👍</Text>
                <Text style={styles.actionText}>{post.upvotes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>📤</Text>
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        ))}

        {filteredPosts.length === 0 && (
          <Text style={styles.emptyState}>No discussions in this region yet. Be the first!</Text>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.md, backgroundColor: Colors.surface },
  backBtn: { marginBottom: Spacing.md },
  backText: { color: Colors.textSecondary, fontSize: Typography.size.sm },
  title: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.extrabold, color: Colors.gold, marginBottom: 4 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  regionSelector: { 
    flexDirection: 'row', 
    backgroundColor: Colors.surface, 
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  regionTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.full,
  },
  regionTabActive: {
    backgroundColor: Colors.gold + '22',
  },
  regionTabText: {
    color: Colors.textSecondary,
    fontWeight: Typography.weight.semibold,
    fontSize: Typography.size.sm,
  },
  regionTabTextActive: {
    color: Colors.gold,
  },
  scroll: { padding: Spacing.base, paddingBottom: 80 },
  createBox: {
    marginBottom: Spacing.xl,
    padding: Spacing.md,
  },
  createBoxTitle: {
    color: Colors.textPrimary,
    fontWeight: Typography.weight.bold,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.size.base,
    textAlignVertical: 'top',
    marginBottom: Spacing.sm,
  },
  createBoxFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiNote: {
    color: Colors.textMuted,
    fontSize: Typography.size.xs,
  },
  postCard: {
    marginBottom: Spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.gold,
    fontWeight: Typography.weight.bold,
    fontSize: Typography.size.sm,
  },
  authorName: {
    color: Colors.textPrimary,
    fontWeight: Typography.weight.bold,
    fontSize: Typography.size.sm,
  },
  postTime: {
    color: Colors.textMuted,
    fontSize: Typography.size.xs,
  },
  postContent: {
    color: Colors.textSecondary,
    fontSize: Typography.size.base,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  postFooter: {
    flexDirection: 'row',
    gap: Spacing.xl,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border + '55',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    color: Colors.textSecondary,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
  },
  emptyState: {
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing['2xl'],
    fontStyle: 'italic',
  }
});
