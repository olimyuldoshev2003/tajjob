import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const AboutEmployer = ({ route }: { route: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.aboutEmployerComponent}>
      <View style={styles.aboutEmployerComponentBlock}></View>
      <Text style={styles.aboutEmployerText}>{route.params.aboutEmployer}</Text>
    </ScrollView>
  );
};

export default AboutEmployer;

const styles = StyleSheet.create({
  aboutEmployerComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  aboutEmployerComponentBlock: {},
  aboutEmployerText: {},
});
