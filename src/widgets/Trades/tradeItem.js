import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "bitfinexTest/src/styles/colors";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
    // justifyContent: "space-around"
  },
  rowPositive: {
    backgroundColor: colors.backgroundPositive
  },
  rowNegative: {
    backgroundColor: colors.backgroundNegative
  },
  icon: {
    flex: 0.5
  },
  left: {
    flex: 1,
    textAlign: "center"
  },
  center: {
    flex: 2,
    textAlign: "center"
  },
  right: {
    flex: 2,
    textAlign: "right",
    paddingRight: 18
  },
  text: {
    color: colors.text
  }
});

const tradeItem = ({ trade: { id, amount, price, timeStamp } }) => (
  <View
    style={[styles.row, amount > 0 ? styles.rowPositive : styles.rowNegative]}
  >
    <MaterialCommunityIcons
      style={styles.icon}
      name={amount > 0 ? "chevron-down" : "chevron-up"}
      size={18}
      color={amount > 0 ? colors.textPositive : colors.textNegative}
    />
    <Text style={[styles.left, styles.text]}>
      {moment(timeStamp).format("HH:mm:ss")}
    </Text>
    <Text style={[styles.center, styles.text]}>{price.toLocaleString()}</Text>
    <Text style={[styles.right, styles.text]}>
      {Math.abs(amount).toFixed(4)}
    </Text>
  </View>
);

export default tradeItem;
