import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';

export default function Ingredients({ navigation }) {
  // Hard-coded ingredients list
  const initialIngredients = ['Tomatoes', 'Onions', 'Garlic', 'Chicken', 'Rice'];
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [newIngredient, setNewIngredient] = useState('');

  const addIngredient = () => {
    if (newIngredient) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };

  const deleteIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const renderItem = ({ item, index }) => (
    <List.Item
      title={item}
      right={() => (
        <View style={styles.listButtons}>
          <Button onPress={() => deleteIngredient(index)}>Delete</Button>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>

      <TextInput
        label="Add Ingredient"
        value={newIngredient}
        onChangeText={setNewIngredient}
        style={styles.input}
      />
      <Button mode="contained" onPress={addIngredient} style={styles.addButton}>
        Add Ingredient
      </Button>

      <FlatList
        data={ingredients}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "15%"
  },
  input: {
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 16,
  },
  list: {
    marginTop: 16,
  },
  listButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
