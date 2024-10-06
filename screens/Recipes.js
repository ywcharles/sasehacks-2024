import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useRecipes from '../hooks/useRecipes';

const RecipeItem = ({ item }) => (
  <View style={styles.recipeItem}>
    <Text style={styles.recipeName}>{item.name}</Text>
    <Text style={styles.recipeDescription}>{item.description}</Text>
    <Text style={styles.sectionTitle}>Ingredients:</Text>
    <Text>{item.ingredients}</Text>
    <Text style={styles.sectionTitle}>Instructions:</Text>
    <Text>{item.instructions}</Text>
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
      <View style={styles.container}>
        <Text>Generating recipes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={recipes}
      renderItem={({ item }) => <RecipeItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={<Text>No recipes found</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  recipeItem: {
    marginBottom: 20,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDescription: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Recipes;