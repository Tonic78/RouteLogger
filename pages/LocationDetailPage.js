import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function LocationDetailPage(props) {
  console.log("what is detailpage props", props);

  const locationId = props.route.params.locationId;
  // console.log("what is locationId", locationId);

  const selectedLocation = useSelector((state) =>
    state.locations.locations.find((location) => location.id === locationId)
  );

  const locationCoords = {
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedLocation.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedLocation.address}</Text>
        </View>
        <MapView
          style={styles.mapPreview}
          // provider={PROVIDER_GOOGLE}
          region={locationCoords}
          // showsMyLocationButton
        >
          <Marker title="Picked Location" coordinate={locationCoords} />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: "blue",
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
