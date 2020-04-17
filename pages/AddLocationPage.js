import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

export default function AddLocationsPage() {
  const [title, setTitle] = useState("");

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const saveLocationHandler = () => {};

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
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
