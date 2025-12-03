import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const AboutApp = () => {
  return (
    <View style={styles.aboutAppComponent}>
      <View style={styles.aboutAppComponentBlock}>
        <View style={styles.aboutAppComponentBlockHeader}>
          <Pressable style={styles.closeOrBackBtn}>
            <FontAwesome name="close" size={41} color="black" />
          </Pressable>
        </View>
        <View style={styles.aboutAppComponentBlockSection}>
          <Image
            source={require("../../assets/tajjob/introduction/tajjobLogo.jpg")}
            style={styles.tajjobLogo}
          />
          <Text style={styles.about}>
            TajJob is an innovative platform designed for job seekers and
            employers, created specifically for Tajikistan and the global
            market. The app allows anyone to easily find the right job or the
            right employee with just a few steps. The main goal of TajJob is to
            simplify the process of searching and offering jobs. Employers can
            post vacancies, while job seekers can quickly find opportunities
            using advanced filters such as categories, skills, salary range, and
            work type (full-time, part-time, or freelance).
          </Text>
        </View>
        <View style={styles.aboutAppComponentBlockFooter}></View>
      </View>
    </View>
  );
};

export default AboutApp;

const styles = StyleSheet.create({
  aboutAppComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  aboutAppComponentBlock: {
    padding: 12,
  },
  aboutAppComponentBlockHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  closeOrBackBtn: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 50,
  },
  aboutAppComponentBlockSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  tajjobLogo: {
    width: 230,
    height: 230,
  },
    about: {
        fontSize: 26,
        fontWeight: "400",
        
  },
  aboutAppComponentBlockFooter: {},
});
