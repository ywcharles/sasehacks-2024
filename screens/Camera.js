import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera/legacy";
import useFoodvisor from "../hooks/useFoodadvisor";
import { IconButton } from 'react-native-paper';

export default function CameraComponent({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);
  const [focusPoint, setFocusPoint] = useState(null); // To store focus point
  const [loading, setLoading] = useState(false); // New loading state
  const cameraRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const { ingredients, analyzeImageWithFoodvisor, error } = useFoodvisor();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true); // Start loading
      const photo = await cameraRef.current.takePictureAsync();
      await analyzeImageWithFoodvisor(photo.uri);
      console.log(photo); // Handle the photo (e.g., save it, navigate, etc.)
      setLoading(false); // End loading
    }
  };

  const handleFocus = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const x = locationX / screenWidth;
    const y = locationY / screenHeight;

    setFocusPoint({ x, y });

    // Optional: Set autoFocus off to emulate manual focus behavior after user tap
    setAutoFocus(Camera.Constants.AutoFocus.off);
    
    // Optionally, you can log or track the focus point
    console.log(`Focus Point: X: ${x}, Y: ${y}`);
  };

  // Navigate to Ingredients screen when ingredients update
  useEffect(() => {
    if (ingredients.length > 0) {
      navigation.navigate("Ingredients", {
        initialIngredients: ingredients,
      });
    }
  }, [ingredients, navigation]);

  // Use useEffect to log ingredients after they are updated
  useEffect(() => {
    if (ingredients.length > 0) {
      console.log('Ingredients:', ingredients);
    }
  }, [ingredients]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {loading && ( // Loading indicator
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Scanning for ingredients...</Text>
        </View>
      )}
      <TouchableWithoutFeedback onPress={handleFocus}>
        <Camera
          style={styles.camera}
          ref={cameraRef}
          autoFocus={autoFocus}
          type={Camera.Constants.Type.back}
          focusDepth={focusPoint?.x || 0.5} // Optional: Set focus depth based on focus point
        >
          <View style={styles.buttonContainer}>
            <IconButton
              icon="camera"
              size={60} 
              color="#FFFFFF" 
              style={styles.circleButton}
              onPress={takePicture}
            />
          </View>
        </Camera>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    zIndex: 10, // Ensure overlay is on top
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#007bff',
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40, 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    marginBottom: 100
  },
});
