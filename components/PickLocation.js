import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function PickLocation(props) {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    try {
      setIsFetching(true);
      const loaction = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log("what is location", location);
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Not able to get location", "Pick a location on the map", [
        { text: "Okay" },
      ]);
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.pickLocation}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Text>Ckoose your location!</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color="blue"
        onPress={getLocationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pickLocation: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
