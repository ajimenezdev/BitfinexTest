const SET_CURRENT_PAIR = "pairs/SET_CURRENT_PAIR";
const GET_PAIRS_START = "pairs/GET_PAIRS_START";
const GET_PAIRS_SUCCESS = "pairs/GET_PAIRS_SUCCESS";
const GET_PAIRS_FAIL = "pairs/GET_PAIRS_FAIL";

const defaultState = {
  selectedPair: "BTC/USD",
  fetching: false,
  availablePairs: ["BTCUSD", "BTCETH", "ETHUSD"]
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_PAIR:
      return { ...state, selectedPair: action.pair };
    case GET_PAIRS_START:
      return { ...state, fetching: true };
    case GET_PAIRS_SUCCESS:
      return { ...state, fetching: false, availablePairs: action.pairs };
    default:
      return state;
  }
}

export const setCurrentPair = pair => ({
  type: SET_CURRENT_PAIR,
  pair
});

const formatPair = pair => {
  if (pair.length === 6)
    return `${pair.slice(0, 3).toUpperCase()}/${pair
      .slice(3, 6)
      .toUpperCase()}`;
  return pair.replace(":", "/").toUpperCase();
};

export const fetchPairs = () => {
  console.log("test:fetchPairs");
  return dispatch => {
    dispatch({ type: GET_PAIRS_START });
    fetch("https://api.bitfinex.com/v1/symbols")
      .then(response => response.json())
      .then(pairs =>
        dispatch({
          type: GET_PAIRS_SUCCESS,
          pairs: pairs.map(formatPair)
        })
      )
      .catch(error => dispatch({ type: GET_PAIRS_FAIL, error }));
  };
};
