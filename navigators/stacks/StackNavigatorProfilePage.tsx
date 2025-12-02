import EditUser from "@/screens/application/EditUser";
import GestureControl from "@/screens/application/GestureControl";
import Language from "@/screens/application/Language";
import Profile from "@/screens/application/Profile";
import Settings from "@/screens/application/Settings";
import Theme from "@/screens/application/Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Gesture } from "react-native-gesture-handler";

const StackNavigatorProfilePage = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} options={{}} />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{
          headerShown: true,
          title: "Personal Information",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{
          headerShown: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Theme"
        component={Theme}
        options={{
          headerShown: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="GestureControl"
        component={GestureControl}
        options={{
          headerShown: true,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigatorProfilePage;

const styles = StyleSheet.create({});
