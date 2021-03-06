import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { addLocation } from "../store/locations/actions";
import TakeImage from "../components/TakeImage";
import PickLocation from "../components/PickLocation";

export default function AddLocationsPage(props) {
  // console.log("what is ADD PAGE selectedLocation", selectedLocation);

  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  useEffect(() => {
    if (props.route.params) {
      const pickedCoordinates = {
        latitude: props.route.params.pickedLocation.latitude,
        longitude: props.route.params.pickedLocation.longitude,
      };
      // console.log("what is ADD PAGE pickedCoordinates", pickedCoordinates);
      setSelectedLocation(pickedCoordinates);
    }
  }, [props.route.params]);

  // console.log("what is ADDLOCATION selectedLocation", selectedLocation);

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const saveLocationHandler = () => {
    dispatch(addLocation(title, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  const getUserLocationHandler = (location) => {
    // console.log("GETUSERLOCATIONHANDLER", location);
    const userCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    // console.log("what is ADD LOC userCoords", userCoords);
    setSelectedLocation(userCoords);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <TakeImage onImageTaken={imageTakenHandler} />
        <PickLocation
          // navigation={props.navigation}
          // route={props.route}
          onGetLocation={getUserLocationHandler}
        />
        <Button title="Save Location" onPress={saveLocationHandler} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
