import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = () => {
  return (
    <View style={styles.homeComponent}>
      <View style={styles.homeComponentBlock}>
        <View style={styles.headerHomeComponent}>
          <View style={styles.headerBlock1}>
            <View style={styles.headerTextBlock}>
              <Text style={styles.greetingsAndName}>Hi Olim</Text>
              <Text style={styles.greetingText}>Welcome</Text>
            </View>
            <View style={styles.blockNotificationIcon}>
              <MaterialIcons
                name="notifications"
                size={44}
                color="white"
                style={styles.notificationIcon}
              />
              <View style={styles.newNotificationNotice} />
            </View>
          </View>
          <View style={styles.headerBlock2}>
            <View style={styles.searchInputBlock}>
              <Ionicons
                name="search"
                size={38}
                color="black"
                style={styles.searchIcon}
              />
              <TextInput style={styles.searchInput} placeholder="Search" />
            </View>
          </View>
        </View>
        <View style={styles.sectionHomeComponent}></View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeComponent: {
    height: `100%`,
    backgroundColor: "#fff",
    // paddingHorizontal: 20,
    paddingTop: 30,
  },
  homeComponentBlock: {},
  headerHomeComponent: {
    backgroundColor: "#0961F6",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  headerBlock1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTextBlock: {},
  greetingsAndName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 28,
  },
  greetingText: {
    color: "#9FBFE2",
    fontWeight: "500",
    fontSize: 21,
  },
  blockNotificationIcon: {
    position: "relative",
  },
  notificationIcon: {
    backgroundColor: "#ffffff45",
    borderRadius: 10,
  },
  newNotificationNotice: {
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 35,
    position: "absolute",
    top: 8,
    right: 13,
  },
  headerBlock2: {
    marginTop: 25,
  },
  searchInputBlock: {
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    top: 9,
    left: 7,
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: "#F5F6FA",
    borderRadius: 10,
    paddingLeft: 55,
    paddingRight: 15,
    fontSize: 26,
    fontStyle: "italic",
    fontWeight: "600",
  },
  sectionHomeComponent: {},
});
