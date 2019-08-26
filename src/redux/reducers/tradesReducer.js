const GET_TRADES_SET = "trades/GET_TRADES_SET";
const GET_TRADES_UPDATE = "trades/GET_TRADES_UPDATE";

const defaultState = [];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_TRADES_SET:
      return action.trades;
    case GET_TRADES_UPDATE:
      return [action.trade, ...state.slice(0, 24)];
    case "STOP_WS":
      ws.close();
      return state;
    default:
      return state;
  }
}

let ws = null;

export const fetchTrades = pair => {
  return async dispatch => {
    if (ws) ws.close();

    ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "trades",
          symbol: `t${pair.replace("/", "")}`
        })
      );
    };

    ws.onmessage = e => {
      const { data } = e;
      const parsedData = JSON.parse(data);
      if (parsedData.event) return;
      if (parsedData[1] === "hb") return;
      if (parsedData[1] === "te") return;

      if (parsedData.length === 2) {
        const [channelId, trades] = parsedData;
        dispatch({
          type: GET_TRADES_SET,
          trades: trades.map(t => {
            const [id, timeStamp, amount, price] = t;
            return { id, timeStamp, amount, price };
          })
        });
      } else {
        const [channelId, t, [id, timeStamp, amount, price]] = parsedData;
        dispatch({
          type: GET_TRADES_UPDATE,
          trade: { id, timeStamp, amount, price }
        });
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
