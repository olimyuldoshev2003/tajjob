import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import React, { use } from "react";
import News from "./News";
import Suggestions from "./Suggestions";
import { useColorScheme } from "react-native";

const Notifications = () => {
  const Tab = createMaterialTopTabNavigator();

  const colorScheme = useColorScheme();

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#000000",
            tabBarInactiveTintColor: "#7F7F7F",
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#121212" : "#FFFFFF",
            },
            tabBarIndicatorStyle: {
              backgroundColor: colorScheme === "dark" ? "#00c3ff" : "#2623D0",
            },

            tabBarLabelStyle: {
              fontSize: 21,
              fontWeight: "500",
              color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
            },
          }}
        >
          <Tab.Screen name="Suggestions" component={Suggestions} />
          <Tab.Screen name="News" component={News} />
        </Tab.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default Notifications;

{
  /* const styles = StyleSheet.create({}); */
}
