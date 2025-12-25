import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// @ts-ignore
import Stars from "react-native-stars";

const ReviewJob = ({
  route,
  setModalAddReview,
}: {
  route: any;
  setModalAddReview: any;
}) => {
  // console.log(route.params.id);

  const colorScheme = useColorScheme();

  const [rating, setRating] = useState(0);

  const dynamicStyles = StyleSheet.create({
    reviewJobComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
    },
    reviewJobComponentBlock: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flex: 1,
    },
    reviewJobComponentScrollViewBlock: {
      flexGrow: 1,
    },
    headerReviewJobComponent: {},
    headerBlock1ReviewJobComponent: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerBlock1Text: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    btnHeaderBlock1: {},
    btnTextHeaderBlock1: {
      color: colorScheme === "dark" ? "#00c3ff" : "#2623D0",
      fontSize: 16,
      fontWeight: "500",
      textDecorationLine: "underline",
    },
    headerBlock2ReviewJobComponent: {
      position: "relative",
      marginTop: 10,
    },
    searchIcon: {
      position: "absolute",
      top: 7,
      left: 7,
      zIndex: 1,
    },
    searchInput: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      paddingLeft: 40,
      boxShadow: "0 0 5px gray",
      borderRadius: 10,
      fontSize: 16,
      fontWeight: 500,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    headerBlock3ReviewJobComponent: {
      flexDirection: "row",
      marginTop: 30,
      gap: 10,
    },
    btnFilter: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      boxShadow: "0 0 5px gray",
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    filterIcon: {},
    btnTextFilter: {
      fontSize: 15,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    filterBtnsBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
    },
    interestBtn: {},
    complainBtn: {},
    feedbackBtn: {},

    interestBtnText: {},
    complainBtnText: {},
    feedbackBtnText: {},

    filterBtn: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      boxShadow: "0 0 5px gray",
      borderRadius: 10,
    },
    filterBtnText: {
      fontSize: 15,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    filterBtnActive: {
      backgroundColor: colorScheme === "dark" ? "#00b8f0" : "#2623D2",
    },
    filterBtnTextActive: {
      color: "#fff",
    },
    sectionReviewJobComponent: {
      marginTop: 20,
      paddingBottom: 100,
    },
    reviews: {},

    // Each review
    reviewBlock: {
      padding: 10,
      boxShadow: "0 0 5px gray",
      borderRadius: 20,
    },
    headerReviewBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    userImgFullnameAndRatingBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    userImgReview: {
      width: 37,
      height: 37,
      resizeMode: "contain",
      borderRadius: 50,
    },
    fullnameAndRatingBlock: {},
    fullnameReviewer: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    sectionReviewBlock: {
      marginTop: 10,
    },
    review: {
      fontSize: 14,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    reviewTime: {
      color: colorScheme === "dark" ? "#fff" : "#c2c2c2",
      fontSize: 14,
      fontWeight: "500",
      textAlign: "right",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={dynamicStyles.reviewJobComponent}>
          <ScrollView
            style={dynamicStyles.reviewJobComponentBlock}
            contentContainerStyle={
              dynamicStyles.reviewJobComponentScrollViewBlock
            }
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={dynamicStyles.headerReviewJobComponent}>
              <View style={dynamicStyles.headerBlock1ReviewJobComponent}>
                <Text style={dynamicStyles.headerBlock1Text}>Reviews</Text>
                <Pressable
                  style={dynamicStyles.btnHeaderBlock1}
                  onPress={() => {
                    setModalAddReview(true);
                  }}
                >
                  <Text style={dynamicStyles.btnTextHeaderBlock1}>
                    Add review
                  </Text>
                </Pressable>
              </View>
              <View style={dynamicStyles.headerBlock2ReviewJobComponent}>
                <Ionicons
                  name="search"
                  size={26}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                  style={dynamicStyles.searchIcon}
                />

                <TextInput
                  style={dynamicStyles.searchInput}
                  placeholder="Search in reviews"
                  placeholderTextColor={
                    colorScheme === "dark" ? "#cacaca" : "gray"
                  }
                />
              </View>
              <View style={dynamicStyles.headerBlock3ReviewJobComponent}>
                <Pressable style={dynamicStyles.btnFilter}>
                  <Ionicons
                    name="options"
                    size={24}
                    color={colorScheme === "dark" ? "#fff" : "black"}
                    style={dynamicStyles.filterIcon}
                  />
                  <Text style={dynamicStyles.btnTextFilter}>Filter</Text>
                </Pressable>
                <View style={dynamicStyles.filterBtnsBlock}>
                  <Pressable
                    style={[
                      dynamicStyles.filterBtn,
                      dynamicStyles.interestBtn,
                      dynamicStyles.filterBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        dynamicStyles.filterBtnText,
                        dynamicStyles.interestBtnText,
                        dynamicStyles.filterBtnTextActive,
                      ]}
                    >
                      Interest
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[dynamicStyles.filterBtn, dynamicStyles.complainBtn]}
                  >
                    <Text
                      style={[
                        dynamicStyles.filterBtnText,
                        dynamicStyles.complainBtnText,
                      ]}
                    >
                      Complain
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[dynamicStyles.filterBtn, dynamicStyles.feedbackBtn]}
                  >
                    <Text
                      style={[
                        dynamicStyles.filterBtnText,
                        dynamicStyles.feedbackBtnText,
                      ]}
                    >
                      Feedback
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={dynamicStyles.sectionReviewJobComponent}>
              <View style={dynamicStyles.reviews}>
                {/* Review 1 */}
                <View style={dynamicStyles.reviewBlock}>
                  <View style={dynamicStyles.headerReviewBlock}>
                    <View style={dynamicStyles.userImgFullnameAndRatingBlock}>
                      <Image
                        source={require("../../assets/tajjob/job/user-img-review.jpg")}
                        style={dynamicStyles.userImgReview}
                      />
                      <View style={dynamicStyles.fullnameAndRatingBlock}>
                        <Text style={dynamicStyles.fullnameReviewer}>
                          John Boris
                        </Text>
                        <Stars
                          default={rating}
                          count={5}
                          disabled={true}
                          starSize={50}
                          fullStar={
                            <Entypo name="star" size={18} color="orange" />
                          }
                          emptyStar={
                            <Entypo
                              name="star-outlined"
                              size={18}
                              color="orange"
                            />
                          }
                          halfStar={
                            <Ionicons
                              name="star-half"
                              size={18}
                              color="orange"
                            />
                          }
                        />
                      </View>
                    </View>
                    <Entypo
                      name="heart-outlined"
                      size={30}
                      color={colorScheme === "dark" ? "#fff" : "black"}
                    />
                  </View>
                  <View style={dynamicStyles.sectionReviewBlock}>
                    <Text style={dynamicStyles.review}>
                      Reliable, Trusted, Innovative, Digital, Banking, Modern,
                      Safe, Fast, Customer, Service, Support, Convenient,
                      Mobile, Application, Professional, Easy, Secure,
                      Transparent, Flexible, Growth, Future, Smart, Finance,
                      Helpful, User-friendly, Strong, Accessible, Simple,
                      Efficient, Excellent, Popular
                    </Text>
                  </View>
                  <Text style={dynamicStyles.reviewTime}>11 days ago</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ReviewJob;
