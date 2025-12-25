import { MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// @ts-ignore
import Stars from "react-native-stars";

const ModalAddReview = ({
  modalAddReview,
  setModalAddReview,
}: {
  modalAddReview: any;
  setModalAddReview: any;
  }) => {
  
  const colorScheme = useColorScheme();
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [ratingError, setRatingError] = useState("");

  // Character limits
  const REVIEW_MAX_LENGTH = 2000;
  const EMAIL_MAX_LENGTH = 100;

  // Email validation
  const validateEmail = (emailText: string) => {
    if (!emailText.trim()) {
      setEmailError("");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailText.trim());

    if (!isValid) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    if (emailText.length > EMAIL_MAX_LENGTH) {
      setEmailError(`Email must be less than ${EMAIL_MAX_LENGTH} characters`);
      return false;
    }

    // Check for disposable/disposable email domains
    const disposableDomains = [
      "tempmail.com",
      "temp-mail.org",
      "10minutemail.com",
      "guerrillamail.com",
      "mailinator.com",
      "yopmail.com",
      "trashmail.com",
      "throwawaymail.com",
      "fakeinbox.com",
    ];

    const domain = emailText.split("@")[1]?.toLowerCase();
    if (domain && disposableDomains.some((d) => domain.includes(d))) {
      setEmailError("Please use a permanent email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  // Review validation
  const validateReview = (reviewText: string) => {
    if (!reviewText.trim()) {
      setReviewError("");
      return false;
    }

    const trimmedReview = reviewText.trim();

    // Check minimum length
    if (trimmedReview.length < 10) {
      setReviewError("Review must be at least 10 characters");
      return false;
    }

    // Check maximum length
    if (trimmedReview.length > REVIEW_MAX_LENGTH) {
      setReviewError(
        `Review must be less than ${REVIEW_MAX_LENGTH} characters`
      );
      return false;
    }

    // Check for excessive whitespace
    if (trimmedReview.split(/\s+/).length < 3) {
      setReviewError("Please provide a more detailed review");
      return false;
    }

    // Check for repetitive text
    const words = trimmedReview.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    const uniquenessRatio = uniqueWords.size / words.length;

    if (words.length > 20 && uniquenessRatio < 0.3) {
      setReviewError("Review appears to have repetitive content");
      return false;
    }

    // Check for inappropriate content (basic check)
    const inappropriateWords = [
      "spam",
      "advertisement",
      "promotion",
      "scam",
      "fraud",
      "hate",
      "discrimination",
      "harassment",
      "offensive",
    ];

    const lowerReview = trimmedReview.toLowerCase();
    if (inappropriateWords.some((word) => lowerReview.includes(word))) {
      setReviewError("Review contains inappropriate content");
      return false;
    }

    setReviewError("");
    return true;
  };

  // Rating validation
  const validateRating = (ratingValue: number) => {
    if (ratingValue === 0) {
      setRatingError("Please select a rating");
      return false;
    }

    if (ratingValue < 0 || ratingValue > 5) {
      setRatingError("Rating must be between 1 and 5");
      return false;
    }

    setRatingError("");
    return true;
  };

  // Handle email change with validation
  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  // Handle review change with validation
  const handleReviewChange = (text: string) => {
    // Limit review length
    if (text.length <= REVIEW_MAX_LENGTH) {
      setReview(text);
      validateReview(text);
    }
  };

  // Handle rating change with validation
  const handleRatingChange = (value: number) => {
    setRating(value);
    validateRating(value);
  };

  // Calculate review characters remaining
  const getReviewCharsRemaining = () => {
    return REVIEW_MAX_LENGTH - review.length;
  };

  // Get character count color
  const getCharCountColor = () => {
    const remaining = getReviewCharsRemaining();  
    if (remaining < 100) return "#FF9800";
    if (remaining < 20) return "#F44336";
    return "#4CAF50";
  };

  // Get rating text based on value
  const getRatingText = (ratingValue: number) => {
    if (ratingValue === 0) return "Not rated";
    if (ratingValue === 1) return "Poor";
    if (ratingValue === 2) return "Fair";
    if (ratingValue === 3) return "Good";
    if (ratingValue === 4) return "Very Good";
    if (ratingValue === 5) return "Excellent";
    return "";
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isReviewValid = validateReview(review);
    const isRatingValid = validateRating(rating);

    if (!isEmailValid || !isReviewValid || !isRatingValid) {
      if (!isRatingValid && rating === 0) {
        Alert.alert("Rating Required", "Please select a star rating");
      }
      return;
    }

    // Check if email is provided
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your email address");
      return;
    }

    // Check if review is provided
    if (!review.trim()) {
      Alert.alert("Review Required", "Please enter your review");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const reviewData = {
        rating,
        email: email.trim(),
        review: review.trim(),
        reviewLength: review.trim().length,
        timestamp: new Date().toISOString(),
        ratingText: getRatingText(rating),
      };

      console.log("Submitting review:", reviewData);

      Alert.alert(
        "Review Submitted!",
        "Thank you for your valuable feedback! Your review has been submitted successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setRating(0);
              setEmail("");
              setReview("");
              setEmailError("");
              setReviewError("");
              setRatingError("");
              setIsLoading(false);
              setModalAddReview(false);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert(
        "Submission Error",
        "Failed to submit your review. Please try again.",
        [{ text: "OK" }]
      );
      setIsLoading(false);
    }
  };

  // Check if form can be submitted
  const canSubmit = () => {
    return (
      rating > 0 &&
      email.trim().length > 0 &&
      review.trim().length >= 10 &&
      !emailError &&
      !reviewError &&
      !isLoading
    );
  };

  const dynamicStyles = StyleSheet.create({
    modalAddReviewComponent: {},
    overlayModalAddReview: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalAddReviewMainBlock: {
      position: "absolute",
      inset: 0,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#DDDDDD",
    },
    headerModalReview: {
      flexDirection: "row",
      alignItems: "center",
      gap: 41,
      padding: 20,
    },
    closeModalBtn: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 50,
    },
    textHeaderModalAddReview: {
      color: colorScheme === "dark" ? "#fff" : "#3E3D3D",
      fontSize: 19,
      fontWeight: "600",
    },
    sectionModalReview: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 13,
      marginTop: 39,
      paddingBottom: 0,
      flex: 1,
    },
    userImgFullnameAndRatingBlock: {
      position: "absolute",
      alignItems: "center",
      top: -40.5,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    userImg: {
      width: 86,
      height: 86,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      resizeMode: "cover",
    },
    fullNameUser: {
      fontSize: 24,
      fontWeight: "700",
      marginTop: 5,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    textForRating: {
      color: colorScheme === "dark" ? "#fff" : "#515151",
      fontSize: 16,
      fontWeight: "400",
      marginTop: 5,
    },
    ratingInfoContainer: {
      marginTop: 10,
      alignItems: "center",
    },
    ratingText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colorScheme === "dark" ? "#fff" : "#333",
    },
    ratingDescription: {
      fontSize: 14,
      color: colorScheme === "dark" ? "#fff" : "#666",
      marginTop: 2,
      fontStyle: "italic",
    },
    ratingErrorText: {
      color: "#F44336",
      fontSize: 14,
      fontWeight: "500",
      marginTop: 8,
      textAlign: "center",
    },
    block2SectionModalReview: {
      marginTop: 180,
      paddingHorizontal: 10,
    },

    emailBlock: {
      gap: 8,
    },
    emailLabel: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 22,
      fontWeight: "600",
    },
    emailIconAndInput: {
      position: "relative",
    },
    emailImg: {
      position: "absolute",
      top: 7.5,
      left: 12,
      zIndex: 1,
    },
    emailInput: {
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingLeft: 53,
      paddingVertical: 12,
      borderRadius: 15,
      fontSize: 16,
      width: "100%",
      borderColor: colorScheme === "dark" ? "#121212" : "#ddd",
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    reviewCommentBlock: {
      gap: 8,
      marginTop: 25,
    },
    reviewHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
    reviewCommentLabel: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 22,
      fontWeight: "600",
      flex: 1,
    },
    charCount: {
      fontSize: 12,
      fontWeight: "500",
      marginLeft: 10,
    },
    reviewCommentInput: {
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 15,
      fontSize: 16,
      width: "100%",
      height: 180,
      textAlignVertical: "top",
      borderColor: colorScheme === "dark" ? "#121212" : "#ddd",
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    inputError: {
      borderColor: "#F44336",
      borderWidth: 2,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#FFF5F5",
    },

    errorText: {
      color: "#F44336",
      fontSize: 14,
      fontWeight: "500",
      marginTop: 4,
    },

    hintText: {
      color: colorScheme === "dark" ? "#fff" : "#666",
      fontSize: 12,
      fontStyle: "italic",
      marginTop: 4,
    },

    tipsContainer: {
      backgroundColor: colorScheme === "dark" ? "#121212" : "#F8F9FA",
      padding: 12,
      borderRadius: 10,
      marginTop: 15,
      borderLeftWidth: 3,
      borderLeftColor: "#4C4ADA",
    },
    tipsTitle: {
      color: colorScheme === "dark" ? "#fff" : "#333",
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 6,
    },
    tipText: {
      color: colorScheme === "dark" ? "#fff" : "#555",
      fontSize: 12,
      marginLeft: 5,
      marginBottom: 3,
    },

    btnAddReview: {
      backgroundColor: "#2623D2",
      paddingVertical: 16,
      borderRadius: 15,
      marginTop: 30,
      shadowColor: "#2623D2",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },

    btnAddReviewDisabled: {
      backgroundColor: "#999",
      opacity: 0.7,
      shadowColor: "#999",
    },

    btnAddReviewLoading: {
      backgroundColor: "#4C4ADA",
    },

    btnTextAddReview: {
      color: "#fff",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "700",
    },

    termsContainer: {
      marginTop: 20,
      paddingHorizontal: 10,
      paddingBottom: 30,
    },

    termsText: {
      color: "#777",
      fontSize: 12,
      textAlign: "center",
      fontStyle: "italic",
      lineHeight: 16,
    },
  });


  return (
    <Modal
      visible={modalAddReview}
      onRequestClose={() => {
        setModalAddReview(false);
      }}
      transparent
      style={dynamicStyles.modalAddReviewComponent}
      animationType="slide"
    >
      <View style={dynamicStyles.overlayModalAddReview}>
        <View style={dynamicStyles.modalAddReviewMainBlock}>
          <View style={dynamicStyles.headerModalReview}>
            <Pressable
              style={dynamicStyles.closeModalBtn}
              onPress={() => {
                setModalAddReview(false);
              }}
              disabled={isLoading}
            >
              <FontAwesome name="close" size={32} color={colorScheme  === "dark" ? "#fff":"black"} />
            </Pressable>
            <Text style={dynamicStyles.textHeaderModalAddReview}>
              Write Company Review
            </Text>
          </View>
          <View style={dynamicStyles.sectionModalReview}>
            <View style={dynamicStyles.userImgFullnameAndRatingBlock}>
              <Image
                source={require("../../assets/tajjob/profile/profileImg.jpg")}
                style={dynamicStyles.userImg}
              />
              <Text style={dynamicStyles.fullNameUser}>Olim Yuldoshev</Text>
              <Text style={dynamicStyles.textForRating}>
                Your overall rating of this product
              </Text>

              <Stars
                default={rating}
                count={5}
                starSize={50}
                update={handleRatingChange}
                fullStar={<Entypo name="star" size={41} color="orange" />}
                emptyStar={
                  <Entypo name="star-outlined" size={41} color="orange" />
                }
                halfStar={
                  <Ionicons name="star-half" size={41} color="orange" />
                }
                disabled={isLoading}
              />

              <View style={dynamicStyles.ratingInfoContainer}>
                {/* <Text style={dynamicStyles.ratingText}>
                  {rating > 0 ? `${rating.toFixed(1)}/5.0` : "Not rated"}
                </Text> */}
                {rating > 0 && (
                  <Text style={dynamicStyles.ratingDescription}>
                    {getRatingText(rating)}
                  </Text>
                )}
              </View>

              {ratingError ? (
                <Text style={dynamicStyles.ratingErrorText}>{ratingError}</Text>
              ) : null}
            </View>

            <ScrollView
              style={dynamicStyles.block2SectionModalReview}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={dynamicStyles.emailBlock}>
                <Text style={dynamicStyles.emailLabel}>Email *</Text>
                <View style={dynamicStyles.emailIconAndInput}>
                  <MaterialCommunityIcons
                    name="email"
                    size={32}
                    color={colorScheme === "dark" ? "#fff" : "black"}
                    style={dynamicStyles.emailImg}
                  />
                  <TextInput
                    placeholder="Enter your email"
                    style={[
                      dynamicStyles.emailInput,
                      emailError && dynamicStyles.inputError,
                    ]}
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                    maxLength={EMAIL_MAX_LENGTH}
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "#999"
                    }
                  />
                </View>
                {emailError ? (
                  <Text style={dynamicStyles.errorText}>{emailError}</Text>
                ) : (
                  <Text style={dynamicStyles.hintText}>
                    Your email will not be publicly displayed
                  </Text>
                )}
              </View>

              <View style={dynamicStyles.reviewCommentBlock}>
                <View style={dynamicStyles.reviewHeader}>
                  <Text style={dynamicStyles.reviewCommentLabel}>
                    Add detailed review *
                  </Text>
                  <Text
                    style={[
                      dynamicStyles.charCount,
                      { color: getCharCountColor() },
                    ]}
                  >
                    {getReviewCharsRemaining()} characters remaining
                  </Text>
                </View>

                <TextInput
                  placeholder="Enter your detailed review here (minimum 10 characters)..."
                  style={[
                    dynamicStyles.reviewCommentInput,
                    reviewError && dynamicStyles.inputError,
                  ]}
                  value={review}
                  onChangeText={handleReviewChange}
                  multiline
                  numberOfLines={7}
                  maxLength={REVIEW_MAX_LENGTH}
                  editable={!isLoading}
                  textAlignVertical="top"
                  placeholderTextColor={
                    colorScheme === "dark" ? "#fff" : "#999"
                  }
                />

                {reviewError ? (
                  <Text style={dynamicStyles.errorText}>{reviewError}</Text>
                ) : (
                  <Text style={dynamicStyles.hintText}>
                    Be honest and specific about your experience
                  </Text>
                )}

                {/* Review tips */}
                <View style={dynamicStyles.tipsContainer}>
                  <Text style={dynamicStyles.tipsTitle}>Writing tips:</Text>
                  <Text style={dynamicStyles.tipText}>
                    • Describe your specific experience
                  </Text>
                  <Text style={dynamicStyles.tipText}>
                    • Mention what you liked or disliked
                  </Text>
                  <Text style={dynamicStyles.tipText}>
                    • Be respectful and constructive
                  </Text>
                  <Text style={dynamicStyles.tipText}>
                    • Avoid personal information
                  </Text>
                </View>
              </View>

              <Pressable
                style={[
                  dynamicStyles.btnAddReview,
                  !canSubmit() && dynamicStyles.btnAddReviewDisabled,
                  isLoading && dynamicStyles.btnAddReviewLoading,
                ]}
                onPress={handleSubmit}
                disabled={!canSubmit() || isLoading}
              >
                {isLoading ? (
                  <Text style={dynamicStyles.btnTextAddReview}>
                    Submitting...
                  </Text>
                ) : (
                  <Text style={dynamicStyles.btnTextAddReview}>
                    Submit Review
                  </Text>
                )}
              </Pressable>

              <View style={dynamicStyles.termsContainer}>
                <Text style={dynamicStyles.termsText}>
                  By submitting, you agree that your review is genuine and based
                  on your personal experience.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddReview;

