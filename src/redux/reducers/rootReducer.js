import { combineReducers } from "redux";
import pairsReducer from "./pairsReducer";
import orderBookReducer from "./orderBookReducer";
import tradesReducer from "./tradesReducer";
import tickerReducer from "./tickerReducer";

const combinedReducers = combineReducers({
  pairs: pairsReducer,
  orderBook: orderBookReducer,
  trades: tradesReducer,
  ticker: tickerReducer
});

const rootReducer = (state, action) => combinedReducers(state, action);

export default rootReducer;
