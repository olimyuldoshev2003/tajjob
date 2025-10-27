import Home from "@/screens/application/Home";
import Job from "@/screens/application/Job";
import Notifications from "@/screens/application/Notifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Define the type for the props
interface StackNavigatorHomePageProps {
  openJobModal: (job: any) => void;
}

const StackNavigatorHomePage = ({
  openJobModal,
}: StackNavigatorHomePageProps) => {
  const Stack = createNativeStackNavigator();

  // Enhanced Home component with modal control
  const HomeWithModal = () => <Home onJobPress={openJobModal} />;

  // Enhanced Job component that can receive params
  const JobWithParams = ({ route }: { route: any }) => <Job route={route} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <Stack.Screen
          name="Job"
          component={JobWithParams}
          options={{
            animation: "fade_from_bottom",
          }}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default StackNavigatorHomePage;

const styles = StyleSheet.create({});
