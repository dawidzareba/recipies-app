import { fetchRecipes, fetchRecipeById } from '@/app/utils/api';

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchRecipes', () => {
    test('fetches recipes successfully', async () => {
      const mockResponse = {
        recipes: [
          {
            id: 1,
            name: 'Test Recipe',
            ingredients: ['ingredient 1'],
            instructions: ['step 1'],
            prepTimeMinutes: 15,
            cookTimeMinutes: 30,
            servings: 4,
            difficulty: 'Easy',
            cuisine: 'Italian',
            caloriesPerServing: 300,
            tags: ['tag1'],
            userId: 1,
            image: 'https://example.com/image.jpg',
            rating: 4.5,
            reviewCount: 10,
            mealType: ['dinner'],
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await fetchRecipes({ limit: 10, skip: 0 });

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/recipes?limit=10&skip=0'
      );
    });

    test('fetches recipes with search query', async () => {
      const mockResponse = {
        recipes: [],
        total: 0,
        skip: 0,
        limit: 10,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      await fetchRecipes({ limit: 10, skip: 0, search: 'pasta' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/recipes/search?q=pasta&limit=10&skip=0'
      );
    });

    test('handles fetch error', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(fetchRecipes({ limit: 10, skip: 0 })).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });

    test('handles invalid response format', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ invalid: 'response' }),
      } as Response);

      await expect(fetchRecipes({ limit: 10, skip: 0 })).rejects.toThrow(
        'Invalid response format'
      );
    });
  });

  describe('fetchRecipeById', () => {
    test('fetches recipe by id successfully', async () => {
      const mockRecipe = {
        id: 1,
        name: 'Test Recipe',
        ingredients: ['ingredient 1'],
        instructions: ['step 1'],
        prepTimeMinutes: 15,
        cookTimeMinutes: 30,
        servings: 4,
        difficulty: 'Easy',
        cuisine: 'Italian',
        caloriesPerServing: 300,
        tags: ['tag1'],
        userId: 1,
        image: 'https://example.com/image.jpg',
        rating: 4.5,
        reviewCount: 10,
        mealType: ['dinner'],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRecipe),
      } as Response);

      const result = await fetchRecipeById(1);

      expect(result).toEqual(mockRecipe);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/recipes/1'
      );
    });

    test('handles invalid recipe data', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ invalid: 'data' }),
      } as Response);

      await expect(fetchRecipeById(1)).rejects.toThrow(
        'Invalid recipe data'
      );
    });
  });
});