import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ThemedText } from '@/components/ThemedText';
import { SPACING } from '@/constants/Spacing';

interface RecipeListFooterProps {
  hasMore: boolean;
  loading: boolean;
  recipesCount: number;
}

export const RecipeListFooter: React.FC<RecipeListFooterProps> = ({
  hasMore,
  loading,
  recipesCount,
}) => {
  if (!hasMore) {
    return (
      <View style={styles.endMessage}>
        <ThemedText style={styles.endText}>
          No more recipes to load
        </ThemedText>
      </View>
    );
  }
  
  if (loading && recipesCount > 0) {
    return (
      <View style={styles.footerLoading}>
        <LoadingSpinner size="small" message="" />
      </View>
    );
  }
  
  return null;
};

const styles = StyleSheet.create({
  footerLoading: {
    paddingVertical: SPACING.md,
  },
  endMessage: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  endText: {
    opacity: 0.6,
  },
});