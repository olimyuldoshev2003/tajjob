import StackNavigator from "@/navigators/stacks/StackNavigator";
import TabNavigator from "@/navigators/tabs/TabNavigator";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

function App() {
  useEffect(() => {
    // Set status bar background color (Android only)
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("black"); // Replace with your desired color
      StatusBar.setBarStyle("light-content");
    }

    // For iOS, we need a different approach
    if (Platform.OS === "ios") {
      // iOS doesn't support setBackgroundColor directly
      // You might need to use a different library or approach
    }
  }, []);

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default App;
