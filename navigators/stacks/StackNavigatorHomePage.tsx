import Home from "@/screens/application/Home";
import Notifications from "@/screens/application/Notifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StackNavigatorHomePage = ({ openJobModal }: { openJobModal: any }) => {
  const Stack = createNativeStackNavigator();

  

  // Enhanced Home component with modal control
  const HomeWithModal = () => <Home onJobPress={openJobModal} />;

  return (
    <GestureHandlerRootView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
        <Stack.Screen
          name="Home"
          component={HomeWithModal}
          options={{
            animation: "slide_from_right",
          }}
          />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            
            headerShown: true,
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default StackNavigatorHomePage;

const styles = StyleSheet.create({});
