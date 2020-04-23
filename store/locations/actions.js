import * as FileSystem from "expo-file-system";
import { insertLocation, fetchLocations } from "../../database";
import { KEY } from "react-native-dotenv";

export const ADD_LOCATION = "ADD_LOCATION";
export const SHOW_LOCATIONS = "SHOW_LOCATIONS";

export const addLocation = (title, selectedImage, selectedLocation) => {
  // console.log("what is ACTIONS selectedLocation", selectedLocation);

  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.latitude},${selectedLocation.longitude}&key=${KEY}`
    );

    if (!response.ok) {
      throw new Error("address api fetching error");
    }

    const responseData = await response.json();
    // console.log("what is ADDRESS API responseData", responseData);

    const address = responseData.results[0].formatted_address;
    const fileName = selectedImage.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: selectedImage,
        to: newPath,
      });
      const databaseResult = await insertLocation(
        title,
        newPath,
        address,
        selectedLocation.latitude,
        selectedLocation.longitude
      );
      // console.log("what is databaseresult", databaseResult);
      dispatch({
        type: ADD_LOCATION,
        locationData: {
          id: databaseResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const displayLocations = () => {
  return async (dispatch) => {
    try {
      const databaseResult = await fetchLocations();
      console.log(databaseResult);
      dispatch({ type: SHOW_LOCATIONS, locations: databaseResult.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
