import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

interface RecipeImageProps {
  uri: string;
  alt?: string;
}

const { width: screenWidth } = Dimensions.get('window');

export const RecipeImage: React.FC<RecipeImageProps> = ({ uri, alt }) => {
  return (
    <Image 
      source={{ uri }} 
      style={styles.image}
      accessibilityLabel={alt}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: 250,
  },
});