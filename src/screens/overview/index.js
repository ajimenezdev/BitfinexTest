import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Picker,
  StatusBar
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "bitfinexTest/src/styles/colors";
import { WidgetContainer } from "bitfinexTest/src/components";
import { OrderBook, Ticker, Trades } from "bitfinexTest/src/widgets";

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
    flex: 1
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
    // right: 12
  }
});

const overview = () => {
  const [currentPair, setCurrentPair] = useState("tBTCUSD");
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Bitfinex Test</Text>
          <RNPickerSelect
            value={currentPair}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={value => setCurrentPair(value)}
            items={[
              { label: "BTCUSD", value: "tBTCUSD" },
              { label: "BTCETH", value: "tBTCETH" },
              { label: "ETHUSD", value: "tETHUSD" }
            ]}
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
      <View style={styles.body}>
        <WidgetContainer title="Ticker">
          <OrderBook />
        </WidgetContainer>
        <WidgetContainer title="Order Book">
          <Ticker />
        </WidgetContainer>
        <WidgetContainer title="Trades">
          <Trades />
        </WidgetContainer>
      </View>
    </View>
  );
};

export default overview;
