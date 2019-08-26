import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "bitfinexTest/src/styles/colors";

const styles = StyleSheet.create({
  container: {
    margin: 6,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  title: {
    color: colors.text
  },
  body: {
    width: "100%"
  },
  actionsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  }
});

const WidgetContainer = ({ title, HeaderActions, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setOpen(!open)}>
        <MaterialCommunityIcons
          name={open ? "chevron-down" : "chevron-right"}
          size={24}
          color={colors.text}
          onPress={() => setOpen(!open)}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actionsContainer}>{HeaderActions}</View>
      </TouchableOpacity>
      {open && <View style={styles.body}>{children}</View>}
    </View>
  );
};

export default WidgetContainer;
