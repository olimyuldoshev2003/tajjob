import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Settings = () => {
  return (
    <View style={styles.settingsComponent}>
      <View style={styles.settingsComponentBlock}>
        <View style={styles.appearanceSection}>
          <Text style={styles.titleOfAppearanceAndHelpSections}>
            Appearance
          </Text>
        </View>
        <View style={styles.helpSection}>
          <Text style={styles.titleOfAppearanceAndHelpSections}>Help</Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  settingsComponentBlock: {},
  appearanceSection: {},
  helpSection: {},
  titleOfAppearanceAndHelpSections: {},
});
