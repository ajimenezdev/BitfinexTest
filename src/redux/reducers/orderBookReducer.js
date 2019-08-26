const GET_ORDERS_SET = "orderBook/GET_ORDERS_SET";
const GET_BID_ORDERS_UPDATE = "orderBook/GET_BID_ORDERS_UPDATE";
const GET_ASK_ORDERS_UPDATE = "orderBook/GET_ASK_ORDERS_UPDATE";
const GET_BID_ORDERS_DELETE = "orderBook/GET_BID_ORDERS_DELETE";
const GET_ASK_ORDERS_DELETE = "orderBook/GET_ASK_ORDERS_DELETE";

const defaultState = {
  bid: [],
  ask: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDERS_SET:
      return { ...state, bid: action.bid, ask: action.ask };
    case GET_ASK_ORDERS_UPDATE: {
      const ask = [...state.ask];
      const index = ask.findIndex(o => o.price === action.level.price);
      if (index !== -1) {
        ask[index] = action.level;
      } else {
        ask.push(action.level);
      }
      return { ...state, ask: sortOrders(ask, true) };
    }
    case GET_BID_ORDERS_UPDATE: {
      const bid = [...state.bid];
      const index = bid.findIndex(o => o.price === action.level.price);
      if (index !== -1) {
        bid[index] = action.level;
      } else {
        bid.push(action.level);
      }
      return { ...state, bid: sortOrders(bid, false) };
    }
    case GET_ASK_ORDERS_DELETE:
      return { ...state, ask: state.ask.filter(o => o.price !== action.price) };
    case GET_BID_ORDERS_DELETE:
      return { ...state, bid: state.bid.filter(o => o.price !== action.price) };
    default:
      return state;
  }
}

let ws = null;

const sortOrders = (orders, asc) =>
  orders.sort((a, b) =>
    asc ? (a.price > b.price ? 1 : -1) : a.price < b.price ? 1 : -1
  );

const parseOrders = orders =>
  orders.map(o => {
    const [price, count, amount] = o;
    return { price, count, amount: Math.abs(amount) };
  });

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
          freq: "F1",
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
        const bid = sortOrders(
          parseOrders(orders.filter(o => o[2] >= 0)),
          false
        );
        const ask = sortOrders(parseOrders(orders.filter(o => o[2] < 0)), true);

        dispatch({
          type: GET_ORDERS_SET,
          bid,
          ask
        });
      } else {
        const [price, count, amount] = parsedData[1];
        if (count === 0) {
          // Delete entry
          if (amount >= 0) {
            // BID
            dispatch({
              type: GET_BID_ORDERS_DELETE,
              price: price
            });
          } else {
            // ASK
            dispatch({
              type: GET_ASK_ORDERS_DELETE,
              price: price
            });
          }
        } else {
          // Add/Update entry
          if (amount >= 0) {
            // BID
            dispatch({
              type: GET_BID_ORDERS_UPDATE,
              level: { price, count, amount: Math.abs(amount) }
            });
          } else {
            // ASK
            dispatch({
              type: GET_ASK_ORDERS_UPDATE,
              level: { price, count, amount: Math.abs(amount) }
            });
          }
        }
      }
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
