export const ADD_LOCATION = "ADD_LOCATION";

export const addLocation = (title, image) => {
  return { type: ADD_LOCATION, locationData: { title: title, image: image } };
};
