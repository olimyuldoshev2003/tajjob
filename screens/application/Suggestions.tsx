import React, { use } from "react";
import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Suggestions = () => {
  const colorScheme = useColorScheme();
  
  const dynamicStyles = StyleSheet.create({
    suggestionsComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
      paddingHorizontal: 16,
    },
    suggestions: {
      paddingHorizontal: 7,
      paddingBottom: 55,
    },
    suggestionsContainer: {},
    suggestionsSentDay: {
      textAlign: "center",
      color: colorScheme === "dark" ? "#fff" : "#9E9E9E",
      fontSize: 20,
      fontWeight: "500",
      marginTop: 10,
    },
    suggestionsBlockOfThisDay: {
      marginTop: 15,
      gap: 15,
    },
    suggestion: {
      borderRadius: 20,
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      // Shadow for iOS
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // Shadow for Android
      elevation: 5,
    },
    suggestionImg: {
      width: "100%",
      height: 95,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    suggestionTitleAndDescriptionBlock: {
      padding: 15,
      gap: 6,
    },
    suggestionTitle: {
      fontSize: 25,
      fontWeight: "700",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    suggestionDescription: {
      fontSize: 18,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    suggestionTime: {
      fontSize: 14,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#fff" : "#9E9E9E",
      textAlign: "right",
    },
  });
  return (
    <View style={dynamicStyles.suggestionsComponent}>
      <ScrollView
        contentContainerStyle={dynamicStyles.suggestions}
        showsVerticalScrollIndicator={false}
      >
        <View style={dynamicStyles.suggestionsContainer}>
          <Text style={dynamicStyles.suggestionsSentDay}>Yesterday</Text>
          {/* Suggestion 1 */}
          <View style={dynamicStyles.suggestionsBlockOfThisDay}>
            <View style={dynamicStyles.suggestion}>
              <Image
                source={require("../../assets/tajjob/notifications/alif-suggestion.jpg")}
                style={dynamicStyles.suggestionImg}
              />
              <View style={dynamicStyles.suggestionTitleAndDescriptionBlock}>
                <Text style={dynamicStyles.suggestionTitle}>Alif Bank</Text>
                <Text style={dynamicStyles.suggestionDescription}>
                  Alif Bank needs an operator worker and you can apply for a job
                  that suits you and wish you success.
                </Text>
                <Text style={dynamicStyles.suggestionTime}>06:47</Text>
              </View>
            </View>

            {/* Suggestion 2 */}
            <View style={dynamicStyles.suggestion}>
              <Image
                source={require("../../assets/tajjob/notifications/humo-suggestion.jpg")}
                style={dynamicStyles.suggestionImg}
              />
              <View style={dynamicStyles.suggestionTitleAndDescriptionBlock}>
                <Text style={dynamicStyles.suggestionTitle}>Humo Bank</Text>
                <Text style={dynamicStyles.suggestionDescription}>
                  Humo Bank needs an frontier card worker and you can apply for
                  a job that suits you and wish you success.
                </Text>
                <Text style={dynamicStyles.suggestionTime}>06:48</Text>
              </View>
            </View>

            {/* Suggestion 3 */}
            <View style={dynamicStyles.suggestion}>
              <Image
                source={require("../../assets/tajjob/notifications/eskhata-suggestion.jpg")}
                style={dynamicStyles.suggestionImg}
              />
              <View style={dynamicStyles.suggestionTitleAndDescriptionBlock}>
                <Text style={dynamicStyles.suggestionTitle}>Eskhata Bank</Text>
                <Text style={dynamicStyles.suggestionDescription}>
                  Eskhata Bank needs an communication worker and you can apply
                  for a job that suits you and wish you success.
                </Text>
                <Text style={dynamicStyles.suggestionTime}>06:48</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Suggestions;


