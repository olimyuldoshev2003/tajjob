import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// @ts-ignore
import Stars from "react-native-stars";

const ReviewJob = ({ route }: { route: any }) => {
  // console.log(route.params.id);

  // const [rating, setRating] = useState(0);

  return (
    <View style={styles.reviewJobComponent}>
      <ScrollView
        style={styles.reviewJobComponentBlock}
        contentContainerStyle={styles.reviewJobComponentScrollViewBlock}
      >
        <View style={styles.headerReviewJobComponent}>
          <View style={styles.headerBlock1ReviewJobComponent}>
            <Text style={styles.headerBlock1Text}>Reviews</Text>
            <Pressable style={styles.btnHeaderBlock1}>
              <Text style={styles.btnTextHeaderBlock1}>Add review</Text>
            </Pressable>
          </View>
          <View style={styles.headerBlock2ReviewJobComponent}>
            <Ionicons
              name="search"
              size={26}
              color="black"
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search in reviews"
            />
          </View>
          <View style={styles.headerBlock3ReviewJobComponent}>
            <Pressable style={styles.btnFilter}>
              <Image
                source={require("../../assets/tajjob/job/filter-icon.jpg")}
                style={styles.filterIcon}
              />
              <Text style={styles.btnTextFilter}>Filter</Text>
            </Pressable>
            <View style={styles.filterBtnsBlock}>
              <Pressable
                style={[
                  styles.filterBtn,
                  styles.interestBtn,
                  styles.filterBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterBtnText,
                    styles.interestBtnText,
                    styles.filterBtnTextActive,
                  ]}
                >
                  Interest
                </Text>
              </Pressable>
              <Pressable style={[styles.filterBtn, styles.complainBtn]}>
                <Text style={[styles.filterBtnText, styles.complainBtnText]}>
                  Complain
                </Text>
              </Pressable>
              <Pressable style={[styles.filterBtn, styles.feedbackBtn]}>
                <Text style={[styles.filterBtnText, styles.feedbackBtnText]}>
                  Feedback
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.sectionReviewJobComponent}>
          <View style={styles.reviews}>
            {/* Review 1 */}
            <View style={styles.reviewBlock}>
              <View style={styles.headerReviewBlock}>
                <View style={styles.userImgFullnameAndRatingBlock}>
                  <Image
                    source={require("../../assets/tajjob/job/user-img-review.jpg")}
                    style={styles.userImgReview}
                  />
                  <View style={styles.fullnameAndRatingBlock}>
                    <Text style={styles.fullnameReviewer}>John Boris</Text>
                    <Stars
                      // default={2.5}
                      count={5}
                      disabled={true}
                      // half={true}
                      starSize={50}
                      fullStar={<Entypo name="star" size={18} color="orange" />}
                      emptyStar={
                        <Entypo name="star-outlined" size={18} color="orange" />
                      }
                      halfStar={
                        <Ionicons name="star-half" size={18} color="orange" />
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewJob;

const styles = StyleSheet.create({
  reviewJobComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  reviewJobComponentBlock: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  reviewJobComponentScrollViewBlock: {},
  headerReviewJobComponent: {},
  headerBlock1ReviewJobComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerBlock1Text: {
    fontSize: 18,
    fontWeight: "500",
  },
  btnHeaderBlock1: {},
  btnTextHeaderBlock1: {
    color: "#2623D0",
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
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 40,
    boxShadow: "0 0 5px gray",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 500,
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
  filterIcon: {
    width: 24,
    height: 24,
  },
  btnTextFilter: {
    fontSize: 15,
    fontWeight: "500",
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
  },
  filterBtnActive: {
    backgroundColor: "#2623D2",
  },
  filterBtnTextActive: {
    color: "#fff",
  },
  sectionReviewJobComponent: {
    marginTop: 20,
    paddingBottom: 40,
  },
  reviews: {},

  // Each review
  reviewBlock: {
    padding: 10,
    boxShadow: "0 0 5px gray",
    borderRadius: 20,
  },
  headerReviewBlock: {},
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
  },
 
});
