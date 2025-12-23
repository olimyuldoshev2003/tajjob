import Message from "@/screens/application/Message";
import Messages from "@/screens/application/Messages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

const StackNavigatorMessagesPage = () => {
  const Stack = createNativeStackNavigator();
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        headerTitleStyle: {
          color: colorScheme === "dark" ? "#fff" : "#000",
        },
      }}
    >
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigatorMessagesPage;

const styles = StyleSheet.create({});
