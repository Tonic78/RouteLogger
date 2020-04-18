import React, { useState } from "react";
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

export default function AddLocationsPage(props) {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const saveLocationHandler = () => {
    dispatch(addLocation(title));
    props.navigation.goBack();
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
        <TakeImage />
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
