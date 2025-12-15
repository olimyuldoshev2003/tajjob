import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";

// Define your navigation types
type RootStackParamList = {
  EditUser: undefined;
  CreateResume: undefined;
  SavedJobs: undefined;
  Settings: undefined;
};

type ProfileNavigationProp = StackNavigationProp<RootStackParamList>;

const Profile = () => {
  const navigation = useNavigation<ProfileNavigationProp>();

  const colorScheme = useColorScheme()

  const dynamicStyles = StyleSheet.create({
    profileComponent: {
      flex: 1,
      backgroundColor:colorScheme === "dark" ? "#b8b8b8":  "#2623D2",
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
      marginTop: 145,
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
    saveIconBlock: {
      paddingVertical: 10,
      paddingHorizontal: 15.4,
    },
    saveIcon: {},
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


  return (
    <View style={dynamicStyles.profileComponent}>
      <View style={dynamicStyles.profileComponentBlock}>
        <View style={dynamicStyles.headerBlockProfileComponent}>
          <Text style={dynamicStyles.headerText}>Profile</Text>
        </View>
        <View style={dynamicStyles.sectionBlockProfileComponent}>
          {/* User Info Block - Positioned absolutely over the border */}
          <View style={dynamicStyles.imgFullnameAndNumberPhoneOfUserBlock}>
            <Image
              source={require("../../assets/tajjob/profile/profileImg.jpg")}
              style={dynamicStyles.userImg}
            />
            <Text style={dynamicStyles.userFullname}>Olim Yuldoshev</Text>
            <Text style={dynamicStyles.userNumberPhone}>+992919697875</Text>
          </View>

          {/* ScrollView with proper spacing */}
          <View style={dynamicStyles.scrollViewContainer}>
            <ScrollView
              style={dynamicStyles.scrollView}
              contentContainerStyle={dynamicStyles.settingsAndFunctionalities}
              showsVerticalScrollIndicator={false}
            >
              <View style={dynamicStyles.general}>
                <Text style={dynamicStyles.generalText}>General</Text>
                <View style={dynamicStyles.generalBlock}>
                  {/* Edit User */}
                  <TouchableHighlight
                    style={[dynamicStyles.editUserBtn, dynamicStyles.btnFunc]}
                    underlayColor="#f0f0f0"
                    onPress={() => {
                      navigation.navigate("EditUser");
                    }}
                  >
                    <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                      <View style={dynamicStyles.iconAndFuncTypeBlock}>
                        <View style={dynamicStyles.iconBlock}>
                          <Image
                            source={require("../../assets/tajjob/profile/userIcon.png")}
                            style={dynamicStyles.icon}
                          />
                        </View>
                        <Text style={dynamicStyles.funcTypeText}>Edit user</Text>
                      </View>
                      <Entypo
                        name="chevron-small-right"
                        size={37}
                        color="black"
                        style={dynamicStyles.rightSideIcon}
                      />
                    </View>
                  </TouchableHighlight>

                  {/* Create Resume */}
                  <TouchableHighlight
                    style={[dynamicStyles.createResumeBtn, dynamicStyles.btnFunc]}
                    underlayColor="#f0f0f0"
                  >
                    <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                      <View style={dynamicStyles.iconAndFuncTypeBlock}>
                        <View style={dynamicStyles.iconBlock}>
                          <Image
                            source={require("../../assets/tajjob/profile/documentIcon.png")}
                            style={dynamicStyles.icon}
                          />
                        </View>
                        <Text style={dynamicStyles.funcTypeText}>Create resume</Text>
                      </View>
                      <Entypo
                        name="chevron-small-right"
                        size={37}
                        color="black"
                        style={dynamicStyles.rightSideIcon}
                      />
                    </View>
                  </TouchableHighlight>

                  {/* Saved Jobs */}
                  <TouchableHighlight
                    style={[dynamicStyles.savedJobsBtn, dynamicStyles.btnFunc]}
                    onPress={() => {
                      navigation.navigate("SavedJobs");
                    }}
                    underlayColor="#f0f0f0"
                  >
                    <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                      <View style={dynamicStyles.iconAndFuncTypeBlock}>
                        <View style={[dynamicStyles.iconBlock, dynamicStyles.saveIconBlock]}>
                          <FontAwesome
                            name="bookmark-o"
                            size={32}
                            color="black"
                            style={[dynamicStyles.saveIcon]}
                          />
                        </View>
                        <Text style={dynamicStyles.funcTypeText}>Saved jobs</Text>
                      </View>
                      <Entypo
                        name="chevron-small-right"
                        size={37}
                        color="black"
                        style={dynamicStyles.rightSideIcon}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={dynamicStyles.appearance}>
                <Text style={dynamicStyles.appearanceText}>Appearance</Text>
                <View style={dynamicStyles.appearanceBlock}>
                  {/* Settings */}
                  <TouchableHighlight
                    style={[dynamicStyles.settingsBtn, dynamicStyles.btnFunc]}
                    underlayColor="#f0f0f0"
                    onPress={() => {
                      navigation.navigate("Settings");
                    }}
                  >
                    <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                      <View style={dynamicStyles.iconAndFuncTypeBlock}>
                        <View style={dynamicStyles.iconBlock}>
                          <Image
                            source={require("../../assets/tajjob/profile/settingsIcon.png")}
                            style={dynamicStyles.icon}
                          />
                        </View>
                        <Text style={dynamicStyles.funcTypeText}>Settings</Text>
                      </View>
                      <Entypo
                        name="chevron-small-right"
                        size={37}
                        color="black"
                        style={dynamicStyles.rightSideIcon}
                      />
                    </View>
                  </TouchableHighlight>

                  {/* Security */}
                  <TouchableHighlight
                    style={[dynamicStyles.securityBtn, dynamicStyles.btnFunc]}
                    underlayColor="#f0f0f0"
                  >
                    <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                      <View style={dynamicStyles.iconAndFuncTypeBlock}>
                        <View style={dynamicStyles.iconBlock}>
                          <Image
                            source={require("../../assets/tajjob/profile/lockIcon.png")}
                            style={dynamicStyles.icon}
                          />
                        </View>
                        <Text style={dynamicStyles.funcTypeText}>Security</Text>
                      </View>
                      <Entypo
                        name="chevron-small-right"
                        size={37}
                        color="black"
                        style={dynamicStyles.rightSideIcon}
                      />
                    </View>
                  </TouchableHighlight>

                  {/* Share */}
                  <TouchableHighlight
                    style={[dynamicStyles.shareBtn, dynamicStyles.btnFunc]}
                    underlayColor="#f0f0f0"
                  >
                    <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                      <View style={dynamicStyles.iconAndFuncTypeBlock}>
                        <View style={dynamicStyles.iconBlock}>
                          <Image
                            source={require("../../assets/tajjob/profile/shareIcon.png")}
                            style={dynamicStyles.icon}
                          />
                        </View>
                        <Text style={dynamicStyles.funcTypeText}>Share</Text>
                      </View>
                      <Entypo
                        name="chevron-small-right"
                        size={37}
                        color="black"
                        style={dynamicStyles.rightSideIcon}
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

