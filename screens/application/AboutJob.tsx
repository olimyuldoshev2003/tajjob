import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const AboutJob = ({ route }: { route: any }) => {
  return (
    <View style={styles.aboutJobComponent}>
      <ScrollView
        style={styles.aboutJobComponentBlock}
        contentContainerStyle={styles.aboutJobComponentScrollViewBlock}
      >
        <Text style={styles.aboutJobText}>{route.params.aboutJob}</Text>
      </ScrollView>
    </View>
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
  aboutJobComponentScrollViewBlock: {},
  aboutJobText: {
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 30,
  },
});
