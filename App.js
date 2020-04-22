import React from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import LocationsNavigator from "./navigation/LocationsNavigator";
import locations from "./store/locations/reducer";
import { init } from "./database";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((error) => {
    console.log("Initializing database failed");
    console.log(error);
  });

const rootReducer = combineReducers({
  locations,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <LocationsNavigator />
    </Provider>
  );
}
