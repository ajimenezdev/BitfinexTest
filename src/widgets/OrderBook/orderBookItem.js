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
  }
});

const OrderBookItem = ({ isBid, item: { price, count, amount, total } }) => (
  <View style={[styles.row, isBid ? styles.rowBid : styles.rowAsk]}>
    <Text style={styles.text}>{total && total.toLocaleString()}</Text>
    {/* <Text style={styles.text}>{count}</Text> */}
    <Text style={styles.text}>{price.toFixed(2)}</Text>
  </View>
);

export default OrderBookItem;
