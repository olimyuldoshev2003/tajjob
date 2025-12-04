import {
  AntDesign,
  Entypo,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const Settings = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.settingsComponent}>
      <ScrollView
        contentContainerStyle={styles.settingsComponentBlockScrollView}
        style={styles.settingsComponentBlock}
      >
        <View
          style={[styles.appearanceSection, styles.appearanceAndHelpSection]}
        >
          <Text style={styles.titleOfAppearanceAndHelpSections}>
            Appearance
          </Text>
          <View
            style={[
              styles.appearanceFunctionalitiesBlock,
              styles.appearanceAndHelpFunctionalitiesBlock,
            ]}
          >
            <TouchableHighlight
              style={[styles.btnFuncShownType, styles.languageBtn]}
              underlayColor="#f0f0f0"
              onPress={() => {
                navigation.navigate("Language");
              }}
            >
              <View
                style={
                  styles.iconFuncTypeShownSelectedFuncAndIconRightSideBlock
                }
              >
                <View style={styles.iconFuncTypeShownSelectedFuncBlock}>
                  <View style={styles.iconAndFuncTypeBlock}>
                    <View style={styles.iconBlock}>
                      <Fontisto
                        name="world-o"
                        size={32}
                        color="black"
                        style={styles.icon}
                      />
                    </View>
                    <Text style={styles.funcType}>Language</Text>
                  </View>
                  <Text style={styles.selectedFunc}>English</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color="black"
                  style={styles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.btnFuncShownType, styles.themeBtn]}
              underlayColor="#f0f0f0"
              onPress={() => {
                navigation.navigate("Theme");
              }}
            >
              <View
                style={
                  styles.iconFuncTypeShownSelectedFuncAndIconRightSideBlock
                }
              >
                <View style={styles.iconFuncTypeShownSelectedFuncBlock}>
                  <View style={styles.iconAndFuncTypeBlock}>
                    <View style={styles.iconBlock}>
                      <Ionicons
                        name="contrast"
                        size={32}
                        color="black"
                        style={styles.icon}
                      />
                    </View>
                    <Text style={styles.funcType}>Theme</Text>
                  </View>
                  <Text style={styles.selectedFunc}>Light</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color="black"
                  style={styles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.btnFunc, styles.gestureControlBtn]}
              onPress={() => {
                navigation.navigate("GestureControl");
              }}
              underlayColor="#f0f0f0"
            >
              <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                <View style={styles.iconAndFuncTypeBlock}>
                  <View style={styles.iconBlock}>
                    <MaterialCommunityIcons
                      name="cellphone-sound"
                      size={32}
                      color="black"
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.funcType}>Gesture control</Text>
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
        <View style={[styles.helpSection, styles.appearanceAndHelpSection]}>
          <Text style={styles.titleOfAppearanceAndHelpSections}>Help</Text>
          <View
            style={[
              styles.helpFunctionalitiesBlock,
              styles.appearanceAndHelpFunctionalitiesBlock,
            ]}
          >
            <TouchableHighlight
              style={[styles.btnFunc, styles.aboutAppBtn]}
              onPress={() => {
                navigation.navigate("AboutApp");
              }}
              underlayColor="#f0f0f0"
            >
              <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                <View style={styles.iconAndFuncTypeBlock}>
                  <View style={styles.iconBlock}>
                    <Entypo
                      name="info"
                      size={32}
                      color="black"
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.funcType}>About the app</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color="black"
                  style={styles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.btnFunc, styles.FAQBtn]}
              onPress={() => {
                navigation.navigate("FAQ");
              }}  
              underlayColor="#f0f0f0"
            >
              <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                <View style={styles.iconAndFuncTypeBlock}>
                  <View style={styles.iconBlock}>
                    <AntDesign
                      name="question"
                      size={32}
                      color="black"
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.funcType}>FAQ</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color="black"
                  style={styles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.btnFunc, styles.feedbackBtn]}>
              <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                <View style={styles.iconAndFuncTypeBlock}>
                  <View style={styles.iconBlock}>
                    <MaterialIcons
                      name="feedback"
                      size={32}
                      color="black"
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.funcType}>Feedback for app</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color="black"
                  style={styles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.btnFunc, styles.updateAppBtn]}>
              <View style={styles.iconFuncTypeAndIconRightSideBlock}>
                <View style={styles.iconAndFuncTypeBlock}>
                  <View style={styles.iconBlock}>
                    <Entypo
                      name="cycle"
                      size={30}
                      color="black"
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.funcType}>Update app</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={37}
                  color="black"
                  style={styles.rightSideIcon}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.deactivateAccountBtn}>
              <View style={styles.deactivateAccountBtnBlock}>
                <View style={styles.iconBlockDeactivateAccount}>
                  <MaterialIcons
                    name="delete"
                    size={35}
                    color="red"
                    style={styles.iconDeactivateAccount}
                  />
                </View>
                <Text style={styles.funcTypeDeactivateAccount}>
                  Deactivate my account
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsComponent: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
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
    color: "#6E6E73",
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
  },
  selectedFunc: {
    fontSize: 18,
    fontWeight: "400",
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
