import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "bitfinexTest/src/styles/colors";

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between"
  },
  rowBid: {
    flexDirection: "row"
  },
  rowAsk: {
    flexDirection: "row-reverse"
  },
  text: {
    color: colors.text
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0
  },
  backgroundBid: {
    backgroundColor: colors.backgroundPositive
  },
  backgroundAsk: {
    backgroundColor: colors.backgroundNegative
  },
  backgroundPositive: {}
});

const OrderBookItem = ({
  isBid,
  item: { price, count, amount, total, allTotalAmount }
}) => (
  <View style={[styles.row, isBid ? styles.rowBid : styles.rowAsk]}>
    <View
      style={[
        styles.background,
        isBid ? styles.backgroundBid : styles.backgroundAsk,
        { width: `${(total / allTotalAmount) * 100}%` }
        // { width: "100%" }
      ]}
    ></View>

    <Text style={styles.text}>{total && total.toLocaleString()}</Text>
    {/* <Text style={styles.text}>{allTotalAmount && allTotalAmount}</Text> */}
    {/* <Text style={styles.text}>{count}</Text> */}
    <Text style={styles.text}>{price.toFixed(2)}</Text>
  </View>
);

export default OrderBookItem;
