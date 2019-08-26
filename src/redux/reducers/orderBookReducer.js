const GET_ORDERS_SET = "orderBook/GET_ORDERS_SET";
const GET_ORDERS_UPDATE = "orderBook/GET_ORDERS_UPDATE";

const defaultState = {
  bid: [],
  ask: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDERS_SET:
      return { ...state, bid: action.bid, ask: action.ask };
    default:
      return state;
  }
}

let ws = null;

const parseOrders = (orders, asc) =>
  orders
    .map(o => {
      const [price, count, amount] = o;
      return { price, count, amount: Math.abs(amount) };
    })
    .sort((a, b) =>
      asc ? (a.price > b.price ? 1 : -1) : a.price < b.price ? 1 : -1
    );

export const fetchOrderBook = pair => {
  return async dispatch => {
    if (ws) ws.close();

    ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: `t${pair.replace("/", "")}`,
          prec: "P0",
          freq: "F0",
          len: 25
        })
      );
    };

    ws.onmessage = e => {
      const { data } = e;
      const parsedData = JSON.parse(data);
      if (parsedData.event) return;
      if (parsedData[1] === "hb") return;

      if (Array.isArray(parsedData[1][0])) {
        const [channelId, orders] = parsedData;
        let bid = parseOrders(orders.filter(o => o[2] >= 0), false);
        let ask = parseOrders(orders.filter(o => o[2] < 0), true);
        bid = bid.map((o, idx) => {
          return {
            ...o,
            total: bid.slice(0, idx + 1).reduce((acc, o) => acc + o.amount, 0)
          };
        });

        ask = ask.map((o, idx) => {
          return {
            ...o,
            total: ask.slice(0, idx + 1).reduce((acc, o) => acc + o.amount, 0)
          };
        });

        dispatch({
          type: GET_ORDERS_SET,
          bid,
          ask
        });
      } else {
        // console.log("test:parsedData", parsedData);
      }

      // console.log("test:data", parsedData);

      // if (parsedData.length === 2) {
      //   const [channelId, trades] = parsedData;
      //   dispatch({
      //     type: GET_TRADES_SET,
      //     trades: trades.map(t => {
      //       const [id, timeStamp, amount, price] = t;
      //       return { id, timeStamp, amount, price };
      //     })
      //   });
      //   // console.log(
      //   //   "test:trades",
      //   //   trades.map(t => {
      //   //     const [id, timeStamp, amount, price] = t;
      //   //     return { id, timeStamp, amount, price };
      //   //   })
      //   // );
      // } else {
      //   const [channelId, t, [id, timeStamp, amount, price]] = parsedData;
      //   dispatch({
      //     type: GET_TRADES_UPDATE,
      //     trade: { id, timeStamp, amount, price }
      //   });
      //   // console.log("test:update", t, { id, timeStamp, amount, price });
      // }
    };

    ws.onerror = e => {
      // an error occurred
      console.log("error", e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log("close", e.code, e.reason);
    };
  };
};
