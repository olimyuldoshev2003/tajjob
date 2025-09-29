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
        // gestureEnabled: true,

      }}
    >
      <Stack.Screen name="IntroductionMain" component={IntroductionMain} />
      <Stack.Screen name="IntroductionFirst" component={IntroductionFirst} />
      <Stack.Screen name="IntroductionSecond" component={IntroductionSecond} />
      <Stack.Screen name="IntroductionThird" component={IntroductionThird} />
      <Stack.Screen name="SignInWith" component={SignInWith} />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {},
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      {/* <Stack.Screen name="Home" component={TabNavigator} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
