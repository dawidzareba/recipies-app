import type { Recipe, RecipesResponse, ApiError } from './types';

const BASE_URL = 'https://dummyjson.com';

export const fetchRecipes = async (params: {
  limit?: number;
  skip?: number;
  search?: string;
}): Promise<RecipesResponse> => {
  try {
    const { limit = 10, skip = 0, search } = params;
    
    let url: string;
    if (search) {
      url = `${BASE_URL}/recipes/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    } else {
      url = `${BASE_URL}/recipes?limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json() as RecipesResponse;
    
    if (!data.recipes || !Array.isArray(data.recipes)) {
      throw new Error('Invalid response format');
    }

    return data;
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
    };
    throw apiError;
  }
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const recipe = await response.json() as Recipe;
    
    if (!recipe.id || !recipe.name || !recipe.image) {
      throw new Error('Invalid recipe data');
    }

    return recipe;
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
    };
    throw apiError;
  }
};