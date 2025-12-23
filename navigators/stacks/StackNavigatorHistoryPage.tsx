import History from "@/screens/application/History";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

const StackNavigatorHistoryPage = () => {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};

export default StackNavigatorHistoryPage;

const styles = StyleSheet.create({});
