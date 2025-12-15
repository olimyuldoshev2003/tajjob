import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const AboutEmployer = ({ route }: { route: any }) => {
  const colorScheme = useColorScheme();
  const dynamicStyles = StyleSheet.create({
    aboutEmployerComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
    },
    aboutEmployerComponentBlock: {
      paddingVertical: 12,
      paddingHorizontal: 10,
    },
    aboutEmployerComponentScrollViewBlock: {},
    aboutEmployerText: {
      fontSize: 16,
      fontWeight: "500",
      paddingBottom: 20,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    officesAndWorkersAmountBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingBottom: 20,
    },
    officesBlock: { flexDirection: "row", gap: 10 },
    officeIcon: {
      width: 36,
      height: 36,
    },
    officesTextAndAmount: {},
    officesText: {
      color: colorScheme === "dark" ? "#fff" : "#616161",
      fontSize: 15,
      fontWeight: "500",
    },
    officesAmount: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 14,
      fontWeight: "700",
    },
    workersBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    workerIcon: {
      width: 36,
      height: 36,
      resizeMode: "contain",
    },
    workersTextAndAmount: {},
    workersText: {
      color: colorScheme === "dark" ? "#fff" : "#616161",
      fontSize: 15,
      fontWeight: "500",
    },
    workersAmount: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 14,
      fontWeight: "700",
    },
    contactWithHRSection: {
      paddingBottom: 30,
    },
    contactWithHRTitle: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    contactWithHRBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: 15,
    },
    imgFullnameAndPositionOfHRBlock: {
      flexDirection: "row",
      gap: 10.5,
    },
    imgOfHR: {
      width: 61,
      height: 61,
    },
    HRFullnameAndPosition: {},
    HRFullname: {
      color: colorScheme === "dark" ? "#fff" : "#111827",
      fontSize: 16,
      fontWeight: "700",
    },
    HRPosition: {
      color: colorScheme === "dark" ? "#fff" : "#6B7280",
      fontSize: 16,
      fontWeight: "400",
    },
    btnCallAndMessageHRBlock: {
      flexDirection: "row",
      gap: 11,
    },
    btnCallHR: {
      padding: 4,
      backgroundColor: "#D9D9D9",
      borderRadius: 50,
    },
    btnMessageHR: {
      paddingVertical: 4,
      paddingHorizontal: 5,
      backgroundColor: "#D9D9D9",
      borderRadius: 50,
    },
  });
  return (
    <View style={dynamicStyles.aboutEmployerComponent}>
      <ScrollView
        style={dynamicStyles.aboutEmployerComponentBlock}
        contentContainerStyle={
          dynamicStyles.aboutEmployerComponentScrollViewBlock
        }
      >
        <Text style={dynamicStyles.aboutEmployerText}>
          {route.params.aboutEmployer}
        </Text>
        <View style={dynamicStyles.officesAndWorkersAmountBlock}>
          <View style={dynamicStyles.officesBlock}>
            <Image
              source={require("../../assets/tajjob/job/office-icon.jpg")}
              style={dynamicStyles.officeIcon}
            />
            <View style={dynamicStyles.officesTextAndAmount}>
              <Text style={dynamicStyles.officesText}>Offices</Text>
              <Text style={dynamicStyles.officesAmount}>67</Text>
            </View>
          </View>
          <View style={dynamicStyles.workersBlock}>
            <Image
              source={require("../../assets/tajjob/job/worker-icon.jpg")}
              style={dynamicStyles.workerIcon}
            />
            <View style={dynamicStyles.workersTextAndAmount}>
              <Text style={dynamicStyles.workersText}>Workers</Text>
              <Text style={dynamicStyles.workersAmount}>1100</Text>
            </View>
          </View>
        </View>
        <View style={dynamicStyles.contactWithHRSection}>
          <Text style={dynamicStyles.contactWithHRTitle}>
            Contact with HR of employer
          </Text>
          <View style={dynamicStyles.contactWithHRBlock}>
            <View style={dynamicStyles.imgFullnameAndPositionOfHRBlock}>
              <Image
                source={require("../../assets/tajjob/job/HR-img.jpg")}
                style={dynamicStyles.imgOfHR}
              />
              <View style={dynamicStyles.HRFullnameAndPosition}>
                <Text style={dynamicStyles.HRFullname}>
                  Rahmonshoeva Sulgun
                </Text>
                <Text style={dynamicStyles.HRPosition}>HR Manager</Text>
              </View>
            </View>
            <View style={dynamicStyles.btnCallAndMessageHRBlock}>
              <Pressable style={dynamicStyles.btnCallHR}>
                <Ionicons name="call" size={27} color="black" />
              </Pressable>
              <Pressable style={dynamicStyles.btnMessageHR}>
                <MaterialCommunityIcons
                  name="message-processing"
                  size={27}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutEmployer;
