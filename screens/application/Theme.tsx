import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Carousel from "pinar";

const Theme = () => {
  const [theme, setTheme] = React.useState("system");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const colors = ["tomato", "thistle", "skyblue", "teal"];

  return (
    <View style={styles.themeComponent}>
      <View style={styles.themeComponentBlock}>
        <View style={styles.themeChangeBtnBlock}>
          <SegmentedControl
            style={styles.themeChangeBtn}
            values={["Systemic", "Light", "Dark"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{
              color: "#555555",
              fontSize: 16,
              fontWeight: "500",
            }}
            activeFontStyle={{
              color: "#000",
              fontSize: 16,
              fontWeight: "600",
            }}
          />
        </View>

        <View style={styles.swiperPreviewPagesInLightAndDarkModeBlock}>
          <View style={styles.swiperContainer}>
            <Carousel style={{}} showsControls={false}>
              <View style={[styles.slide, styles.slide1]}>
                <Image source={require("../../assets/tajjob/profile/light-mode-img-1.jpg")} style={styles.imgPreviewPageLightMode} />
              </View>
              <View style={[styles.slide, styles.slide2]}>
                <Image source={require("../../assets/tajjob/profile/light-mode-img-2.jpg")} style={styles.imgPreviewPageLightMode} />
              </View>
              <View style={[styles.slide, styles.slide3]}>
                <Image source={require("../../assets/tajjob/profile/light-mode-img-3.jpg")} style={styles.imgPreviewPageLightMode} />
              </View>
              <View style={[styles.slide, styles.slide3]}>
                <Image source={require("../../assets/tajjob/profile/light-mode-img-4.jpg")} style={styles.imgPreviewPageLightMode} />
              </View>
            </Carousel>
          </View>
        </View>

        <View style={styles.btnApplyBlock}>
          <Pressable style={styles.btnApply}>
            <Text style={styles.btnTextApply}>Apply</Text>
          </Pressable>
        </View>
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
  themeComponentBlock: {
    flex: 1,
    marginTop: 15,
  },
  themeChangeBtnBlock: {
    paddingHorizontal: 16,
  },
  themeChangeBtn: {
    height: 44,
    borderRadius: 8,
  },

  // SWIPER - FIXED
  swiperPreviewPagesInLightAndDarkModeBlock: {
    marginTop: 24,
    justifyContent: "center",
  },
  swiperContainer: {
    height: 400,
    // backgroundColor: "#f0f0f0", // Visual debug
    paddingHorizontal: 40,
  },
  slide: {
    width: "100%",
    height: 400,
  },
  slide1: {
  },
  slide2: {
  },
  slide3: {
  },
  slideContent: {},
  imgPreviewPageLightMode: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  btnApplyBlock: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
  btnApply: {
    backgroundColor: "#2623D2",
    paddingVertical: 12,
    borderRadius: 60,
  },
  btnTextApply: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
  },
});
