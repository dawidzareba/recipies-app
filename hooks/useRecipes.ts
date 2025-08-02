import { useState, useEffect, useCallback } from 'react';
import { fetchRecipes } from '@/app/utils/api';
import type { Recipe, ApiError } from '@/app/utils/types';

interface UseRecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  refreshing: boolean;
}

interface UseRecipesReturn extends UseRecipesState {
  loadMore: () => void;
  refresh: () => void;
  search: (query: string) => void;
  clearSearch: () => void;
}

const RECIPES_PER_PAGE = 10;

export const useRecipes = (): UseRecipesReturn => {
  const [state, setState] = useState<UseRecipesState>({
    recipes: [],
    loading: false,
    error: null,
    hasMore: true,
    refreshing: false,
  });
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentSkip, setCurrentSkip] = useState<number>(0);

  const loadRecipes = useCallback(async (skip: number, query: string, isRefresh: boolean = false) => {
    try {
      setState(prev => ({
        ...prev,
        loading: skip === 0 && !isRefresh,
        refreshing: isRefresh,
        error: null,
      }));

      const response = await fetchRecipes({
        limit: RECIPES_PER_PAGE,
        skip,
        search: query || undefined,
      });

      setState(prev => ({
        ...prev,
        recipes: skip === 0 ? response.recipes : [...prev.recipes, ...response.recipes],
        hasMore: response.recipes.length === RECIPES_PER_PAGE && (skip + RECIPES_PER_PAGE) < response.total,
        loading: false,
        refreshing: false,
      }));

      setCurrentSkip(skip + RECIPES_PER_PAGE);
    } catch (error) {
      const apiError = error as ApiError;
      setState(prev => ({
        ...prev,
        error: apiError.message,
        loading: false,
        refreshing: false,
      }));
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore && !state.refreshing) {
      loadRecipes(currentSkip, searchQuery);
    }
  }, [state.loading, state.hasMore, state.refreshing, currentSkip, searchQuery, loadRecipes]);

  const refresh = useCallback(() => {
    setCurrentSkip(0);
    loadRecipes(0, searchQuery, true);
  }, [searchQuery, loadRecipes]);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentSkip(0);
    loadRecipes(0, query);
  }, [loadRecipes]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setCurrentSkip(0);
    loadRecipes(0, '');
  }, [loadRecipes]);

  useEffect(() => {
    loadRecipes(0, '');
  }, [loadRecipes]);

  return {
    ...state,
    loadMore,
    refresh,
    search,
    clearSearch,
  };
};