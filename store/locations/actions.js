import * as FileSystem from "expo-file-system";
import { insertLocation } from "../../database";

export const ADD_LOCATION = "ADD_LOCATION";

// export const locationsInsert = (location) => ({
//   type: ADD_LOCATION,
//   locationData: location,
// });

export const addLocation = (title, selectedImage) => {
  return async (dispatch) => {
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
        "Dummy address",
        15.6,
        12.3
      );
      console.log("what is databaseresult", databaseResult);
      dispatch({
        type: ADD_LOCATION,
        locationData: {
          id: databaseResult.insertId,
          title: title,
          image: newPath,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
