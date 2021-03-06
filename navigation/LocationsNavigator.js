import React from "react";
import { Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddLocationPage from "../pages/AddLocationPage";
import LocationDetailPage from "../pages/LocationDetailPage";
import LocationsPage from "../pages/LocationsPage";
import MapPage from "../pages/MapPage";

const Stack = createStackNavigator();

export default function LocationsNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Locations"
          component={LocationsPage}
          options={{
            headerTitle: "All Locations",
          }}
        />
        <Stack.Screen
          name="LocationDetail"
          component={LocationDetailPage}
          options={({ route }) => ({
            title: route.params.locationTitle,
            headerBackTitle: null,
          })}
        />
        <Stack.Screen
          name="AddLocation"
          component={AddLocationPage}
          options={{ title: "Add a Location" }}
        />
        <Stack.Screen name="Map" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
