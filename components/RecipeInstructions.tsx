import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SPACING } from '@/constants/Spacing';

interface RecipeInstructionsProps {
  instructions: string[];
}

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({
  instructions,
}) => {
  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>Instructions</ThemedText>
      {instructions.map((instruction, index) => (
        <View key={index} style={styles.instructionItem}>
          <View style={styles.stepNumber}>
            <ThemedText style={styles.stepText}>{index + 1}</ThemedText>
          </View>
          <ThemedText style={styles.instructionText}>{instruction}</ThemedText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  stepText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionText: {
    flex: 1,
    lineHeight: 22,
  },
});