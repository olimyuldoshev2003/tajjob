import ChangePassword from "@/screens/auth/ChangePassword";
import ForgetPassword from "@/screens/auth/ForgetPassword";
import SignIn from "@/screens/auth/SignIn";
import SignInWith from "@/screens/auth/SignInWith";
import SignUp from "@/screens/auth/SignUp";
import IntroductionFirst from "@/screens/intorduction/IntroductionFirst";
import IntroductionMain from "@/screens/intorduction/IntroductionMain";
import IntroductionSecond from "@/screens/intorduction/IntroductionSecond";
import IntroductionThird from "@/screens/intorduction/IntroductionThird";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="IntroductionMain"
        component={IntroductionMain}
        options={{
          animation: "fade", 
        }}
      />
      <Stack.Screen
        name="IntroductionFirst"
        component={IntroductionFirst}
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="IntroductionSecond"
        component={IntroductionSecond}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="IntroductionThird"
        component={IntroductionThird}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="SignInWith"
        component={SignInWith}
        options={{
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          // headerShown: true,
          headerTitle: "",
          animation: "ios_from_right",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          // headerShown: true,
          headerTitle: "",
          animation: "ios_from_left",
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          // headerShown: true,
          headerTitle: "",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          // headerShown: true,
          headerTitle: "",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
