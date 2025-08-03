import React, { useCallback } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  RefreshControl, 
  ListRenderItem 
} from 'react-native';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeListFooter } from '@/components/RecipeListFooter';
import { RecipeListEmpty } from '@/components/RecipeListEmpty';
import type { Recipe } from '@/app/utils/types';

interface RecipesListProps {
  recipes: Recipe[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  searchQuery: string;
  onRecipePress: (recipe: Recipe) => void;
  onLoadMore: () => void;
  onRefresh: () => void;
}

export const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  loading,
  refreshing,
  hasMore,
  searchQuery,
  onRecipePress,
  onLoadMore,
  onRefresh,
}) => {
  const renderRecipe: ListRenderItem<Recipe> = useCallback(({ item }) => (
    <RecipeCard 
      recipe={item} 
      onPress={() => onRecipePress(item)} 
    />
  ), [onRecipePress]);

  return (
    <FlatList
      data={recipes}
      renderItem={renderRecipe}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ListFooterComponent={
        <RecipeListFooter 
          hasMore={hasMore} 
          loading={loading} 
          recipesCount={recipes.length} 
        />
      }
      ListEmptyComponent={
        <RecipeListEmpty 
          loading={loading} 
          searchQuery={searchQuery} 
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={recipes.length === 0 ? styles.emptyList : undefined}
    />
  );
};

const styles = StyleSheet.create({
  emptyList: {
    flexGrow: 1,
  },
});