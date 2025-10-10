import History from "@/screens/application/History";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

const StackNavigatorHistoryPage = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};

export default StackNavigatorHistoryPage;

const styles = StyleSheet.create({});
