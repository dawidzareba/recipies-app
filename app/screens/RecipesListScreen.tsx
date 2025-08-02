import React, { useState, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  RefreshControl, 
  ListRenderItem 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useRecipes } from '@/hooks/useRecipes';
import { RecipeCard } from '@/components/RecipeCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorComponent } from '@/components/ErrorComponent';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SPACING } from '@/constants/Spacing';
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
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    search(query);
  }, [search]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    clearSearch();
  }, [clearSearch]);

  const handleRecipePress = useCallback((recipe: Recipe) => {
    router.push(`/recipe/${recipe.id}`);
  }, [router]);

  const renderRecipe: ListRenderItem<Recipe> = useCallback(({ item }) => (
    <RecipeCard 
      recipe={item} 
      onPress={() => handleRecipePress(item)} 
    />
  ), [handleRecipePress]);

  const renderListFooter = useCallback(() => {
    if (!hasMore) {
      return (
        <View style={styles.endMessage}>
          <ThemedText style={styles.endText}>
            No more recipes to load
          </ThemedText>
        </View>
      );
    }
    
    if (loading && recipes.length > 0) {
      return (
        <View style={styles.footerLoading}>
          <LoadingSpinner size="small" message="" />
        </View>
      );
    }
    
    return null;
  }, [hasMore, loading, recipes.length]);

  const renderListEmpty = useCallback(() => {
    if (loading) {
      return null;
    }
    
    return (
      <View style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>
          {searchQuery ? 'No recipes found' : 'No recipes available'}
        </ThemedText>
      </View>
    );
  }, [loading, searchQuery]);

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
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
              />
            }
            ListFooterComponent={renderListFooter}
            ListEmptyComponent={renderListEmpty}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={recipes.length === 0 ? styles.emptyList : undefined}
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
  footerLoading: {
    paddingVertical: SPACING.md,
  },
  endMessage: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  endText: {
    opacity: 0.6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
  emptyList: {
    flexGrow: 1,
  },
});