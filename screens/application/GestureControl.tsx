import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const GestureControl = () => {
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
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </View>
                <Text>Accept advertising</Text>
              </View>
              <Switch />
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
  gestureControlComponentBlock: {},
  gestureControls: {},
  acceptAdvertisingFunc: {},

  // Styles with the same properties for buttons
  gestureControlButtonGestureControlFunc: {},
  iconGestureControlNameAndSwitchBlock: {},
  iconAndGestureControlNameBlock: {},
  iconBlock: {},
  icon: {},
});
