const defaultState = {
  bid: 10363,
  bidSize: 57.069815510000005,
  ask: 10364,
  askSize: 62.97711306,
  dailyChange: 214,
  dailyChangePerc: 0.0211,
  lastPrice: 10364,
  volume: 10245.89590718,
  high: 10675,
  low: 9805.8
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
