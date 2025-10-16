import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ReviewJob = ({ route }: { route: any }) => {
  // console.log(route.params.id);

  return (
    <ScrollView contentContainerStyle={styles.reviewJobComponent}>
      <View style={styles.reviewJobComponentBlock}>
        <Text>Review</Text>
      </View>
    </ScrollView>
  );
};

export default ReviewJob;

const styles = StyleSheet.create({
  reviewJobComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  reviewJobComponentBlock: {},
});
