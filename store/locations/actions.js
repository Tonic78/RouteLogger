import * as FileSystem from "expo-file-system";

export const ADD_LOCATION = "ADD_LOCATION";

export const addLocation = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch({
      type: ADD_LOCATION,
      locationData: { title: title, image: newPath },
    });
  };
};
