import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SPACING } from '@/constants/Spacing';

interface RecipeCaloriesProps {
  caloriesPerServing: number;
}

export const RecipeCalories: React.FC<RecipeCaloriesProps> = ({
  caloriesPerServing,
}) => {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <View style={styles.caloriesContainer}>
      <Ionicons name="fitness-outline" size={20} color={iconColor} />
      <ThemedText style={[styles.calories, { color: iconColor }]}>
        {caloriesPerServing} calories per serving
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  calories: {
    marginLeft: SPACING.xs,
    fontSize: 14,
  },
});