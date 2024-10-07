import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import useRecipes from '../hooks/useRecipes';

const RecipeItem = ({ item }) => (
  <View style={styles.recipeItem}>
    <Text style={styles.recipeName}>{item.name}</Text>
    <Text style={styles.recipeDescription}>{item.description}</Text>
    
    <Text style={styles.sectionTitle}>Ingredients:</Text>
    {item.ingredients.map((ingredient, index) => (
      <Text key={index} style={styles.ingredientText}>- {ingredient}</Text>
    ))}
    
    <Text style={styles.sectionTitle}>Instructions:</Text>
    {item.instructions.map((instruction, index) => (
      <Text key={index} style={styles.instructionText}>{index + 1}. {instruction}</Text>
    ))}
  </View>
);

const Recipes = ({ route }) => {
  const { ingredients } = route.params;
  const { recipes, loading, error, generateRecipes } = useRecipes();

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      generateRecipes(ingredients);
    }
  }, [ingredients, generateRecipes]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Generating recipes...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent} // Added content container style
        ListEmptyComponent={<Text style={styles.emptyText}>No recipes found. Please try different ingredients.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background color
  },
  flatListContent: {
    padding: 20,
    paddingBottom: 40, // Adjust as needed for more padding at the bottom
  },
  recipeItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ffffff', // White background for each recipe
    shadowColor: '#000', // Shadow effect for elevation
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDescription: {
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#6c757d', // Dark gray for description
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  ingredientText: {
    color: '#495057', // Slightly darker text for ingredients
    marginLeft: 10, // Indent for better readability
  },
  instructionText: {
    color: '#495057', // Slightly darker text for instructions
    marginLeft: 10, // Indent for better readability
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff', // Blue color for loading text
    textAlign: 'center', // Centered text
    marginTop: 20, // Margin for spacing
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red', // Red color for error text
    textAlign: 'center', // Centered text
    marginTop: 20, // Margin for spacing
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center', // Centered text for empty state
    color: '#6c757d', // Dark gray for empty state
  },
});

export default Recipes;
