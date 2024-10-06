import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { IconButton } from 'react-native-paper';

export default function CameraComponent({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);
  const [focusPoint, setFocusPoint] = useState(null); // To store focus point
  const cameraRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo); // Handle the photo (e.g., save it, navigate, etc.)
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
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
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
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
