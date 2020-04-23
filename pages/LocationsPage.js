import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectLocations } from "../store/locations/selectors";

import LocationItem from "../components/LocationItem";
import { displayLocations } from "../store/locations/actions";

export default function LocationsPage(props) {
  const locations = useSelector(selectLocations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayLocations());
  }, [dispatch]);

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
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            latitude={itemData.item.latitude}
            longitude={itemData.item.longitude}
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
