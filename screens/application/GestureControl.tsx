import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const GestureControl = () => {
  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);
  const [messageEnabled, setMessageEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [callingEnabled, setCallingEnabled] = useState(false);

  return (
    <View style={styles.gestureControlComponent}>
      <View style={styles.gestureControlComponentBlock}>
        <View style={styles.gestureControls}>
          {/* Gesture Control Functionality 1 */}
          <TouchableHighlight
            style={[
              styles.acceptAdvertisingFunc,
              styles.gestureControlButtonGestureControlFunc,
            ]}
          >
            <View style={styles.iconGestureControlNameAndSwitchBlock}>
              <View style={styles.iconAndGestureControlNameBlock}>
                <View style={styles.iconBlock}>
                  <Ionicons
                    name="megaphone-outline"
                    size={29}
                    color="black"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.gestureControlName}>
                  Accept advertising
                </Text>
              </View>
              <Switch
                style={styles.switchOnAndSwitchOffGestureControlSwitcher}
                value={advertisingEnabled}
                onValueChange={(value) => setAdvertisingEnabled(value)}
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 2 */}
          <TouchableHighlight
            style={[
              styles.acceptAdvertisingFunc,
              styles.gestureControlButtonGestureControlFunc,
            ]}
          >
            <View style={styles.iconGestureControlNameAndSwitchBlock}>
              <View style={styles.iconAndGestureControlNameBlock}>
                <View style={styles.iconBlock}>
                  <Entypo
                    name="chat"
                    size={29}
                    color="black"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.gestureControlName}>Accept message</Text>
              </View>
              <Switch
                style={styles.switchOnAndSwitchOffGestureControlSwitcher}
                value={messageEnabled}
                onValueChange={(value) => setMessageEnabled(value)}
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 3 */}
          <TouchableHighlight
            style={[
              styles.acceptAdvertisingFunc,
              styles.gestureControlButtonGestureControlFunc,
            ]}
          >
            <View style={styles.iconGestureControlNameAndSwitchBlock}>
              <View style={styles.iconAndGestureControlNameBlock}>
                <View style={styles.iconBlock}>
                  <Ionicons
                    name="notifications-outline"
                    size={29}
                    color="black"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.gestureControlName}>
                  Accept notifications
                </Text>
              </View>
              <Switch
                style={styles.switchOnAndSwitchOffGestureControlSwitcher}
                value={notificationsEnabled}
                onValueChange={(value) => setNotificationsEnabled(value)}
              />
            </View>
          </TouchableHighlight>

          {/* Gesture Control Functionality 4 */}
          <TouchableHighlight
            style={[
              styles.acceptAdvertisingFunc,
              styles.gestureControlButtonGestureControlFunc,
            ]}
          >
            <View style={styles.iconGestureControlNameAndSwitchBlock}>
              <View style={styles.iconAndGestureControlNameBlock}>
                <View style={styles.iconBlock}>
                  <FontAwesome6
                    name="phone-volume"
                    size={29}
                    color="black"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.gestureControlName}>Accept calling</Text>
              </View>
              <Switch
                style={styles.switchOnAndSwitchOffGestureControlSwitcher}
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

const styles = StyleSheet.create({
  gestureControlComponent: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  switchOnAndSwitchOffGestureControlSwitcher: {},
});
