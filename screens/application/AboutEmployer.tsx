import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const AboutEmployer = ({ route }: { route: any }) => {
  return (
    <View style={styles.aboutEmployerComponent}>
      <ScrollView
        style={styles.aboutEmployerComponentBlock}
        contentContainerStyle={styles.aboutEmployerComponentScrollViewBlock}
      >
        <Text style={styles.aboutEmployerText}>
          {route.params.aboutEmployer}
        </Text>
        <View style={styles.officesAndWorkersAmountBlock}>
          <View style={styles.officesAmountBlock}>
            <View style={styles.officesTextAndAmount}>
              <Text style={styles.officesText}>Offices</Text>
              <Text style={styles.officesAmount}>67</Text>
            </View>
          </View>
          <View style={styles.workersBlock}>
            <View style={styles.workersTextAndAmount}>

              <Text style={styles.workersText}>Workers</Text>
              <Text style={styles.workersAmount}>1100</Text>
            </View>
          </View>
        </View>
        <View style={styles.contactWithHRBlock}></View>
      </ScrollView>
    </View>
  );
};

export default AboutEmployer;

const styles = StyleSheet.create({
  aboutEmployerComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  aboutEmployerComponentBlock: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  aboutEmployerComponentScrollViewBlock: {},
  aboutEmployerText: {
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 30,
  },
  officesAndWorkersAmountBlock: {},
  officesAmountBlock: {},
  workersBlock: {},
  contactWithHRBlock: {},
});
