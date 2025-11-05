import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const Message = () => {
  return (
    <View style={styles.messageComponent}>
      <View style={styles.headerMessagesComponentBlock}>
        <View style={styles.headerBlock1}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </View>
        <View style={styles.headerBlock2}></View>
      </View>
      <View style={styles.sectionAndFooterMessagesComponentBlock}>
        <View style={styles.sectionMessagesComponentBlock}></View>
        <View style={styles.footerMessagesComponentBlock}></View>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageComponent: {

  },
  headerMessagesComponentBlock: {},
  headerBlock1: {},
  headerBlock2: {},
  sectionAndFooterMessagesComponentBlock: {},
  sectionMessagesComponentBlock: {},
  footerMessagesComponentBlock: {},
});
