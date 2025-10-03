import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
            <Pressable style={styles.filterBtn}>
              <Image
                source={require("../../assets/tajjob/home/filter.jpg")}
                style={styles.filterIcon}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.sectionHomeComponent}>
          {/* Jobs */}
          <View style={styles.container}>

          </View>
        </View>
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
    paddingTop: 16,
    paddingBottom: 30,
    borderStartEndRadius: 20,
    borderEndEndRadius: 20,
    boxShadow: "0 6px 4px #00000040",
  },
  headerBlock1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  searchInputBlock: {
    position: "relative",
    flex: 1,
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
  filterBtn: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  filterIcon: {},
  sectionHomeComponent: {},
});
