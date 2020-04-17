import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LocationsPage() {
  return (
    <View>
      <Text>List of Locactions on this page</Text>
    </View>
  );
}

LocationsPage.navigationOptions = {
  headerTitle: "Every Location",
};

const styles = StyleSheet.create({});
