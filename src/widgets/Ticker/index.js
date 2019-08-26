import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchTicker } from "bitfinexTest/src/redux/reducers/tickerReducer";
import colors from "bitfinexTest/src/styles/colors";

const styles = StyleSheet.create({
  text: {
    color: colors.text
  },
  textFirstRow: {
    fontSize: 14
  },
  textSecondRow: {
    fontSize: 12
  },
  textUp: {
    color: colors.textPositive
  },
  textDown: {
    color: colors.textNegative
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12
  },
  left: {
    flex: 1
  },
  center: {
    flex: 3
  },
  right: {
    alignItems: "flex-end",
    flex: 3
  }
});

const Ticker = ({ ticker, pair, fetchTicker }) => {
  useEffect(() => {
    fetchTicker(pair);
  }, [pair]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.left}></View> */}
      <View style={styles.center}>
        <Text style={[styles.text, styles.textFirstRow]}>{pair}</Text>
        <Text style={[styles.text, styles.textSecondRow]}>
          Vol {ticker && ticker.volume.toLocaleString()} BTC
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.text, styles.textFirstRow]}>
          {ticker && ticker.lastPrice.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.text,
            styles.textSecondRow,
            ticker && ticker.dailyChange > 0 ? styles.textUp : styles.textDown
          ]}
        >
          {ticker && Math.abs(ticker.dailyChange).toLocaleString()}
          {ticker && (
            <MaterialCommunityIcons
              name={ticker.dailyChange > 0 ? "chevron-up" : "chevron-down"}
              size={14}
              color={ticker.dailyChange > 0 ? colors.textUp : colors.textDown}
            />
          )}
          ({ticker && (Math.abs(ticker.dailyChangePerc) * 100).toFixed(2)})%
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    ticker: state.ticker,
    pair: state.pairs.selectedPair
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchTicker }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ticker);
