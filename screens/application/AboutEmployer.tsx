import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AboutEmployer = ({ route }: { route: any }) => {
  return (
    <View style={styles.aboutEmployerComponent}>
      <ScrollView
        style={styles.aboutEmployerComponentBlock}
        contentContainerStyle={styles.aboutEmployerComponentScrollViewBlock}
      >
        <Text style={styles.aboutEmployerText}>
          {route.params.aboutEmployer}
        </Text>
        <View style={styles.officesAndWorkersAmountBlock}>
          <View style={styles.officesBlock}>
            <Image
              source={require("../../assets/tajjob/job/office-icon.jpg")}
              style={styles.officeIcon}
            />
            <View style={styles.officesTextAndAmount}>
              <Text style={styles.officesText}>Offices</Text>
              <Text style={styles.officesAmount}>67</Text>
            </View>
          </View>
          <View style={styles.workersBlock}>
            <Image
              source={require("../../assets/tajjob/job/worker-icon.jpg")}
              style={styles.workerIcon}
            />
            <View style={styles.workersTextAndAmount}>
              <Text style={styles.workersText}>Workers</Text>
              <Text style={styles.workersAmount}>1100</Text>
            </View>
          </View>
        </View>
        <View style={styles.contactWithHRSection}>
          <Text style={styles.contactWithHRTitle}>
            Contact with HR of employer
          </Text>
          <View style={styles.contactWithHRBlock}>
            <View style={styles.imgFullnameAndPositionOfHRBlock}>
              <Image
                source={require("../../assets/tajjob/job/HR-img.jpg")}
                style={styles.imgOfHR}
              />
              <View style={styles.HRFullnameAndPosition}>
                <Text style={styles.HRFullname}>Rahmonshoeva Sulgun</Text>
                <Text style={styles.HRPosition}>HR Manager</Text>
              </View>
            </View>
            <View style={styles.btnCallAndMessageHRBlock}>
              <Pressable style={styles.btnCallHR}>
                <Ionicons name="call" size={27} color="black" />
              </Pressable>
              <Pressable style={styles.btnMessageHR}>
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

const styles = StyleSheet.create({
  aboutEmployerComponent: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: "#616161",
    fontSize: 15,
    fontWeight: "500",
  },
  officesAmount: {
    color: "#4C4ADA",
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
    color: "#616161",
    fontSize: 15,
    fontWeight: "500",
  },
  workersAmount: {
    color: "#4C4ADA",
    fontSize: 14,
    fontWeight: "700",
  },
  contactWithHRSection: {
    paddingBottom: 30,
  },
  contactWithHRTitle: {
    fontSize: 18,
    fontWeight: "500",
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
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  HRPosition: {
    color: "#6B7280",
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
