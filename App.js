import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./src/redux/store";

import Overview from "./src/screens/overview";

const { store, persistor } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Overview />
      </PersistGate>
    </Provider>
  );
}
