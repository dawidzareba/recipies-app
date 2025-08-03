import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView
} from 'react-native';
import { fetchRecipeById } from '@/app/utils/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorComponent } from '@/components/ErrorComponent';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeStats } from '@/components/RecipeStats';
import { RecipeRating } from '@/components/RecipeRating';
import { RecipeCalories } from '@/components/RecipeCalories';
import { RecipeTags } from '@/components/RecipeTags';
import { RecipeIngredients } from '@/components/RecipeIngredients';
import { RecipeInstructions } from '@/components/RecipeInstructions';
import { SPACING } from '@/constants/Spacing';
import type { Recipe, ApiError } from '@/app/utils/types';

interface RecipeDetailsScreenProps {
  recipeId: number;
}

export const RecipeDetailsScreen: React.FC<RecipeDetailsScreenProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      const recipeData = await fetchRecipeById(recipeId);
      setRecipe(recipeData);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <LoadingSpinner message="Loading recipe..." />
      </ThemedView>
    );
  }

  if (error || !recipe) {
    return (
      <ThemedView style={styles.container}>
        <ErrorComponent 
          message={error || 'Recipe not found'} 
          onRetry={loadRecipe}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RecipeImage uri={recipe.image} alt={recipe.name} />
          
          <View style={styles.content}>
            <ThemedText style={styles.title}>{recipe.name}</ThemedText>
            
            <RecipeStats
              prepTimeMinutes={recipe.prepTimeMinutes}
              cookTimeMinutes={recipe.cookTimeMinutes}
              servings={recipe.servings}
              difficulty={recipe.difficulty}
            />

            <RecipeRating
              rating={recipe.rating}
              reviewCount={recipe.reviewCount}
            />

            <RecipeCalories caloriesPerServing={recipe.caloriesPerServing} />

            <RecipeTags tags={recipe.tags} />

            <RecipeIngredients ingredients={recipe.ingredients} />

            <RecipeInstructions instructions={recipe.instructions} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
});