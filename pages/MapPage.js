import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapPage(props) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const mapRegion = {
    latitude: 52.379189,
    longitude: 4.899431,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
  };

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveSelectedLocationHandler = () => {
    props.navigation.navigate("AddLocation", {
      pickedLocation: selectedLocation,
    });
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={mapRegion}
      onPress={selectLocationHandler}
      showsUserLocation
      showsMyLocationButton
    >
      {markerCoordinates && (
        <Marker title="Choose location" coordinate={markerCoordinates}></Marker>
      )}
      <Button title="Save" onPress={saveSelectedLocationHandler} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 20,
    color: "blue",
  },
});
