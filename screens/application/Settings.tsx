import ModalAddFeedbackForApp from "@/components/profile/ModalAddFeedbackForApp";
import {
  AntDesign,
  Entypo,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";

const Settings = () => {
  const navigation: any = useNavigation();

  const colorScheme = useColorScheme()

  const [modalAddFeedbackForApp, setModalAddFeedbackForApp] =
    useState<boolean>(false);
  
  
  const dynamicStyles = StyleSheet.create({
    settingsComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
    },
    settingsComponentBlockScrollView: {
      gap: 16,
      padding: 16,
      // paddingBottom: 16,
    },
    settingsComponentBlock: {},
    appearanceSection: {},
    appearanceFunctionalitiesBlock: {},
    languageBtn: {},
    themeBtn: {},
    gestureControlBtn: {},

    helpSection: {},
    helpFunctionalitiesBlock: {},
    aboutAppBtn: {},
    FAQBtn: {},
    feedbackBtn: {},
    updateAppBtn: {},
    deactivateAccountBtn: {},

    // Styles with the same properties
    appearanceAndHelpSection: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 5,
      padding: 10,
      borderRadius: 12,
      gap: 12,
    },
    titleOfAppearanceAndHelpSections: {
      color: colorScheme === "dark" ? "#bebebe": "#6E6E73",
      fontSize: 19,
      fontWeight: "500",
    },
    appearanceAndHelpFunctionalitiesBlock: {
      gap: 20,
    },

    deactivateAccountBtnBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    iconBlockDeactivateAccount: {
      backgroundColor: "#D9D9D9",
      padding: 10,
      borderRadius: 50,
    },
    iconDeactivateAccount: {},
    funcTypeDeactivateAccount: {
      fontSize: 18,
      fontWeight: "400",
      color: "red",
    },

    // Styles with the same properties for buttons, which showed selected type of functionality
    btnFuncShownType: {
      borderRadius: 12,
    },
    iconFuncTypeShownSelectedFuncAndIconRightSideBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconFuncTypeShownSelectedFuncBlock: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconAndFuncTypeBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    iconBlock: {
      backgroundColor: "#D9D9D9",
      padding: 10,
      borderRadius: 50,
    },
    icon: {},
    funcType: {
      fontSize: 18,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    selectedFunc: {
      fontSize: 18,
      fontWeight: "400",
      
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    rightSideIcon: {},

    // Styles with the same properties for buttons, which didn't show selected type of functionality
    btnFunc: {
      borderRadius: 12,
    },
    iconFuncTypeAndIconRightSideBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  return (
    <View style={dynamicStyles.settingsComponent}>
      <ScrollView
        contentContainerStyle={dynamicStyles.settingsComponentBlockScrollView}
        style={dynamicStyles.settingsComponentBlock}
      >
        <View
          style={[
            dynamicStyles.appearanceSection,
            dynamicStyles.appearanceAndHelpSection,
          ]}
        >
          <Text style={dynamicStyles.titleOfAppearanceAndHelpSections}>
            Appearance
          </Text>
          <View
            style={[
              dynamicStyles.appearanceFunctionalitiesBlock,
              dynamicStyles.appearanceAndHelpFunctionalitiesBlock,
            ]}
          >
            <TouchableHighlight
              style={[
                dynamicStyles.btnFuncShownType,
                dynamicStyles.languageBtn,
              ]}
              underlayColor={colorScheme === "dark" ? "#000" : "#f0f0f0"}
              onPress={() => {
                navigation.navigate("Language");
              }}
            >
              <View
                style={
                  dynamicStyles.iconFuncTypeShownSelectedFuncAndIconRightSideBlock
                }
              >
                <View style={dynamicStyles.iconFuncTypeShownSelectedFuncBlock}>
                  <View style={dynamicStyles.iconAndFuncTypeBlock}>
                    <View style={dynamicStyles.iconBlock}>
                      <Fontisto
                        name="world-o"
                        size={32}
                        color="black"
                        style={dynamicStyles.icon}
                      />
                    </View>
                    <Text style={dynamicStyles.funcType}>Language</Text>
                  </View>
                  <Text style={dynamicStyles.selectedFunc}>English</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                  style={dynamicStyles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[dynamicStyles.btnFuncShownType, dynamicStyles.themeBtn]}
              underlayColor={colorScheme === "dark" ? "#000" : "#f0f0f0"}
              onPress={() => {
                navigation.navigate("Theme");
              }}
            >
              <View
                style={
                  dynamicStyles.iconFuncTypeShownSelectedFuncAndIconRightSideBlock
                }
              >
                <View style={dynamicStyles.iconFuncTypeShownSelectedFuncBlock}>
                  <View style={dynamicStyles.iconAndFuncTypeBlock}>
                    <View style={dynamicStyles.iconBlock}>
                      <Ionicons
                        name="contrast"
                        size={32}
                        color="black"
                        style={dynamicStyles.icon}
                      />
                    </View>
                    <Text style={dynamicStyles.funcType}>Theme</Text>
                  </View>
                  <Text style={dynamicStyles.selectedFunc}>{`${
                    colorScheme?.toUpperCase()[0]
                  }${colorScheme?.slice(1)}`}</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                  style={dynamicStyles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={[dynamicStyles.btnFunc, dynamicStyles.gestureControlBtn]}
              onPress={() => {
                navigation.navigate("GestureControl");
              }}
              underlayColor={colorScheme === "dark" ? "#000" : "#f0f0f0"}
            >
              <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                <View style={dynamicStyles.iconAndFuncTypeBlock}>
                  <View style={dynamicStyles.iconBlock}>
                    <MaterialCommunityIcons
                      name="cellphone-sound"
                      size={32}
                      color="black"
                      style={dynamicStyles.icon}
                    />
                  </View>
                  <Text style={dynamicStyles.funcType}>Gesture control</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color={colorScheme === "dark" ? "#fff": "black"}
                  style={dynamicStyles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View
          style={[
            dynamicStyles.helpSection,
            dynamicStyles.appearanceAndHelpSection,
          ]}
        >
          <Text style={dynamicStyles.titleOfAppearanceAndHelpSections}>
            Help
          </Text>
          <View
            style={[
              dynamicStyles.helpFunctionalitiesBlock,
              dynamicStyles.appearanceAndHelpFunctionalitiesBlock,
            ]}
          >
            <TouchableHighlight
              style={[dynamicStyles.btnFunc, dynamicStyles.aboutAppBtn]}
              onPress={() => {
                navigation.navigate("AboutApp");
              }}
              underlayColor={colorScheme === "dark" ? "#000" : "#f0f0f0"}
            >
              <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                <View style={dynamicStyles.iconAndFuncTypeBlock}>
                  <View style={dynamicStyles.iconBlock}>
                    <Entypo
                      name="info"
                      size={32}
                      color="black"
                      style={dynamicStyles.icon}
                    />
                  </View>
                  <Text style={dynamicStyles.funcType}>About the app</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color={colorScheme === "dark" ? "#fff": "black"}
                  style={dynamicStyles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[dynamicStyles.btnFunc, dynamicStyles.FAQBtn]}
              onPress={() => {
                navigation.navigate("FAQ");
              }}
              underlayColor={colorScheme === "dark" ? "#000" : "#f0f0f0"}
            >
              <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                <View style={dynamicStyles.iconAndFuncTypeBlock}>
                  <View style={dynamicStyles.iconBlock}>
                    <AntDesign
                      name="question"
                      size={32}
                      color="black"
                      style={dynamicStyles.icon}
                    />
                  </View>
                  <Text style={dynamicStyles.funcType}>FAQ</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color={colorScheme === "dark" ? "#fff": "black"}
                  style={dynamicStyles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[dynamicStyles.btnFunc, dynamicStyles.feedbackBtn]}
              onPress={() => {
                // navigation.navigate("FeedbackForApp");
                setModalAddFeedbackForApp(true);
              }}
              underlayColor={colorScheme === "dark" ? "#000" : "#f0f0f0"}
            >
              <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                <View style={dynamicStyles.iconAndFuncTypeBlock}>
                  <View style={dynamicStyles.iconBlock}>
                    <MaterialIcons
                      name="feedback"
                      size={32}
                      color="black"
                      style={dynamicStyles.icon}
                    />
                  </View>
                  <Text style={dynamicStyles.funcType}>Feedback for app</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color={colorScheme === "dark" ? "#fff": "black"}
                  style={dynamicStyles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[dynamicStyles.btnFunc, dynamicStyles.updateAppBtn]}
            >
              <View style={dynamicStyles.iconFuncTypeAndIconRightSideBlock}>
                <View style={dynamicStyles.iconAndFuncTypeBlock}>
                  <View style={dynamicStyles.iconBlock}>
                    <Entypo
                      name="cycle"
                      size={30}
                      color="black"
                      style={dynamicStyles.icon}
                    />
                  </View>
                  <Text style={dynamicStyles.funcType}>Update app</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color={colorScheme === "dark" ? "#fff": "black"}
                  style={dynamicStyles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={dynamicStyles.deactivateAccountBtn}>
              <View style={dynamicStyles.deactivateAccountBtnBlock}>
                <View style={dynamicStyles.iconBlockDeactivateAccount}>
                  <MaterialIcons
                    name="delete"
                    size={35}
                    color="red"
                    style={dynamicStyles.iconDeactivateAccount}
                  />
                </View>
                <Text style={dynamicStyles.funcTypeDeactivateAccount}>
                  Deactivate my account
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <ModalAddFeedbackForApp
          modalAddFeedbackForApp={modalAddFeedbackForApp}
          setModalAddFeedbackForApp={setModalAddFeedbackForApp}
        />
      </ScrollView>
    </View>
  );
};

export default Settings;


