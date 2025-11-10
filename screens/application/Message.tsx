import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
              <View style={styles.messageOfUserMainBlock}>
                <View style={styles.messageOfUserBlock}>
                  <Text style={styles.messageOfUser}>Hello</Text>
                  <View style={styles.messageSentTimeAndSeenBlock}>
                    <Text style={styles.messageSentTime}>13:47</Text>
                    <MaterialCommunityIcons
                      name="check-all"
                      size={24}
                      color="#00b7ff"
                      style={styles.messageSeenIcon}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.messageOfHRMainBlock}>
                <View style={styles.messageOfHRBlock}>
                  <Text style={styles.messageOfHR}>Hi</Text>
                  <View style={styles.messageSentTimeAndSeenBlock}>
                    <Text style={styles.messageSentTime}>13:47</Text>
                    <MaterialCommunityIcons
                      name="check-all"
                      size={24}
                      color="#00b7ff"
                      style={styles.messageSeenIcon}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.messageOfHRMainBlock}>
                <View style={styles.messageOfHRBlock}>
                  <Text style={styles.messageOfHR}>How can I help you?</Text>
                  <View style={styles.messageSentTimeAndSeenBlock}>
                    <Text style={styles.messageSentTime}>13:47</Text>
                    <MaterialCommunityIcons
                      name="check-all"
                      size={24}
                      color="#00b7ff"
                      style={styles.messageSeenIcon}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.messageOfUserMainBlock}>
                <View style={styles.messageOfUserBlock}>
                  <Text style={styles.messageOfUser}>
                    I sent a request to your company in marketing area.
                  </Text>
                  <View style={styles.messageSentTimeAndSeenBlock}>
                    <Text style={styles.messageSentTime}>13:47</Text>
                    <MaterialCommunityIcons
                      name="check-all"
                      size={24}
                      color="#00b7ff"
                      style={styles.messageSeenIcon}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.messageOfHRMainBlock}>
                <View style={styles.messageOfHRBlock}>
                  <Text style={styles.messageOfHR}>
                    Ok. So, our specialists will message you.
                  </Text>
                  <View style={styles.messageSentTimeAndSeenBlock}>
                    <Text style={styles.messageSentTime}>13:47</Text>
                    <MaterialCommunityIcons
                      name="check-all"
                      size={24}
                      color="#00b7ff"
                      style={styles.messageSeenIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerMessagesComponentBlock}>
          <View style={styles.inputMessageAndIconBlock}>
            <TextInput
              style={styles.inputMessage}
              placeholder="Messages"
              placeholderTextColor={"#9E9E9E"}
            />
          </View>
        </View>
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
  sectionMessagesComponentBlock: {
    height: "72%",
  },
  messagesContainer: {},
  messagesSentDay: {
    alignSelf: "center",
    color: "#9E9E9E",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#fff",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  messagesBlockOfThisDay: {
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  messageOfUserMainBlock: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  messageOfUserBlock: {
    width: "60%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    padding: 8,
    borderRadius: 10,
  },
  messageOfUser: {
    fontSize: 20,
    fontWeight: "400",
  },
  messageOfHRMainBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  messageOfHRBlock: {
    width: "60%",
    backgroundColor: "#2623D2",
    padding: 8,
    borderRadius: 10,
  },
  messageOfHR: {
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
  },
  messageSentTimeAndSeenBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },
  messageSentTime: {
    color: "#9E9E9E",
    fontSize: 12,
    fontWeight: "400",
  },
  messageSeenIcon: {},
  footerMessagesComponentBlock: {
    paddingHorizontal: 10,
  },
  inputMessageAndIconBlock: {},
  inputMessage: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, 
    fontSize: 21, 
    fontWeight: "400",
    borderRadius: 15,
    paddingLeft: 50
  },
});
