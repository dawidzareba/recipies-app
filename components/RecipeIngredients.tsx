import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SPACING } from '@/constants/Spacing';

interface RecipeIngredientsProps {
  ingredients: string[];
}

export const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => {
  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>Ingredients</ThemedText>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.listItem}>
          <ThemedText style={styles.bullet}>•</ThemedText>
          <ThemedText style={styles.listText}>{ingredient}</ThemedText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  bullet: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  listText: {
    flex: 1,
    lineHeight: 20,
  },
});