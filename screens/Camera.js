import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera/legacy";
import useFoodvisor from "../hooks/useFoodadvisor";

export default function CameraComponent({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);
  const cameraRef = useRef(null);
  const { ingredients, analyzeImageWithFoodvisor, loading, error } =
    useFoodvisor();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo); // You can handle the photo here, like saving or navigating
      await analyzeImageWithFoodvisor(photo.uri);
      console.log(ingredients)
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        autoFocus={autoFocus} // Enable autoFocus
        type={Camera.Constants.Type.back} // Optional: Set the camera type (front/back)
      >
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});
