import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchOrderBook } from "bitfinexTest/src/redux/reducers/orderBookReducer";
import colors from "bitfinexTest/src/styles/colors";
import OrderBookItem from "./orderBookItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  column: {
    flex: 1,
    padding: 6
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    color: colors.text
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: "100%"
  }
});

const getItemSeparator = () => <View style={styles.separator} />;

const aggregateOrders = orders => {
  // map through all orders to aggregate total until item
  const aggregatedOrders = orders.map((o, idx) => ({
    ...o,
    total: orders.slice(0, idx + 1).reduce((acc, o) => acc + o.amount, 0)
  }));
  const last = aggregatedOrders.slice(-1)[0]; //last element
  return aggregatedOrders.map(o => ({
    ...o,
    allTotalAmount: last && last.total
  }));
};

const OrderBook = ({ level, pair, orderBook, fetchOrderBook }) => {
  useEffect(() => {
    fetchOrderBook(pair, level);
  }, [pair, level]);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <FlatList
          data={aggregateOrders(orderBook.bid)}
          keyExtractor={item => item.price.toString()}
          renderItem={({ item }) => <OrderBookItem isBid={true} item={item} />}
          ListHeaderComponent={() => (
            <View style={styles.headerRow}>
              <Text style={styles.text}>Total</Text>
              <Text style={styles.text}>Price</Text>
            </View>
          )}
          ItemSeparatorComponent={getItemSeparator}
        />
      </View>
      <View style={styles.column}>
        <FlatList
          data={aggregateOrders(orderBook.ask)}
          keyExtractor={item => item.price.toString()}
          renderItem={({ item }) => <OrderBookItem isBid={false} item={item} />}
          ListHeaderComponent={() => (
            <View style={styles.headerRow}>
              <Text style={styles.text}>Price</Text>
              <Text style={styles.text}>Amount</Text>
            </View>
          )}
          ItemSeparatorComponent={getItemSeparator}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    orderBook: state.orderBook,
    pair: state.pairs.selectedPair
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchOrderBook }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBook);
