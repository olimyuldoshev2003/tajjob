import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

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
              <Text style={styles.generalText}>General</Text>
              <View style={styles.generalBlock}>
                {/* Edit User */}
                <TouchableHighlight
                  style={[styles.editUserBtn, styles.btnFunc]}
                >
                  <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                    <View style={styles.iconAndFuncTypeBlock}>
                      <Image  style={styles.icon} />
                      <Text style={styles.funcTypeText}></Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={37}
                      color="black"
                      style={styles.rightSideIcon}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.appearance}>
              <Text style={styles.appearanceText}>Appearance</Text>
              <View style={styles.appearanceBlock}></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileComponent: {
    flex: 1,
    backgroundColor: "#2623D2",
  },
  profileComponentBlock: {
    flex: 1,
  },
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
    // position: "absolute",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    top: -65,
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
  settingsAndFunctionalities: {
    padding: 20,
    paddingTop: 0,
  },
  general: {},
  generalText: {
    fontSize: 22,
    fontWeight: "500",
  },
  generalBlock: {},
  // Styles of 6 type buttons, which has the same style
  btnFunc: {},
  iconFuncTypeAndIconRightSideBlock: {},

  appearance: {},
  appearanceText: {
    fontSize: 22,
    fontWeight: "500",
  },
  appearanceBlock: {},

});
