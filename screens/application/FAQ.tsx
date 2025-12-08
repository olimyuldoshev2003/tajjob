import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const FAQ = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.FAQComponent}>
      <View style={styles.FAQComponentBlock}>
        <View style={styles.FAQComponentHeader}>
          <Text style={styles.titleOfInfoLinks}>
            Didn’t find the answer you were looking for? Contact our support
            center!
          </Text>
          <View style={styles.infoLinkBlock}>
            <TouchableHighlight
              style={[styles.linkBtn, styles.goToWebsiteBtn]}
              onPress={() => {}}
              underlayColor="#f0f0f0"
            >
              <View style={styles.iconAndLinkName}>
                <Ionicons
                  name="globe-outline"
                  size={29}
                  color="#A2A2A2"
                  style={styles.iconOfLink}
                />
                <Text style={styles.linkName}>Go to Website</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.linkBtn, styles.emailBtn]}
              onPress={() => {}}
              underlayColor="#f0f0f0"
            >
              <View style={styles.iconAndLinkName}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={29}
                  color="#A2A2A2"
                  style={styles.iconOfLink}
                />
                <Text style={styles.linkName}>Email Us</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.linkBtn, styles.termsOfServiceBtn]}
              onPress={() => {}}
              underlayColor="#f0f0f0"
            >
              <View style={styles.iconAndLinkName}>
                <FontAwesome
                  name="file-text-o"
                  size={29}
                  color="#A2A2A2"
                  style={styles.iconOfLink}
                />
                <Text style={styles.linkName}>Terms of Service</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.FAQComponentSection}></View>
      </View>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  FAQComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  FAQComponentBlock: {
    padding: 10,
  },
  FAQComponentHeader: {},
  titleOfInfoLinks: {
    color: "#969695",
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
  },
  //////////////////////////////

  FAQComponentSection: {},
});
