import IntroductionFirst from "@/screens/intorduction/IntroductionFirst";
import IntroductionMain from "@/screens/intorduction/IntroductionMain";
import IntroductionSecond from "@/screens/intorduction/IntroductionSecond";
import IntroductionThird from "@/screens/intorduction/IntroductionThird";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StackNavigator = () => {

    const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="IntroductionMain" component={IntroductionMain} />
        <Stack.Screen name="IntroductionFirst" component={IntroductionFirst} />
        <Stack.Screen name="IntroductionSecond" component={IntroductionSecond} />
        <Stack.Screen name="IntroductionThird" component={IntroductionThird} />
        {/* <Stack.Screen name="Home" component={TabNavigator} /> */}
      </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
