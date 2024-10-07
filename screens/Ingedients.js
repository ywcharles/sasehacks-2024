import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, List, Dialog, Portal, TextInput, Provider } from 'react-native-paper';

export default function Ingredients({ navigation }) {
  // Hard-coded ingredients list
  const initialIngredients = ['Tomatoes', 'Onions', 'Garlic', 'Chicken', 'Rice'];
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [newIngredient, setNewIngredient] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  // Add or modify ingredient based on editing state
  const handleSave = () => {
    if (isEditing) {
      const updatedIngredients = ingredients.map((ingredient, i) =>
        i === currentIndex ? newIngredient : ingredient
      );
      setIngredients(updatedIngredients);
    } else {
      setIngredients([...ingredients, newIngredient]);
    }
    setNewIngredient('');
    hideDialog();
  };

  const deleteIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const modifyIngredient = (index) => {
    setCurrentIndex(index);
    setNewIngredient(ingredients[index]);
    setIsEditing(true);
    showDialog();
  };

  const addIngredient = () => {
    setIsEditing(false);
    setNewIngredient('');
    showDialog();
  };

  const renderItem = ({ item, index }) => (
    <List.Item
      title={item}
      right={() => (
        <View style={styles.listButtons}>
          <Button textColor="#05299E" onPress={() => modifyIngredient(index)}>Modify</Button>
          <Button textColor="#05299E" onPress={() => deleteIngredient(index)}>Delete</Button>
        </View>
      )}
    />
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Ingredients</Text>

        <FlatList
          data={ingredients}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
        
        <Button buttonColor="#A9DEF9" textColor="#05299E" mode="contained" onPress={addIngredient} style={styles.addButton}>
          Add Ingredient
        </Button>

        {/* Dialog for adding or modifying ingredients */}
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog} style={{ backgroundColor: "#eef9fe"}}>
            <Dialog.Title>{isEditing ? 'Modify Ingredient' : 'Add Ingredient'}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Ingredient Name"
                value={newIngredient}
                onChangeText={setNewIngredient}
                mode="outlined"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleSave}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '15%',
  },
  addButton: {
    height: 60,
    justifyContent: 'center',
    marginTop: "5%",
    marginBottom: "10%"
  },
  list: {
    marginTop: 16,
  },
  listButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});