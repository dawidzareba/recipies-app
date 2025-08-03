import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getDifficultyColor } from '@/app/utils/recipeUtils';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';

interface RecipeStatsProps {
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
}

export const RecipeStats: React.FC<RecipeStatsProps> = ({
  prepTimeMinutes,
  cookTimeMinutes,
  servings,
  difficulty,
}) => {
  const iconColor = useThemeColor({}, 'icon');
  const totalTime = prepTimeMinutes + cookTimeMinutes;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Ionicons name="time-outline" size={20} color={iconColor} />
        <ThemedText style={[styles.statText, { color: iconColor }]}>
          {totalTime} min
        </ThemedText>
      </View>
      
      <View style={styles.statItem}>
        <Ionicons name="people-outline" size={20} color={iconColor} />
        <ThemedText style={[styles.statText, { color: iconColor }]}>
          {servings} servings
        </ThemedText>
      </View>
      
      <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(difficulty) }]}>
        <ThemedText style={styles.difficultyText}>
          {difficulty}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  statText: {
    marginLeft: SPACING.xs,
    fontSize: 14,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});