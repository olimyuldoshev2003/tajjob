import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Message = ({ route }: { route: any }) => {
  // console.log(route.params.id);

  const navigation: any = useNavigation();

  return (
    <View style={styles.messageComponent}>
      <View style={styles.headerMessagesComponentBlock}>
        <View style={styles.headerBlock1}>
          <Ionicons
            name="arrow-back-sharp"
            size={31}
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Image
            source={require("../../assets/tajjob/messages/hr.jpg")}
            style={styles.HRImg}
          />
          <View style={styles.fullnameAndStatusBlockHeaderBlock1}>
            <Text style={styles.HRFullname}>Danny H.</Text>
            <Text style={styles.HRStatus}>Online</Text>
          </View>
        </View>
        <View style={styles.headerBlock2}>
          <FontAwesome5 name="phone-alt" size={31} color="black" />
          <FontAwesome name="video-camera" size={31} color="black" />
          <Entypo name="dots-three-vertical" size={31} color="black" />
        </View>
      </View>
      <View style={styles.sectionAndFooterMessagesComponentBlock}>
        <ScrollView
          style={styles.sectionMessagesComponentBlock}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.messagesContainer}>
            <Text style={styles.messagesSentDay}>Yesterday</Text>
            <View style={styles.messagesBlockOfThisDay}>
              <View style={styles.messageOfUserBlock}>
                <Text style={styles.messageOfUser}></Text>
                <View style={styles.messageSentTimeAndSeenBlock}></View>
              </View>
              <View style={styles.messageOfHRBlock}>
                <Text style={styles.messageOfHR}></Text>
                <View style={styles.messageSentTimeAndSeenBlock}></View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerMessagesComponentBlock}></View>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerMessagesComponentBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  headerBlock1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  HRImg: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  fullnameAndStatusBlockHeaderBlock1: {},
  HRFullname: {
    fontSize: 23,
    fontWeight: "500",
  },
  HRStatus: {
    color: "#A2A2A2",
    fontSize: 16,
    fontWeight: "400",
  },
  headerBlock2: {
    flexDirection: "row",
    gap: 10,
  },
  sectionAndFooterMessagesComponentBlock: {},
  sectionMessagesComponentBlock: {},
  messagesContainer: {},
  messagesSentDay: {},
  messageOfUser: {},
  messageOfUserBlock: {},
  messageOfHR: {},
  messageOfHRBlock: {},
  messageSentTimeAndSeenBlock: {},
  messagesBlockOfThisDay: {},
  footerMessagesComponentBlock: {},
});
