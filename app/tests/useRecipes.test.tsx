import { renderHook, act } from '@testing-library/react-native';
import { useRecipes } from '@/hooks/useRecipes';
import { fetchRecipes } from '@/app/utils/api';
import { RecipeDifficulty } from '@/constants/Recipe';

jest.mock('@/app/utils/api');
const mockFetchRecipes = fetchRecipes as jest.MockedFunction<typeof fetchRecipes>;

const mockRecipesResponse = {
  recipes: [
    {
      id: 1,
      name: 'Test Recipe 1',
      ingredients: ['ingredient 1'],
      instructions: ['step 1'],
      prepTimeMinutes: 15,
      cookTimeMinutes: 30,
      servings: 4,
      difficulty: RecipeDifficulty.EASY,
      cuisine: 'Italian',
      caloriesPerServing: 300,
      tags: ['tag1'],
      userId: 1,
      image: 'https://example.com/image1.jpg',
      rating: 4.5,
      reviewCount: 10,
      mealType: ['dinner'],
    },
    {
      id: 2,
      name: 'Test Recipe 2',
      ingredients: ['ingredient 2'],
      instructions: ['step 2'],
      prepTimeMinutes: 20,
      cookTimeMinutes: 25,
      servings: 2,
      difficulty: RecipeDifficulty.MEDIUM,
      cuisine: 'Chinese',
      caloriesPerServing: 250,
      tags: ['tag2'],
      userId: 2,
      image: 'https://example.com/image2.jpg',
      rating: 4.0,
      reviewCount: 5,
      mealType: ['lunch'],
    },
  ],
  total: 2,
  skip: 0,
  limit: 10,
};

describe('useRecipes hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with correct default state', () => {
    mockFetchRecipes.mockResolvedValue(mockRecipesResponse);
    const { result } = renderHook(() => useRecipes());

    expect(result.current.recipes).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.refreshing).toBe(false);
  });

  test('loads recipes on mount', async () => {
    mockFetchRecipes.mockResolvedValue(mockRecipesResponse);
    const { result } = renderHook(() => useRecipes());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockFetchRecipes).toHaveBeenCalledWith({
      limit: 10,
      skip: 0,
      search: undefined,
    });
  });

  test('handles search correctly', async () => {
    mockFetchRecipes.mockResolvedValue({
      ...mockRecipesResponse,
      recipes: [mockRecipesResponse.recipes[0]!],
    });

    const { result } = renderHook(() => useRecipes());

    await act(async () => {
      result.current.search('pasta');
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockFetchRecipes).toHaveBeenCalledWith({
      limit: 10,
      skip: 0,
      search: 'pasta',
    });
  });

  test('handles errors correctly', async () => {
    const errorMessage = 'Network error';
    mockFetchRecipes.mockRejectedValue({ message: errorMessage });

    const { result } = renderHook(() => useRecipes());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  test('clear search resets query', async () => {
    mockFetchRecipes.mockResolvedValue(mockRecipesResponse);
    const { result } = renderHook(() => useRecipes());

    await act(async () => {
      result.current.clearSearch();
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockFetchRecipes).toHaveBeenCalledWith({
      limit: 10,
      skip: 0,
      search: undefined,
    });
  });
});