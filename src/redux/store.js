import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

// const migrations = {};

const persistConfig = {
  key: "root",
  storage,
  // version: 0,
  // migrate: createMigrate(migrations),
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(ReduxThunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
