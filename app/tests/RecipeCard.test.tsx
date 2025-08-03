import { render, fireEvent } from '@testing-library/react-native';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeDifficulty } from '@/constants/Recipe';
import type { Recipe } from '@/app/utils/types';

const mockRecipe: Recipe = {
  id: 1,
  name: 'Test Recipe',
  ingredients: ['ingredient 1', 'ingredient 2'],
  instructions: ['step 1', 'step 2'],
  prepTimeMinutes: 15,
  cookTimeMinutes: 30,
  servings: 4,
  difficulty: RecipeDifficulty.EASY,
  cuisine: 'Italian',
  caloriesPerServing: 300,
  tags: ['tag1', 'tag2'],
  userId: 1,
  image: 'https://example.com/image.jpg',
  rating: 4.5,
  reviewCount: 10,
  mealType: ['dinner'],
};

describe('RecipeCard', () => {
  test('renders recipe information correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard recipe={mockRecipe} onPress={mockOnPress} />
    );

    expect(getByText('Test Recipe')).toBeTruthy();
    expect(getByText('45 min')).toBeTruthy();
    expect(getByText('Easy')).toBeTruthy();
    expect(getByText('4.5 (10)')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard recipe={mockRecipe} onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Recipe'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('displays correct difficulty color for Medium difficulty', () => {
    const mediumRecipe = { ...mockRecipe, difficulty: RecipeDifficulty.MEDIUM };
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard recipe={mediumRecipe} onPress={mockOnPress} />
    );

    expect(getByText('Medium')).toBeTruthy();
  });

  test('displays correct difficulty color for Hard difficulty', () => {
    const hardRecipe = { ...mockRecipe, difficulty: RecipeDifficulty.HARD };
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard recipe={hardRecipe} onPress={mockOnPress} />
    );

    expect(getByText('Hard')).toBeTruthy();
  });
});