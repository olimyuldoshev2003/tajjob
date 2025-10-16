import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const AboutJob = ({ route }: { route: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.aboutJobComponent}>
      <View style={styles.aboutJobComponentBlock}>
        <Text style={styles.aboutJobText}>{route.params.aboutJob}</Text>
      </View>
    </ScrollView>
  );
};

export default AboutJob;

const styles = StyleSheet.create({
  aboutJobComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  aboutJobComponentBlock: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  aboutJobText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
