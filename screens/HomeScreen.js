import React from "react";
import { View, Image } from "react-native";
import { Text, Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 720,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        source={require("../assets/background.png")}
      />

      {/* Text */}
      <View
        style={{
          marginTop: "15%",
          gap: 2,
          zIndex: 2,
        }}
      >
        <Text
          variant="displayLarge"
          style={{ color: "white", fontWeight: "bold", marginLeft: "5%" }}
        >
          Welcome
        </Text>
        <Text
          variant="bodyLarge"
          style={{ color: "white", marginRight: "5%", marginLeft: "5%" }}
        >
          Got a fridge full of myster ingredients? let us do the thinking for
          you! Snap a photo of what you've got, and we'll whip up tasty meal
          ideas in seconds. Say goodbye to "What's for dinner?" and hello to
          easy, delicious recipes tailored to what's already in your fridge!
        </Text>
      </View>
      <Image
        style={{ width: "100%", height: "50%", bottom: 0, zIndex: 2 }}
        source={require("../assets/chef.png")}
      />

      {/* Buttons */}
      <View
        style={{
          marginTop: 20,
          zIndex: 2,
          paddingHorizontal: "10%",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ height: 50, justifyContent: "center" }}
          buttonColor="#A9DEF9"
          textColor="#05299E"
          icon="camera"
          mode="elevated"
          onPress={() => navigation.navigate("Camera")}
        >
          Get Started
        </Button>

      </View>
    </View>
  );
}
