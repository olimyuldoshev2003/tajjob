import React from "react";
import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";

const AboutJob = ({ route }: { route: any }) => {

  const colorScheme = useColorScheme()

    const dynamicStyles = StyleSheet.create({
      aboutJobComponent: {
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      },
      aboutJobComponentBlock: {
        paddingVertical: 12,
        paddingHorizontal: 10,
      },
      aboutJobComponentScrollViewBlock: {},
      aboutJobText: {
        fontSize: 18,
        fontWeight: "500",
        paddingBottom: 30,
        color: colorScheme === "dark" ? "#fff" : "#000",
      },
    });
  return (
    <View style={dynamicStyles.aboutJobComponent}>
      <ScrollView
        style={dynamicStyles.aboutJobComponentBlock}
        contentContainerStyle={dynamicStyles.aboutJobComponentScrollViewBlock}
      >
        <Text style={dynamicStyles.aboutJobText}>{route.params.aboutJob}</Text>
      </ScrollView>
    </View>
  );
};

export default AboutJob;


