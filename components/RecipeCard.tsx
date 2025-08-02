import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import type { Recipe } from '@/app/utils/types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

const getDifficultyColor = (difficulty: Recipe['difficulty']): string => {
  switch (difficulty) {
    case 'Easy':
      return '#4CAF50';
    case 'Medium':
      return '#FF9800';
    case 'Hard':
      return '#F44336';
    default:
      return '#757575';
  }
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: recipe.image }} style={styles.image} />
      
      <View style={styles.content}>
        <ThemedText style={[styles.name, { color: textColor }]} numberOfLines={2}>
          {recipe.name}
        </ThemedText>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color={iconColor} />
            <ThemedText style={[styles.infoText, { color: iconColor }]}>
              {totalTime} min
            </ThemedText>
          </View>
          
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(recipe.difficulty) }]}>
            <ThemedText style={styles.difficultyText}>
              {recipe.difficulty}
            </ThemedText>
          </View>
        </View>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <ThemedText style={[styles.rating, { color: iconColor }]}>
            {recipe.rating.toFixed(1)} ({recipe.reviewCount})
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginLeft: SPACING.xs,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    marginLeft: SPACING.xs,
  },
});