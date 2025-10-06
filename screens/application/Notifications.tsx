import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import React from "react";
import News from "./News";
import Suggestions from "./Suggestions";

const Notifications = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#000000",
            tabBarInactiveTintColor: "#7F7F7F",
            tabBarLabelStyle: {
              fontSize: 21,
              fontWeight: "500",
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
