import React from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  return (
    <View style={styles.profileComponent}>
      <View style={styles.profileComponentBlock}>
        <View style={styles.headerBlockProfileComponent}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.sectionBlockProfileComponent}>
          <View style={styles.imgFullnameAndNumberPhoneOfUserBlock}>
            <Image
              source={require("../../assets/tajjob/profile/prpofileImg.jpg")}
              style={styles.userImg}
            />
            <Text style={styles.userFullname}>Olim Yuldoshev</Text>
            <Text style={styles.userNumberPhone}>+992919697875</Text>
          </View>
          <View style={styles.settingsAndFunctionalities}>
            <View style={styles.general}>
              {/* <Pressable style={styles.btnEditProfile}>
                <Text style={styles.btntextEditProfile}></Text>
              </Pressable> */}
              <View></View>
            </View>
            <View style={styles.äppearance}></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileComponent: { flex: 1, backgroundColor: "#2623D2" },
  profileComponentBlock: {},
  headerBlockProfileComponent: {
    padding: 25,
    paddingTop: 50,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
  },
  sectionBlockProfileComponent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 65,
  },
  imgFullnameAndNumberPhoneOfUserBlock: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    top: -67,
  },
  userImg: {
    width: 96,
    height: 96,
    borderRadius: 50,
  },
  userFullname: {
    fontSize: 26,
    fontWeight: "700",
  },
  userNumberPhone: {
    color: "#6B7280",
    fontSize: 20,
    fontWeight: "400",
  },
  settingsAndFunctionalities: {},
  general: {},
  äppearance: {},
});
