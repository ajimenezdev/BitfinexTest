import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Picker,
  StatusBar,
  Button,
  NetInfo
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "bitfinexTest/src/styles/colors";
import { WidgetContainer } from "bitfinexTest/src/components";
import { OrderBook, Ticker, Trades } from "bitfinexTest/src/widgets";
import {
  setCurrentPair,
  fetchPairs
} from "bitfinexTest/src/redux/reducers/pairsReducer";
import { fetchOrderBook } from "bitfinexTest/src/redux/reducers/orderBookReducer";
import { fetchTrades } from "bitfinexTest/src/redux/reducers/tradesReducer";
import { fetchTicker } from "bitfinexTest/src/redux/reducers/tickerReducer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  header: {
    width: "100%",
    backgroundColor: colors.cardBackground
    // paddingBottom: 10
    // height: 70
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 24
  },
  title: {
    color: colors.text
  },
  body: {
    width: "100%",
    flex: 1,
    marginBottom: 20
  },
  networkContainer: {
    backgroundColor: colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 6,
    padding: 6
  },
  networkText: {
    color: "red"
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.text,
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: colors.text,
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10
  }
});

const overview = ({
  pairs,
  setCurrentPair,
  fetchPairs,
  stopWS,
  fetchOrderBook,
  fetchTrades,
  fetchTicker
}) => {
  useEffect(() => {
    fetchPairs();
  }, []);

  const [networkAvailable, setNetworkAvailable] = useState(true);
  useEffect(() => {
    NetInfo.addEventListener("connectionChange", connectionInfo => {
      const connected = connectionInfo.type !== "none";
      setNetworkAvailable(connected);
    });
  }, []);

  const [orderBookLevel, setOrderBookLevel] = useState(0);
  const [wsConnected, setWsConnected] = useState(true);

  const toggleWsStatus = () => {
    if (wsConnected) {
      stopWS();
      setWsConnected(false);
    } else {
      fetchOrderBook(pairs.selectedPair, orderBookLevel);
      fetchTrades(pairs.selectedPair);
      fetchTicker(pairs.selectedPair);
      setWsConnected(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Bitfinex Test</Text>
          <RNPickerSelect
            value={pairs.selectedPair}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={value => setCurrentPair(value)}
            items={pairs.availablePairs.map(pair => ({
              label: pair,
              value: pair
            }))}
            Icon={() => {
              return (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color="gray"
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
      <ScrollView style={styles.body}>
        {!networkAvailable && (
          <View style={styles.networkContainer}>
            <Text style={styles.networkText}>Network Not Available!</Text>
          </View>
        )}
        <WidgetContainer title="Ticker">
          <Ticker />
        </WidgetContainer>
        <WidgetContainer
          title="Order Book"
          HeaderActions={
            <React.Fragment>
              <MaterialCommunityIcons
                name="minus"
                size={24}
                color="gray"
                onPress={() =>
                  setOrderBookLevel(Math.max(0, orderBookLevel - 1))
                }
              />
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color="gray"
                onPress={() =>
                  setOrderBookLevel(Math.min(4, orderBookLevel + 1))
                }
              />
            </React.Fragment>
          }
        >
          <OrderBook level={orderBookLevel} />
        </WidgetContainer>
        <WidgetContainer title="Trades">
          <Trades />
        </WidgetContainer>
        <Button
          title={wsConnected ? "Disconnect" : "Connect"}
          onPress={() => toggleWsStatus()}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    pairs: state.pairs
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCurrentPair,
      fetchPairs,
      fetchOrderBook,
      fetchTrades,
      fetchTicker,
      stopWS: () => ({ type: "STOP_WS" })
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(overview);
