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
          {/* User Info Block - Positioned absolutely over the border */}
          <View style={styles.imgFullnameAndNumberPhoneOfUserBlock}>
            <Image
              source={require("../../assets/tajjob/profile/profileImg.jpg")}
              style={styles.userImg}
            />
            <Text style={styles.userFullname}>Olim Yuldoshev</Text>
            <Text style={styles.userNumberPhone}>+992919697875</Text>
          </View>

          {/* ScrollView with proper spacing */}
          <View style={styles.scrollViewContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.settingsAndFunctionalities}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.general}>
                <Text style={styles.generalText}>General</Text>
                <View style={styles.generalBlock}>
                  {/* Edit User */}
                  <TouchableHighlight
                    style={[styles.editUserBtn, styles.btnFunc]}
                    underlayColor="#f0f0f0"
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
                    underlayColor="#f0f0f0"
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
                    underlayColor="#f0f0f0"
                  >
                    <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                      <View style={styles.iconAndFuncTypeBlock}>
                        <View style={styles.iconBlock}>
                          <Image
                            source={require("../../assets/tajjob/profile/saveIcon.jpg")}
                            style={styles.icon}
                          />
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
                    underlayColor="#f0f0f0"
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

                  {/* Security */}
                  <TouchableHighlight
                    style={[styles.securityBtn, styles.btnFunc]}
                    underlayColor="#f0f0f0"
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
                  <TouchableHighlight
                    style={[styles.shareBtn, styles.btnFunc]}
                    underlayColor="#f0f0f0"
                  >
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
    marginTop: 45,
    position: "relative", // Needed for absolute positioning of user info
  },
  imgFullnameAndNumberPhoneOfUserBlock: {
    position: "absolute",
    alignItems: "center",
    top: -46,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  userImg: {
    width: 96,
    height: 96,
    borderRadius: 50,
    borderColor: "#fff",
  },
  userFullname: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 8,
  },
  userNumberPhone: {
    color: "#6B7280",
    fontSize: 20,
    fontWeight: "400",
    marginTop: 4,
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 145, // Space for the absolutely positioned user info
  },
  scrollView: {
    flex: 1,
  },
  settingsAndFunctionalities: {
    padding: 20,
    paddingTop: 0,
  },
  general: {},
  generalText: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 15,
  },
  generalBlock: {
    gap: 15,
  },
  editUserBtn: {},
  createResumeBtn: {},
  savedJobsBtn: {},
  /////////////////////////////////////////////////////////////
  // Styles of 6 type buttons, which has the same style
  btnFunc: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
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
    marginBottom: 15,
  },
  appearanceBlock: {
    gap: 15,
  },
  settingsBtn: {},
  securityBtn: {},
  shareBtn: {},
});
