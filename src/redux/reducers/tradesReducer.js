const defaultState = [
  {
    id: 386996696,
    timeStamp: 1566820838973,
    amount: 0.01,
    price: 10406
  },
  {
    id: 386996695,
    timeStamp: 1566820838676,
    amount: -0.04173134,
    price: 10404
  }
];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
