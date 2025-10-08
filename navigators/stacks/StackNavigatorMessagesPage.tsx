import Messages from "@/screens/application/Messages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

const StackNavigatorMessagesPage = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default StackNavigatorMessagesPage;

const styles = StyleSheet.create({});
