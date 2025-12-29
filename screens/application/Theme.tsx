import React, { useEffect, useState } from "react";
import {
  Appearance,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useNavigation } from "expo-router";
import Carousel from "pinar";

// Create a global theme manager that doesn't require context
let currentGlobalTheme: "light" | "dark" = "light";
let themeListeners: Array<(theme: "light" | "dark") => void> = [];

// Function to update all listeners when theme changes
const notifyThemeChange = (theme: "light" | "dark") => {
  currentGlobalTheme = theme;
  themeListeners.forEach((listener) => listener(theme));
};

// Function to subscribe to theme changes from any component
export const subscribeToTheme = (
  callback: (theme: "light" | "dark") => void
) => {
  themeListeners.push(callback);
  return () => {
    themeListeners = themeListeners.filter((listener) => listener !== callback);
  };
};

// Get current global theme
export const getCurrentGlobalTheme = () => currentGlobalTheme;

const Theme = () => {
  const systemColorScheme = useColorScheme(); // Gets system theme (light/dark)
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation: any = useNavigation();

  // Load saved theme on mount
  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("app-theme");
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);

        // Set theme and selected index
        const savedThemeValue = parsedTheme.theme || "light";
        setTheme(savedThemeValue);
        setSelectedIndex(savedThemeValue === "dark" ? 1 : 0);

        // Update global theme and Appearance
        updateAppearance(savedThemeValue);
        notifyThemeChange(savedThemeValue);
      } else {
        // Default to light theme
        setTheme("light");
        setSelectedIndex(0);

        // Update global theme and Appearance
        updateAppearance("light");
        notifyThemeChange("light");
      }
    } catch (error) {
      console.log("Error loading theme:", error);
      // Set default values on error
      setTheme("light");
      setSelectedIndex(0);
      updateAppearance("light");
      notifyThemeChange("light");
    }
  };

  const updateAppearance = (themeToApply: "light" | "dark") => {
    // This will force Appearance changes across the whole app
    if (themeToApply === "dark") {
      // Force dark mode on the entire app
      Appearance.setColorScheme("dark");
    } else {
      // Force light mode on the entire app
      Appearance.setColorScheme("light");
    }
  };

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
    return themeColors[theme];
  };

  const colors = getActiveColors();

  // Handle theme selection change
  const handleThemeChange = (index: number) => {
    setSelectedIndex(index);
    const newTheme = index === 0 ? "light" : "dark";
    setTheme(newTheme);
  };

  // Apply the selected theme
  const applyTheme = async () => {
    // Update current theme state
    setTheme(theme);

    // Save to AsyncStorage
    const themeData = {
      theme,
      selectedIndex,
    };

    try {
      await AsyncStorage.setItem("app-theme", JSON.stringify(themeData));

      // Update global theme and Appearance IMMEDIATELY
      updateAppearance(theme);
      notifyThemeChange(theme);

      const themeMessage = `${theme === "light" ? "Light" : "Dark"} Mode`;
      alert(`Theme applied: ${themeMessage}`);

      // Go back to previous screen
      navigation.goBack();
    } catch (error) {
      console.log("Error saving theme:", error);
      alert("Error saving theme");
    }
  };

  // Get image source based on theme
  const getImageSource = (imageNumber: number) => {
    if (theme === "dark") {
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
            return require("../../assets/tajjob/profile/dark-mode-img-1.png");
        }
      } catch (error) {
        // Fallback to light mode images if dark mode images aren't found
        return getLightImageSource(imageNumber);
      }
    } else {
      return getLightImageSource(imageNumber);
    }
  };

  // Helper function for light mode images
  const getLightImageSource = (imageNumber: number) => {
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
      // backgroundColor: colors.card,
      borderRadius: 12,
      overflow: "hidden",
    },
    slide: {
      width: "100%",
      height: 400,
      // backgroundColor: colors.card,
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
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
            }}
            tintColor={colors.primary}
          />
        </View>

        <Text style={dynamicStyles.currentThemeInfo}>
          Current: {theme === "dark" ? "Dark Mode" : "Light Mode"}
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
                borderRadius: 50,
              }}
              activeDotStyle={{
                backgroundColor: colors.primary,
                width: 8,
                height: 8,
                borderRadius: 50,
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

        {/* <Text style={dynamicStyles.currentThemeInfo}>
          This will change the theme for the entire application.
        </Text> */}
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
