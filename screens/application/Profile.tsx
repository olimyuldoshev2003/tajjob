import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  Image,
  ScrollView,
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
              source={require("../../assets/tajjob/profile/profileImg.jpg")}
              style={styles.userImg}
            />
            <Text style={styles.userFullname}>Olim Yuldoshev</Text>
            <Text style={styles.userNumberPhone}>+992919697875</Text>
          </View>
          <ScrollView contentContainerStyle={styles.settingsAndFunctionalities}>
            <View style={styles.general}>
              <Text style={styles.generalText}>General</Text>
              <View style={styles.generalBlock}>
                {/* Edit User */}
                <TouchableHighlight
                  style={[styles.editUserBtn, styles.btnFunc]}
                >
                  <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                    <View style={styles.iconAndFuncTypeBlock}>
                      <View style={styles.iconBlock}>
                        <Image
                          source={require("../../assets/tajjob/profile/userIcon.png")}
                          style={styles.icon}
                        />
                      </View>
                      <Text style={styles.funcTypeText}>Edit user</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={37}
                      color="black"
                      style={styles.rightSideIcon}
                    />
                  </View>
                </TouchableHighlight>

                {/* Create Resume */}
                <TouchableHighlight
                  style={[styles.createResumeBtn, styles.btnFunc]}
                >
                  <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                    <View style={styles.iconAndFuncTypeBlock}>
                      <View style={styles.iconBlock}>
                        <Image
                          source={require("../../assets/tajjob/profile/documentIcon.png")}
                          style={styles.icon}
                        />
                      </View>
                      <Text style={styles.funcTypeText}>Create resume</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={37}
                      color="black"
                      style={styles.rightSideIcon}
                    />
                  </View>
                </TouchableHighlight>

                {/* Saved Jobs */}
                <TouchableHighlight
                  style={[styles.savedJobsBtn, styles.btnFunc]}
                >
                  <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                    <View style={styles.iconAndFuncTypeBlock}>
                      <View style={styles.iconBlock}>
                        <Image
                          source={require("../../assets/tajjob/profile/saveIcon.jpg")}
                          style={styles.icon}
                        />
                        {/* <FontAwesome name="bookmark-o" size={36} color="black" /> */}
                      </View>
                      <Text style={styles.funcTypeText}>Saved jobs</Text>
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
              <View style={styles.appearanceBlock}>
                {/* Settings */}
                <TouchableHighlight
                  style={[styles.settingsBtn, styles.btnFunc]}
                >
                  <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                    <View style={styles.iconAndFuncTypeBlock}>
                      <View style={styles.iconBlock}>
                        <Image
                          source={require("../../assets/tajjob/profile/settingsIcon.png")}
                          style={styles.icon}
                        />
                      </View>
                      <Text style={styles.funcTypeText}>Settings</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={37}
                      color="black"
                      style={styles.rightSideIcon}
                    />
                  </View>
                </TouchableHighlight>

                {/* Securiry */}
                <TouchableHighlight
                  style={[styles.securityBtn, styles.btnFunc]}
                >
                  <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                    <View style={styles.iconAndFuncTypeBlock}>
                      <View style={styles.iconBlock}>
                        <Image
                          source={require("../../assets/tajjob/profile/lockIcon.png")}
                          style={styles.icon}
                        />
                      </View>
                      <Text style={styles.funcTypeText}>Security</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={37}
                      color="black"
                      style={styles.rightSideIcon}
                    />
                  </View>
                </TouchableHighlight>

                {/* Share */}
                <TouchableHighlight style={[styles.shareBtn, styles.btnFunc]}>
                  <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                    <View style={styles.iconAndFuncTypeBlock}>
                      <View style={styles.iconBlock}>
                        <Image
                          source={require("../../assets/tajjob/profile/shareIcon.png")}
                          style={styles.icon}
                        />
                      </View>
                      <Text style={styles.funcTypeText}>Share</Text>
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
          </ScrollView>
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
  generalBlock: {
    marginTop: 20,
    gap: 15,
  },
  editUserBtn: {},
  createResumeBtn: {},
  savedJobsBtn: {},
  /////////////////////////////////////////////////////////////
  // Styles of 6 type buttons, which has the same style
  btnFunc: {},
  iconFuncTypeAndIconRightSideBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconAndFuncTypeBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconBlock: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 50,
  },

  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  funcTypeText: {
    fontSize: 18,
    fontWeight: "500",
  },
  rightSideIcon: {},
  /////////////////////////////////////////////////////////////

  appearance: {
    marginTop: 30,
  },
  appearanceText: {
    fontSize: 22,
    fontWeight: "500",
  },
  appearanceBlock: {
    marginTop: 20,
    gap: 15,
  },
  settingsBtn: {},
  securityBtn: {},
  shareBtn: {},
});
