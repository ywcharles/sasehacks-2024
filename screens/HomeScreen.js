import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Ingredients"
        onPress={() => navigation.navigate('Ingredients')}
      />
      <Button
        title="Recipes"
        onPress={() => navigation.navigate('Recipes')}
      />
    </View>
  );
}
