import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default TakeImage = (props) => {
  const [imgTaken, setImgTaken] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImgTaken(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.takeImage}>
      <View style={styles.imagePreview}>
        {!imgTaken ? (
          <Text>No image taken yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imgTaken }} />
        )}
      </View>
      <Button title="Take Image" color="blue" onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  takeImage: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
