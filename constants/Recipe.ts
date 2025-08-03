export enum RecipeDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export const DIFFICULTY_COLORS = {
  [RecipeDifficulty.EASY]: '#4CAF50',
  [RecipeDifficulty.MEDIUM]: '#FF9800',
  [RecipeDifficulty.HARD]: '#F44336',
} as const;