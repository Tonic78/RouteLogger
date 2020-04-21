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
import MapPreview from "./MapPreview";

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
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

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

  const chooseLocationHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.pickLocation}>
      <MapPreview location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Text>Ckoose your location!</Text>
        )}
      </MapPreview>
      <View style={styles.buttoncontainer}>
        <Button
          title="Get User Location"
          color="blue"
          onPress={getLocationHandler}
        />
        <Button
          title="Choose Location"
          color="blue"
          onPress={chooseLocationHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickLocation: {
    marginBottom: 15,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
