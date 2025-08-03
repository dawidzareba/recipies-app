import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';

interface RecipeTagsProps {
  tags: string[];
}

export const RecipeTags: React.FC<RecipeTagsProps> = ({ tags }) => {
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  if (tags.length === 0) {
    return null;
  }

  return (
    <View style={styles.tagsContainer}>
      <ThemedText style={styles.sectionTitle}>Tags</ThemedText>
      <View style={styles.tags}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor }]}>
            <ThemedText style={[styles.tagText, { color: iconColor }]}>
              {tag}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.xs,
  },
  tag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tagText: {
    fontSize: 12,
  },
});