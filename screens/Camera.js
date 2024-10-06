import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { IconButton } from 'react-native-paper';

export default function CameraComponent({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo); // You can do something with the photo here, like saving it or navigating to another screen
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
      <Camera style={styles.camera} ref={cameraRef}>
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
