import History from "@/screens/application/History";
import Home from "@/screens/application/Home";
import Message from "@/screens/application/Message";
import Profile from "@/screens/application/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0184F0",
        tabBarInactiveTintColor: "#7F7F7F",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        headerShown: false,
        tabBarStyle: {
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Job",
          tabBarIcon({ size, color }) {
            return (
              <MaterialIcons name="business-center" size={27} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon({ size, color }) {
            return (
              <MaterialCommunityIcons
                name="message-processing"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon({ size, color }) {
            return <FontAwesome5 name="history" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon({ size, color }) {
            return <FontAwesome name="user" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
