import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SPACING } from '@/constants/Spacing';

interface RecipeListEmptyProps {
  loading: boolean;
  searchQuery: string;
}

export const RecipeListEmpty: React.FC<RecipeListEmptyProps> = ({
  loading,
  searchQuery,
}) => {
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
};

const styles = StyleSheet.create({
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
});