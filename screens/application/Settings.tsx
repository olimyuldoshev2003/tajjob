import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const Settings = () => {
  return (
    <View style={styles.settingsComponent}>
      <View style={styles.settingsComponentBlock}>
        <View style={styles.appearanceSection}>
          <Text style={styles.titleOfAppearanceAndHelpSections}>
            Appearance
          </Text>
          <View style={styles.appearanceFunctionalitiesBlock}>
            <TouchableHighlight
              style={[styles.btnFuncShownType, styles.languageBtn]}
            ></TouchableHighlight>
            {/* <TouchableHighlight
              style={[styles.btnFuncShownType, styles.themeBtn]}
            ></TouchableHighlight> */}
            <TouchableHighlight
              style={[styles.btnFunc, styles.gestureControlBtn]}
            >
              <View style={styles.iconFuncTypeSelecttAndIconRightSideBlock}></View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.helpSection}>
          <Text style={styles.titleOfAppearanceAndHelpSections}>Help</Text>
          <View style={styles.helpFunctionalitiesBlock}>
            {/* <TouchableHighlight
              style={[styles.btnFunc, styles.aboutAppBtn]}
            ></TouchableHighlight>
            <TouchableHighlight
              style={[styles.btnFunc, styles.FAQBtn]}
            ></TouchableHighlight>
            <TouchableHighlight
              style={[styles.btnFunc, styles.feedbackBtn]}
            ></TouchableHighlight>
            <TouchableHighlight
              style={[styles.btnFunc, styles.updateAppBtn]}
            ></TouchableHighlight> */}
            <TouchableHighlight
              style={styles.deactivateAccountBtn}
            ></TouchableHighlight>
          </View>
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

  // Styles with the same properties grouped together
  titleOfAppearanceAndHelpSections: {},
  btnFuncShownType: {},
  btnFunc: {},
  iconFuncTypeSelecttAndIconRightSideBlock: {},
});
