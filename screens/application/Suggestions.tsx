import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Suggestions = () => {
  return (
    <View style={styles.suggestionsComponent}>
      <ScrollView
        contentContainerStyle={styles.suggestions}
        showsVerticalScrollIndicator={false}
      >
        <View   style={styles.suggestionsContainer}>

        </View>
        <Text style={styles.suggestionsSentDay}>Yesterday</Text>
        {/* Suggestion 1 */}
        <View style={styles.suggestionsBlockOfThisDay}>
          <View style={styles.suggestion}>
            <Image
              source={require("../../assets/tajjob/notifications/alif-suggestion.jpg")}
              style={styles.suggestionImg}
            />
            <View style={styles.suggestionTitleAndDescriptionBlock}>
              <Text style={styles.suggestionTitle}>Alif Bank</Text>
              <Text style={styles.suggestionDescription}>
                Alif Bank needs an operator worker and you can apply for a job
                that suits you and wish you success.
              </Text>
              <Text style={styles.suggestionTime}>06:47</Text>
            </View>
          </View>

          {/* Suggestion 2 */}
          <View style={styles.suggestion}>
            <Image
              source={require("../../assets/tajjob/notifications/humo-suggestion.jpg")}
              style={styles.suggestionImg}
            />
            <View style={styles.suggestionTitleAndDescriptionBlock}>
              <Text style={styles.suggestionTitle}>Humo Bank</Text>
              <Text style={styles.suggestionDescription}>
                Humo Bank needs an frontier card worker and you can apply for a
                job that suits you and wish you success.
              </Text>
              <Text style={styles.suggestionTime}>06:48</Text>
            </View>
          </View>

          {/* Suggestion 3 */}
          <View style={styles.suggestion}>
            <Image
              source={require("../../assets/tajjob/notifications/eskhata-suggestion.jpg")}
              style={styles.suggestionImg}
            />
            <View style={styles.suggestionTitleAndDescriptionBlock}>
              <Text style={styles.suggestionTitle}>Eskhata Bank</Text>
              <Text style={styles.suggestionDescription}>
                Eskhata Bank needs an communication worker and you can apply for
                a job that suits you and wish you success.
              </Text>
              <Text style={styles.suggestionTime}>06:48</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Suggestions;

const styles = StyleSheet.create({
  suggestionsComponent: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  suggestions: {
    paddingHorizontal: 7,
    paddingBottom: 15,
  },
  suggestionsSentDay: {
    textAlign: "center",
    color: "#9E9E9E",
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
    backgroundColor: "#fff",
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
    color: "#000",
  },
  suggestionDescription: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000",
  },
  suggestionTime: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9E9E9E",
    textAlign: "right",
  },
});
