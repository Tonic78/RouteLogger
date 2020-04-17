import { ADD_LOCATION } from "./actions";

const initialState = {
  locations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return [...state, ...action.payload];

    default:
      return state;
  }
};
