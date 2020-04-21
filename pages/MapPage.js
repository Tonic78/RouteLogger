import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function MapPage() {
  const mapRegion = {
    latitude: 52.379189,
    longitude: 4.899431,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
  };

  return (
    <MapView
      style={styles.map}
      provider={MapView.PROVIDER_GOOGLE}
      region={mapRegion}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
