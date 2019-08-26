const defaultState = {
  bid: [
    {
      price: 10368,
      count: 1,
      amount: 0.61
    },
    {
      price: 10367,
      count: 4,
      amount: 2.61
    },
    {
      price: 10366,
      count: 2,
      amount: 1.15
    }
  ],
  ask: [
    {
      price: 10369,
      count: 2,
      amount: 1.15
    },
    {
      price: 10370,
      count: 6,
      amount: 3.15
    },
    {
      price: 10371,
      count: 5,
      amount: 5.56
    }
  ]
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
