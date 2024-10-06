import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <Image style={{ width: "100%", height: 650, position: "absolute"}} source={require('../assets/background.png')}/>

      {/* Text */}
      <View
        style={{
          marginTop: "12%",
          gap: 2
        }}>
          <Text variant="displayMedium" style={{ color: "white", fontWeight: "bold", marginLeft: "3%"}}>Welcome</Text>
          <Text variant="bodyLarge" style={{ color: "white", marginRight: "5%", marginLeft: "4%"}}>
            Got a fridge full of myster ingredients? let us do the thinking for you! Snap a photo of what you've got, and we'll whip up 
            tasty meal ideas in seconds. Say goodbye to "What's for dinner?" and hello to easy, delicious recipes tailored to what's 
            already in your fridge!
          </Text>
      </View>
      {/* Buttons */}
      <View 
        style={{ 
          gap: 10 , 
        }}>
        <Button icon="camera" mode="elevated" onPress={() => navigation.navigate('Camera')}>Camera</Button>
        <Button mode="elevated" onPress={() => navigation.navigate('Ingredients')}>Ingredients</Button>
        <Button mode="elevated" onPress={() => navigation.navigate('Recipes')}>Recipes</Button>
      </View>
    </View>
  );
}
