import EditUser from "@/screens/application/EditUser";
import Profile from "@/screens/application/Profile";
import Settings from "@/screens/application/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

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
    </Stack.Navigator>
  );
};

export default StackNavigatorProfilePage;

const styles = StyleSheet.create({});
