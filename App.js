import React from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "react-redux";

import LocationsNavigator from "./navigation/LocationsNavigator";
import locations from "./store/locations/reducer";

const rootReducer = combineReducers({
  locations,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <LocationsNavigator />
    </Provider>
  );
}
