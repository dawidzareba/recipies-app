import { useLocalSearchParams } from 'expo-router';
import { RecipeDetailsScreen } from '@/app/screens/RecipeDetailsScreen';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipeId = parseInt(id, 10);
  
  return <RecipeDetailsScreen recipeId={recipeId} />;
}