import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";

const FAQ = () => {
  const Tab = createMaterialTopTabNavigator();

  const colorScheme = useColorScheme();

  const dynamicStyles = StyleSheet.create({
    FAQComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212":"#fff",
    },
    FAQComponentBlock: {
      padding: 10,
    },
    FAQComponentHeader: {},
    titleOfInfoLinks: {
      color: colorScheme === "dark" ?"#fff" :"#969695",
      fontSize: 17,
      fontWeight: "300",
    },
    infoLinkBlock: {
      marginTop: 14,
    },
    goToWebsiteBtn: {},
    emailBtn: {},
    termsOfServiceBtn: {},

    // Styles with the same names
    //////////////////////////////
    linkBtn: {
      borderBottomWidth: 1,
      borderBottomColor: "#A2A2A2",
      paddingVertical: 12,
    },
    iconAndLinkName: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 10,
    },
    iconOfLink: {},
    linkName: {
      fontSize: 21,
      fontWeight: "500",
      color: colorScheme === "dark" ?"#fff" :"#000",
    },
    //////////////////////////////

    FAQComponentSection: {},
  });

  return (
    <View style={dynamicStyles.FAQComponent}>
      <View style={dynamicStyles.FAQComponentBlock}>
        <View style={dynamicStyles.FAQComponentHeader}>
          <Text style={dynamicStyles.titleOfInfoLinks}>
            Didn’t find the answer you were looking for? Contact our support
            center!
          </Text>
          <View style={dynamicStyles.infoLinkBlock}>
            <TouchableHighlight
              style={[dynamicStyles.linkBtn, dynamicStyles.goToWebsiteBtn]}
              onPress={() => {}}
              underlayColor={colorScheme === "dark" ? "#000":"#f0f0f0"}
            >
              <View style={dynamicStyles.iconAndLinkName}>
                <Ionicons
                  name="globe-outline"
                  size={29}
                  color="#A2A2A2"
                  style={dynamicStyles.iconOfLink}
                />
                <Text style={dynamicStyles.linkName}>Go to Website</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[dynamicStyles.linkBtn, dynamicStyles.emailBtn]}
              onPress={() => {}}
              underlayColor={colorScheme === "dark" ? "#000":"#f0f0f0"}
            >
              <View style={dynamicStyles.iconAndLinkName}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={29}
                  color="#A2A2A2"
                  style={dynamicStyles.iconOfLink}
                />
                <Text style={dynamicStyles.linkName}>Email Us</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[dynamicStyles.linkBtn, dynamicStyles.termsOfServiceBtn]}
              onPress={() => {}}
              underlayColor={colorScheme === "dark" ? "#000":"#f0f0f0"}
            >
              <View style={dynamicStyles.iconAndLinkName}>
                <FontAwesome
                  name="file-text-o"
                  size={29}
                  color="#A2A2A2"
                  style={dynamicStyles.iconOfLink}
                />
                <Text style={dynamicStyles.linkName}>Terms of Service</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={dynamicStyles.FAQComponentSection}></View>
      </View>
    </View>
  );
};

export default FAQ;
