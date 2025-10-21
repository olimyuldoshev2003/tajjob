import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

// @ts-ignore
import Stars from "react-native-stars";

const ModalAddReview = ({
  modalAddReview,
  setModalAddReview,
}: {
  modalAddReview: any;
  setModalAddReview: any;
}) => {
  const [rating, setRating] = useState(0);
  return (
    <Modal
      visible={modalAddReview}
      onRequestClose={() => {
        setModalAddReview(false);
      }}
      transparent
      style={styles.modalAddReviewComponent}
      animationType="slide"
    >
      <View style={styles.overlayModalAddReview}>
        <View style={styles.modalAddReviewMainBlock}>
          <View style={styles.headerModalReview}>
            <Pressable
              style={styles.closeModalBtn}
              onPress={() => {
                setModalAddReview(false);
              }}
            >
              <FontAwesome name="close" size={32} color="black" />
            </Pressable>
            <Text style={styles.textHeaderModalAddReview}>
              Write Company Review
            </Text>
          </View>
          <View style={styles.sectionModalReview}>
            <View style={styles.userImgFullnameAndRatingBlock}>
              <Image
                source={require("../../assets/tajjob/job/user-img-modal-add-review.jpg")}
                style={styles.userImg}
              />
              <Text style={styles.fullNameUser}>Saidulloh Alisher</Text>
              <Text style={styles.textForRating}>
                Your overall rating of this product
              </Text>
              <Stars
                default={rating}
                count={5}
                starSize={50}
                update={(val: any) => {
                  setRating(val);
                }}
                fullStar={<Entypo name="star" size={41} color="orange" />}
                emptyStar={
                  <Entypo name="star-outlined" size={41} color="orange" />
                }
                halfStar={
                  <Ionicons name="star-half" size={41} color="orange" />
                }
              />
            </View>
            <View style={styles.writingTheReviewBlock}>
              <View style={styles.emailBlock}>
                
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddReview;

const styles = StyleSheet.create({
  modalAddReviewComponent: {},
  overlayModalAddReview: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalAddReviewMainBlock: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#DDDDDD",
  },
  headerModalReview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 41,
    padding: 20,
  },
  closeModalBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  textHeaderModalAddReview: {
    color: "#3E3D3D",
    fontSize: 19,
    fontWeight: "600",
  },
  sectionModalReview: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 13,
    marginTop: 39,
  },
  userImgFullnameAndRatingBlock: {
    position: "absolute",
    alignItems: "center",
    top: -40.5,
    left: "16.8%",
  },
  userImg: {
    width: 86,
    height: 86,
    borderRadius: 50,
  },
  fullNameUser: {
    fontSize: 32,
    fontWeight: "700",
  },
  textForRating: {
    color: "#515151",
    fontSize: 18,
    fontWeight: "400",
  },
  writingTheReviewBlock: {},
  emailBlock: {},
});
