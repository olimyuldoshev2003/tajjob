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
      backgroundColor: "#D9D9D9",
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
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <Ionicons
                    name="megaphone-outline"
                    size={29}
                    color="black"
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
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 2 */}
          <TouchableHighlight
            style={[
              dynamicStyles.acceptAdvertisingFunc,
              dynamicStyles.gestureControlButtonGestureControlFunc,
            ]}
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <Entypo
                    name="chat"
                    size={29}
                    color="black"
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
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 3 */}
          <TouchableHighlight
            style={[
              dynamicStyles.acceptAdvertisingFunc,
              dynamicStyles.gestureControlButtonGestureControlFunc,
            ]}
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <Ionicons
                    name="notifications-outline"
                    size={29}
                    color="black"
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
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 4 */}
          <TouchableHighlight
            style={[
              dynamicStyles.acceptAdvertisingFunc,
              dynamicStyles.gestureControlButtonGestureControlFunc,
            ]}
          >
            <View style={dynamicStyles.iconGestureControlNameAndSwitchBlock}>
              <View style={dynamicStyles.iconAndGestureControlNameBlock}>
                <View style={dynamicStyles.iconBlock}>
                  <FontAwesome6
                    name="phone-volume"
                    size={29}
                    color="black"
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
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default GestureControl;
