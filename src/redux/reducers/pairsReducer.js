const SET_CURRENT_PAIR = "pairs/SET_CURRENT_PAIR";

const defaultState = {
  selectedPair: "BTCUSD",
  availablePairs: ["BTCUSD", "BTCETH", "ETHUSD"]
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_PAIR:
      return { ...state, selectedPair: action.pair };
    default:
      return state;
  }
}

export const setCurrentPair = pair => {
  return {
    type: SET_CURRENT_PAIR,
    pair
  };
};
