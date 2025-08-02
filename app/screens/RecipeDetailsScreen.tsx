import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Image, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fetchRecipeById } from '@/app/utils/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorComponent } from '@/components/ErrorComponent';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import type { Recipe, ApiError } from '@/app/utils/types';

interface RecipeDetailsScreenProps {
  recipeId: number;
}

const { width: screenWidth } = Dimensions.get('window');

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

export const RecipeDetailsScreen: React.FC<RecipeDetailsScreenProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

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

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          
          <View style={styles.content}>
            <ThemedText style={styles.title}>{recipe.name}</ThemedText>
            
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
                  {recipe.servings} servings
                </ThemedText>
              </View>
              
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(recipe.difficulty) }]}>
                <ThemedText style={styles.difficultyText}>
                  {recipe.difficulty}
                </ThemedText>
              </View>
            </View>

            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <ThemedText style={[styles.rating, { color: iconColor }]}>
                {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
              </ThemedText>
            </View>

            <View style={styles.caloriesContainer}>
              <Ionicons name="fitness-outline" size={20} color={iconColor} />
              <ThemedText style={[styles.calories, { color: iconColor }]}>
                {recipe.caloriesPerServing} calories per serving
              </ThemedText>
            </View>

            {recipe.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                <ThemedText style={styles.sectionTitle}>Tags</ThemedText>
                <View style={styles.tags}>
                  {recipe.tags.map((tag, index) => (
                    <View key={index} style={[styles.tag, { backgroundColor }]}>
                      <ThemedText style={[styles.tagText, { color: iconColor }]}>
                        {tag}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Ingredients</ThemedText>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.listItem}>
                  <ThemedText style={styles.bullet}>•</ThemedText>
                  <ThemedText style={styles.listText}>{ingredient}</ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Instructions</ThemedText>
              {recipe.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.stepNumber}>
                    <ThemedText style={styles.stepText}>{index + 1}</ThemedText>
                  </View>
                  <ThemedText style={styles.instructionText}>{instruction}</ThemedText>
                </View>
              ))}
            </View>
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
  image: {
    width: screenWidth,
    height: 250,
  },
  content: {
    padding: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  rating: {
    marginLeft: SPACING.xs,
    fontSize: 16,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  calories: {
    marginLeft: SPACING.xs,
    fontSize: 14,
  },
  tagsContainer: {
    marginBottom: SPACING.lg,
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
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  stepText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionText: {
    flex: 1,
    lineHeight: 22,
  },
});