const GET_TICKER_START = "ticker/GET_TICKER_START";
const GET_TICKER_UPDATE = "ticker/GET_TICKER_UPDATE";

const defaultState = null;

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_TICKER_UPDATE:
      return action.ticker;
    default:
      return state;
  }
}

let ws = null;

const sendMessage = pair => {
  try {
    ws.send(
      JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: `t${pair.replace("/", "")}`
      })
    );
  } catch (error) {
    console.log("test:error", error);
  }
};

export const fetchTicker = pair => {
  return async dispatch => {
    dispatch({ type: GET_TICKER_START });
    if (ws) ws.close();

    ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          symbol: `t${pair.replace("/", "")}`
        })
      );
    };

    ws.onmessage = e => {
      const { data } = e;
      const parsedData = JSON.parse(data);
      if (parsedData.event) return;
      if (parsedData[1] === "hb") return;

      const [
        channelId,
        [
          bid,
          bidSize,
          ask,
          askSize,
          dailyChange,
          dailyChangePerc,
          lastPrice,
          volume,
          high,
          low
        ]
      ] = parsedData;
      dispatch({
        type: GET_TICKER_UPDATE,
        ticker: {
          bid,
          bidSize,
          ask,
          askSize,
          dailyChange,
          dailyChangePerc,
          lastPrice,
          volume,
          high,
          low
        }
      });
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
