import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

export default function PickLocation(props) {
  const getLocationHandler = () => {};

  return (
    <View style={styles.pickLocation}>
      <View style={styles.mapPreview}>
        <Text>Ckoose your location!</Text>
      </View>
      <Button
        title="Get User Location"
        color="green"
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
    width: 100%,
    height: 150,
    borderColor: "green",
    borderWidth: 1
  },
});
