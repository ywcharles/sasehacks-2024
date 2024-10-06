import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import Camera from "./screens/Camera";
import Recipes from "./screens/Recipes";
import Ingredients from "./screens/Ingedients";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Ingredients" component={Ingredients} />
        <Stack.Screen name="Recipes" component={Recipes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
