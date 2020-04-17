import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function LocationsPage({ navigation }) {
  return (
    <View>
      <Text>List of Locactions on this page</Text>
      <Button
        title="Add Location"
        onPress={() => navigation.navigate("AddLocation")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
