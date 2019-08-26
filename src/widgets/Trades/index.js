import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { connect } from "react-redux";
import colors from "bitfinexTest/src/styles/colors";
import TradeItem from "./tradeItem";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
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
    paddingRight: 6
  },
  text: {
    color: colors.text
  }
});

const Trades = ({ trades, pair }) => (
  <View>
    <View style={styles.row}>
      <Text style={styles.icon}></Text>
      <Text style={[styles.text, styles.left]}>TIME</Text>
      <Text style={[styles.text, styles.center]}>PRICE</Text>
      <Text style={[styles.text, styles.right]}>AMOUNT</Text>
    </View>
    <View>
      <FlatList
        data={trades}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TradeItem trade={item} />}
      />
    </View>
  </View>
);

const mapStateToProps = state => {
  return {
    trades: state.trades,
    pair: state.pairs.selectedPair
  };
};

export default connect(mapStateToProps)(Trades);
