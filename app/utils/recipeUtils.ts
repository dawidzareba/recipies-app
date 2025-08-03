import { DIFFICULTY_COLORS, RecipeDifficulty } from '@/constants/Recipe';
import type { Recipe } from './types';

export const getDifficultyColor = (difficulty: Recipe['difficulty']): string => {
  return DIFFICULTY_COLORS[difficulty as RecipeDifficulty];
};