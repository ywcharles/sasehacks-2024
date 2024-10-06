import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useRecipes from '../hooks/useRecipes';

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

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeItem}>
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {recipes && recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No recipes found</Text>
      )}
    </View>
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
});

export default Recipes;