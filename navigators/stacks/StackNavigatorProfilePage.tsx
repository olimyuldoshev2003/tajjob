import AboutApp from "@/screens/application/AboutApp";
import EditUser from "@/screens/application/EditUser";
import FAQ from "@/screens/application/FAQ";
import FeedbackForApp from "@/screens/application/FeedbackForApp";
import GestureControl from "@/screens/application/GestureControl";
import Language from "@/screens/application/Language";
import Profile from "@/screens/application/Profile";
import SavedJobs from "@/screens/application/SavedJobs";
import Settings from "@/screens/application/Settings";
import Theme from "@/screens/application/Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Gesture } from "react-native-gesture-handler";
interface StackNavigatorProfilePageProps {
  openJobModal: (job: any) => void;
}
const StackNavigatorProfilePage = ({
  openJobModal,
}: StackNavigatorProfilePageProps) => {
  const Stack = createNativeStackNavigator();
  
  const colorScheme = useColorScheme();

  const SavedJobsWithModal = () => <SavedJobs onJobPress={openJobModal} />;


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
            backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
          headerShadowVisible: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="SavedJobs"
        component={SavedJobsWithModal}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Theme"
        component={Theme}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="GestureControl"
        component={GestureControl}
        options={{
          headerShown: true,
          title: "Gesture control",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="AboutApp"
        component={AboutApp}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="FeedbackForApp"
        component={FeedbackForApp}
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
