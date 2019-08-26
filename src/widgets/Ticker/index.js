import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

const Ticker = ({ ticker, pair }) => (
  <View style={styles.container}>
    {/* <View style={styles.left}></View> */}
    <View style={styles.center}>
      <Text style={[styles.text, styles.textFirstRow]}>{pair}</Text>
      <Text style={[styles.text, styles.textSecondRow]}>
        Vol {ticker.volume.toLocaleString()} BTC
      </Text>
    </View>
    <View style={styles.right}>
      <Text style={[styles.text, styles.textFirstRow]}>
        {ticker.lastPrice.toLocaleString()}
      </Text>
      <Text
        style={[
          styles.text,
          styles.textSecondRow,
          ticker.dailyChange > 0 ? styles.textUp : styles.textDown
        ]}
      >
        {Math.abs(ticker.dailyChange).toLocaleString()}
        <MaterialCommunityIcons
          name={ticker.dailyChange > 0 ? "chevron-down" : "chevron-up"}
          size={14}
          color={ticker.dailyChange > 0 ? colors.textUp : colors.textDown}
        />
        ({(Math.abs(ticker.dailyChangePerc) * 100).toFixed(2)})%
      </Text>
    </View>
  </View>
);

const mapStateToProps = state => {
  return {
    ticker: state.ticker,
    pair: state.pairs.selectedPair
  };
};

export default connect(mapStateToProps)(Ticker);
