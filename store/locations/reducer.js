import { ADD_LOCATION, SHOW_LOCATIONS } from "./actions";
import Location from "../../models/Location";

const initialState = {
  locations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOCATIONS:
      return {
        locations: action.locations.map(
          (location) =>
            new Location(
              location.id.toString(),
              location.title,
              location.imageUri,
              location.latitude,
              location.longitude
            )
        ),
      };
    case ADD_LOCATION:
      const newLocation = new Location(
        action.locationData.id.toString(),
        action.locationData.title,
        action.locationData.image,
        action.locationData.coords.latitude,
        action.locationData.coords.longitude
      );
      return {
        locations: state.locations.concat(newLocation),
      };

    default:
      return state;
  }
};
