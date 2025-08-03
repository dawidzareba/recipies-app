import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SPACING } from '@/constants/Spacing';

interface RecipeRatingProps {
  rating: number;
  reviewCount: number;
}

export const RecipeRating: React.FC<RecipeRatingProps> = ({
  rating,
  reviewCount,
}) => {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <View style={styles.ratingContainer}>
      <Ionicons name="star" size={20} color="#FFD700" />
      <ThemedText style={[styles.rating, { color: iconColor }]}>
        {rating.toFixed(1)} ({reviewCount} reviews)
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  rating: {
    marginLeft: SPACING.xs,
    fontSize: 16,
  },
});