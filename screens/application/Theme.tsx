import React from "react";
import { StyleSheet, View } from "react-native";

import SegmentedControl from "@react-native-segmented-control/segmented-control";

const Theme = () => {
  const [theme, setTheme] = React.useState("system");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <View style={styles.themeComponent}>
      <View style={styles.themeComponentBlock}>
        <View style={styles.themeChangeBtnBlock}>
          {/* <ToggleButton.Row value={theme} onValueChange={setTheme}>
            <ToggleButton value="system" icon="theme-light-dark" />
            <ToggleButton value="light" icon="white-balance-sunny" />
            <ToggleButton value="dark" icon="weather-night" />
          </ToggleButton.Row> */}
          <SegmentedControl
            style={styles.themeChangeBtn}
            values={["Systemic", "Light", "Dark"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        <View style={styles.sliderPreviewPagesInLightAndDarkBlock}></View>
      </View>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({
  themeComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  themeComponentBlock: {},
  themeChangeBtnBlock: {},
  themeChangeBtn: {
    marginTop: 30,
  },
  sliderPreviewPagesInLightAndDarkBlock: {},
});
