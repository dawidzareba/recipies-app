import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useRecipes } from '@/hooks/useRecipes';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import { SearchBar } from '@/components/SearchBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorComponent } from '@/components/ErrorComponent';
import { RecipesList } from '@/components/RecipesList';
import { ThemedView } from '@/components/ThemedView';
import type { Recipe } from '@/app/utils/types';

export const RecipesListScreen: React.FC = () => {
  const router = useRouter();
  const { 
    recipes, 
    loading, 
    error, 
    hasMore, 
    refreshing, 
    loadMore, 
    refresh, 
    search, 
    clearSearch 
  } = useRecipes();
  
  const { searchQuery, handleSearch, handleClearSearch } = useRecipeSearch({
    onSearch: search,
    onClearSearch: clearSearch,
  });

  const handleRecipePress = useCallback((recipe: Recipe) => {
    router.push(`/recipe/${recipe.id}`);
  }, [router]);

  if (error && recipes.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
        />
        <ErrorComponent 
          message={error} 
          onRetry={refresh}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
        />
        
        {loading && recipes.length === 0 ? (
          <LoadingSpinner message="Loading recipes..." />
        ) : (
          <RecipesList
            recipes={recipes}
            loading={loading}
            refreshing={refreshing}
            hasMore={hasMore}
            searchQuery={searchQuery}
            onRecipePress={handleRecipePress}
            onLoadMore={loadMore}
            onRefresh={refresh}
          />
        )}
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
});