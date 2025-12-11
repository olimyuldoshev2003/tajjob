import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Appearance,
  useColorScheme,
} from "react-native";

import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Carousel from "pinar";

const Theme = () => {
  const systemColorScheme = useColorScheme(); // Gets system theme (light/dark)
  const [theme, setTheme] = useState<any>("light"); // Current selected theme
  const [selectedIndex, setSelectedIndex] = useState<any>(0); // Segmented control index
  const [currentTheme, setCurrentTheme] = useState<any>(systemColorScheme); // Active theme for display

  // Theme color palettes
  const themeColors = {
    light: {
      background: "#FFFFFF",
      text: "#000000",
      secondaryText: "#555555",
      card: "#F5F5F5",
      primary: "#2623D2",
      border: "#E0E0E0",
      btnText: "#FFFFFF",
    },
    dark: {
      background: "#121212",
      text: "#FFFFFF",
      secondaryText: "#AAAAAA",
      card: "#1E1E1E",
      primary: "#4A47FF",
      border: "#333333",
      btnText: "#FFFFFF",
    },
  };

  // Get active colors based on current theme
  const getActiveColors = () => {
    return themeColors[currentTheme === "dark" ? "dark" : "light"];
  };

  const colors = getActiveColors();

  // Handle theme selection change
  const handleThemeChange = (index:any) => {
    setSelectedIndex(index);
    const newTheme = index === 0 ? "light" : "dark";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  // Apply the selected theme
  const applyTheme = () => {
    // Here you would typically save to AsyncStorage or Context
    console.log("Theme applied:", theme);
    setCurrentTheme(theme);
    alert(`Theme applied: ${theme === "light" ? "Light Mode" : "Dark Mode"}`);
  };

  // Get image source based on theme
  const getImageSource = (imageNumber:number) => {
    if (currentTheme === "dark") {
      // Use dark mode images if available, otherwise use light mode images
      try {
        switch (imageNumber) {
          case 1:
            return require("../../assets/tajjob/profile/dark-mode-img-1.png");
          case 2:
            return require("../../assets/tajjob/profile/dark-mode-img-2.png");
          case 3:
            return require("../../assets/tajjob/profile/dark-mode-img-3.png");
          case 4:
            return require("../../assets/tajjob/profile/dark-mode-img-4.png");
          default:
            return require("../../assets/tajjob/profile/light-mode-img-1.png");
        }
      } catch (error) {
        // Fallback to light mode images if dark mode images don't exist
        switch (imageNumber) {
          case 1:
            return require("../../assets/tajjob/profile/light-mode-img-1.png");
          case 2:
            return require("../../assets/tajjob/profile/light-mode-img-2.png");
          case 3:
            return require("../../assets/tajjob/profile/light-mode-img-3.png");
          case 4:
            return require("../../assets/tajjob/profile/light-mode-img-4.png");
          default:
            return require("../../assets/tajjob/profile/light-mode-img-1.png");
        }
      }
    } else {
      // Light mode images
      switch (imageNumber) {
        case 1:
          return require("../../assets/tajjob/profile/light-mode-img-1.jpg");
        case 2:
          return require("../../assets/tajjob/profile/light-mode-img-2.jpg");
        case 3:
          return require("../../assets/tajjob/profile/light-mode-img-3.jpg");
        case 4:
          return require("../../assets/tajjob/profile/light-mode-img-4.jpg");
        default:
          return require("../../assets/tajjob/profile/light-mode-img-1.jpg");
      }
    }
  };

  // Dynamic styles based on current theme
  const dynamicStyles = StyleSheet.create({
    themeComponent: {
      flex: 1,
      backgroundColor: colors.background,
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
      backgroundColor: colors.card,
    },
    swiperContainer: {
      height: 400,
      backgroundColor: colors.card,
      borderRadius: 12,
      overflow: "hidden",
    },
    slide: {
      width: "100%",
      height: 400,
      backgroundColor: colors.card,
    },
    btnApplyBlock: {
      marginTop: 60,
      paddingHorizontal: 16,
    },
    btnApply: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 60,
    },
    btnTextApply: {
      textAlign: "center",
      color: colors.btnText,
      fontSize: 25,
      fontWeight: "700",
    },
    themeLabel: {
      fontSize: 16,
      color: colors.text,
      fontWeight: "600",
      marginBottom: 10,
      paddingHorizontal: 16,
    },
    currentThemeInfo: {
      fontSize: 14,
      color: colors.secondaryText,
      textAlign: "center",
      marginTop: 10,
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={dynamicStyles.themeComponent}>
      <View style={dynamicStyles.themeComponentBlock}>
        <Text style={dynamicStyles.themeLabel}>Select Theme</Text>

        <View style={dynamicStyles.themeChangeBtnBlock}>
          <SegmentedControl
            style={dynamicStyles.themeChangeBtn}
            values={["Light", "Dark"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              handleThemeChange(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{
              color: colors.secondaryText,
              fontSize: 16,
              fontWeight: "500",
            }}
            activeFontStyle={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "600",
            }}
            tintColor={colors.primary}
          />
        </View>

        <Text style={dynamicStyles.currentThemeInfo}>
          Current: {currentTheme === "dark" ? "Dark Mode" : "Light Mode"}
        </Text>

        <View style={styles.swiperPreviewPagesInLightAndDarkModeBlock}>
          <View style={dynamicStyles.swiperContainer}>
            <Carousel
              style={{}}
              showsControls={false}
              loop={false}
              dotStyle={{
                backgroundColor: colors.secondaryText,
                width: 8,
                height: 8,
                borderRadius: 4,
              }}
              activeDotStyle={{
                backgroundColor: colors.primary,
                width: 8,
                height: 8,
                borderRadius: 4,
              }}
            >
              <View style={dynamicStyles.slide}>
                <Image
                  source={getImageSource(1)}
                  style={styles.imgPreviewPageLightMode}
                />
              </View>
              <View style={dynamicStyles.slide}>
                <Image
                  source={getImageSource(2)}
                  style={styles.imgPreviewPageLightMode}
                />
              </View>
              <View style={dynamicStyles.slide}>
                <Image
                  source={getImageSource(3)}
                  style={styles.imgPreviewPageLightMode}
                />
              </View>
              <View style={dynamicStyles.slide}>
                <Image
                  source={getImageSource(4)}
                  style={styles.imgPreviewPageLightMode}
                />
              </View>
            </Carousel>
          </View>
        </View>

        <View style={dynamicStyles.btnApplyBlock}>
          <Pressable style={dynamicStyles.btnApply} onPress={applyTheme}>
            <Text style={dynamicStyles.btnTextApply}>Apply</Text>
          </Pressable>
        </View>

        <Text style={dynamicStyles.currentThemeInfo}>
          Preview will change based on selected theme. Tap "Apply" to confirm.
        </Text>
      </View>
    </View>
  );
};

export default Theme;

// Static styles that remain the same
const styles = StyleSheet.create({
  swiperPreviewPagesInLightAndDarkModeBlock: {
    marginTop: 24,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  imgPreviewPageLightMode: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
