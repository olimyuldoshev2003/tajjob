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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

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
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    systemColorScheme || "light"
  );

  const navigation:any = useNavigation()

  // Load saved theme on mount
  useEffect(() => {
    loadSavedTheme();
  }, []);

  // Update current theme when theme changes (for preview)
  useEffect(() => {
    updateCurrentThemeForPreview();
  }, [theme, systemColorScheme]);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("app-theme");
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);

        // Map theme to the new segmented control order: System, Light, Dark
        let newSelectedIndex = 0;
        if (parsedTheme.theme === "system") {
          newSelectedIndex = 0;
        } else if (parsedTheme.theme === "light") {
          newSelectedIndex = 1;
        } else if (parsedTheme.theme === "dark") {
          newSelectedIndex = 2;
        }

        setTheme(parsedTheme.theme || "system");
        setSelectedIndex(newSelectedIndex);

        // Determine current theme based on saved preference
        let activeTheme: "light" | "dark" = "light";
        if (parsedTheme.theme === "system") {
          activeTheme = systemColorScheme || "light";
        } else if (parsedTheme.theme === "dark") {
          activeTheme = "dark";
        } else {
          activeTheme = "light";
        }

        setCurrentTheme(activeTheme);

        // Update global theme and Appearance
        updateAppearance(activeTheme);
        notifyThemeChange(activeTheme);
      } else {
        // Default to system theme
        const systemTheme = systemColorScheme || "light";
        setTheme("system");
        setCurrentTheme(systemTheme);
        setSelectedIndex(0); // System is first (index 0)

        // Update global theme and Appearance
        updateAppearance(systemTheme);
        notifyThemeChange(systemTheme);
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  // Update current theme for preview (when user selects from segmented control)
  const updateCurrentThemeForPreview = () => {
    let activeTheme: "light" | "dark" = "light";

    if (theme === "system") {
      activeTheme = systemColorScheme || "light";
    } else if (theme === "dark") {
      activeTheme = "dark";
    } else {
      activeTheme = "light";
    }

    setCurrentTheme(activeTheme);
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
    return themeColors[currentTheme];
  };

  const colors = getActiveColors();

  console.log(colors);
  

  // Handle theme selection change
  const handleThemeChange = (index: number) => {
    setSelectedIndex(index);
    let newTheme: "light" | "dark" | "system" = "system";

    if (index === 0) {
      // System (first option)
      newTheme = "system";
    } else if (index === 1) {
      // Light (second option)
      newTheme = "light";
    } else if (index === 2) {
      // Dark (third option)
      newTheme = "dark";
    }

    setTheme(newTheme);
  };

  // Apply the selected theme
  const applyTheme = async () => {
    // Determine the actual theme to apply
    let themeToApply: "light" | "dark" = "light";

    if (theme === "system") {
      themeToApply = systemColorScheme || "light";
    } else if (theme === "dark") {
      themeToApply = "dark";
    } else {
      themeToApply = "light";
    }

    // Update current theme state
    setCurrentTheme(themeToApply);

    // Save to AsyncStorage
    const themeData = {
      theme,
      currentTheme: themeToApply,
      selectedIndex,
    };

    try {
      await AsyncStorage.setItem("app-theme", JSON.stringify(themeData));

      // Update global theme and Appearance IMMEDIATELY
      updateAppearance(themeToApply);
      notifyThemeChange(themeToApply);

      let themeMessage = "";
      if (theme === "system") {
        themeMessage = `System Default (${
          themeToApply === "light" ? "Light" : "Dark"
        } Mode)`;
      } else {
        themeMessage = `${themeToApply === "light" ? "Light" : "Dark"} Mode`;
      }

      alert(`Theme applied: ${themeMessage}`);
      navigation.goBack()
    } catch (error) {
      console.log("Error saving theme:", error);
      alert("Error saving theme");
    }
  };

  // Get image source based on theme
  const getImageSource = (imageNumber: number) => {
    if (currentTheme === "dark") {
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
            values={["System", "Light", "Dark"]} // Changed order: System first
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
          Current:{" "}
          {theme === "system"
            ? `System Default (${currentTheme === "dark" ? "Dark" : "Light"})`
            : currentTheme === "dark"
            ? "Dark Mode"
            : "Light Mode"}
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
          This will change the theme for the entire application.
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
