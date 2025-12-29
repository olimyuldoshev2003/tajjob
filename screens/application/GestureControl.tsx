import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";

const GestureControl = () => {
  const colorScheme = useColorScheme();

  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);
  const [messageEnabled, setMessageEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [callingEnabled, setCallingEnabled] = useState(false);

  // Switch colors for light and dark mode with better contrast
  const switchColors = {
    light: {
      thumb: "#f4f3f4",
      trackTrue: "#2623D2",
      trackFalse: "#767577",
      ios_background: "#E0E0E0",
    },
    dark: {
      thumb: "#FFFFFF",
      trackTrue: "#4A47FF", // Brighter blue for dark mode
      trackFalse: "#555555", // Darker gray for better contrast
      ios_background: "#3A3A3A",
    },
  };

  const colors =
    colorScheme === "dark" ? switchColors.dark : switchColors.light;

  const dynamicStyles = StyleSheet.create({
    gestureControlComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
    },
    gestureControlComponentBlock: {
      padding: 20,
    },
    gestureControls: {
      gap: 17,
    },
    acceptAdvertisingFunc: {},

    // Styles with the same properties for buttons
    gestureControlButtonGestureControlFunc: {},
    iconGestureControlNameAndSwitchBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconAndGestureControlNameBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    iconBlock: {
      backgroundColor: colorScheme === "dark" ? "#2A2A2A" : "#D9D9D9",
      padding: 10,
      borderRadius: 50,
    },
    icon: {},
    gestureControlName: {
      fontSize: 21,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },
    switchOnAndSwitchOffGestureControlSwitcher: {},
  });

  return (
    <View style={dynamicStyles.gestureControlComponent}>
      <View style={dynamicStyles.gestureControlComponentBlock}>
        <View style={dynamicStyles.gestureControls}>
          {/* Gesture Control Functionality 1 */}
          <TouchableHighlight
            style={[
              dynamicStyles.acceptAdvertisingFunc,
              dynamicStyles.gestureControlButtonGestureControlFunc,
            ]}
            underlayColor={colorScheme === "dark" ? "#2A2A2A" : "#F5F5F5"}
            activeOpacity={0.7}
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <Ionicons
                    name="megaphone-outline"
                    size={29}
                    color={colorScheme === "dark" ? "#FFFFFF" : "black"}
                    style={dynamicStyles.icon}
                  />
                </View>
                <Text style={dynamicStyles.gestureControlName}>
                  Accept advertising
                </Text>
              </View>
              <Switch
                style={dynamicStyles.switchOnAndSwitchOffGestureControlSwitcher}
                value={advertisingEnabled}
                onValueChange={(value) => setAdvertisingEnabled(value)}
                trackColor={{
                  false: colors.trackFalse,
                  true: colors.trackTrue,
                }}
                thumbColor={advertisingEnabled ? colors.thumb : colors.thumb}
                ios_backgroundColor={colors.ios_background}
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 2 */}
          <TouchableHighlight
            style={[
              dynamicStyles.acceptAdvertisingFunc,
              dynamicStyles.gestureControlButtonGestureControlFunc,
            ]}
            underlayColor={colorScheme === "dark" ? "#2A2A2A" : "#F5F5F5"}
            activeOpacity={0.7}
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <Entypo
                    name="chat"
                    size={29}
                    color={colorScheme === "dark" ? "#FFFFFF" : "black"}
                    style={dynamicStyles.icon}
                  />
                </View>
                <Text style={dynamicStyles.gestureControlName}>
                  Accept message
                </Text>
              </View>
              <Switch
                style={dynamicStyles.switchOnAndSwitchOffGestureControlSwitcher}
                value={messageEnabled}
                onValueChange={(value) => setMessageEnabled(value)}
                trackColor={{
                  false: colors.trackFalse,
                  true: colors.trackTrue,
                }}
                thumbColor={messageEnabled ? colors.thumb : colors.thumb}
                ios_backgroundColor={colors.ios_background}
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 3 */}
          <TouchableHighlight
            style={[
              dynamicStyles.acceptAdvertisingFunc,
              dynamicStyles.gestureControlButtonGestureControlFunc,
            ]}
            underlayColor={colorScheme === "dark" ? "#2A2A2A" : "#F5F5F5"}
            activeOpacity={0.7}
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <Ionicons
                    name="notifications-outline"
                    size={29}
                    color={colorScheme === "dark" ? "#FFFFFF" : "black"}
                    style={dynamicStyles.icon}
                  />
                </View>
                <Text style={dynamicStyles.gestureControlName}>
                  Accept notifications
                </Text>
              </View>
              <Switch
                style={dynamicStyles.switchOnAndSwitchOffGestureControlSwitcher}
                value={notificationsEnabled}
                onValueChange={(value) => setNotificationsEnabled(value)}
                trackColor={{
                  false: colors.trackFalse,
                  true: colors.trackTrue,
                }}
                thumbColor={notificationsEnabled ? colors.thumb : colors.thumb}
                ios_backgroundColor={colors.ios_background}
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 4 */}
          <TouchableHighlight
            style={[
              dynamicStyles.acceptAdvertisingFunc,
              dynamicStyles.gestureControlButtonGestureControlFunc,
            ]}
            underlayColor={colorScheme === "dark" ? "#2A2A2A" : "#F5F5F5"}
            activeOpacity={0.7}
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <FontAwesome6
                    name="phone-volume"
                    size={29}
                    color={colorScheme === "dark" ? "#FFFFFF" : "black"}
                    style={dynamicStyles.icon}
                  />
                </View>
                <Text style={dynamicStyles.gestureControlName}>
                  Accept calling
                </Text>
              </View>
              <Switch
                style={dynamicStyles.switchOnAndSwitchOffGestureControlSwitcher}
                value={callingEnabled}
                onValueChange={(value) => setCallingEnabled(value)}
                trackColor={{
                  false: colors.trackFalse,
                  true: colors.trackTrue,
                }}
                thumbColor={callingEnabled ? colors.thumb : colors.thumb}
                ios_backgroundColor={colors.ios_background}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default GestureControl;
