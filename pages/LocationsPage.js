import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ShadowPropTypesIOS,
} from "react-native";
import { useSelector } from "react-redux";
import { selectLocations } from "../store/locations/selectors";

import LocationItem from "../components/LocationItem";

export default function LocationsPage(props) {
  const locations = useSelector(selectLocations);

  const addLocationHandler = () => {
    props.navigation.navigate("AddLocation");
  };

  return (
    <View>
      <View>
        <Button title="add location" onPress={addLocationHandler} />
      </View>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <LocationItem
            // image={null}
            title={itemData.item.title}
            // address={null}
            onSelect={() => {
              props.navigation.navigate("LocationDetail", {
                locationTitle: itemData.item.title,
                locationId: itemData.item.id,
              });
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
