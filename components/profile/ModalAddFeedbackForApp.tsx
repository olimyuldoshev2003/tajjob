import Entypo from "@expo/vector-icons/Entypo";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import {
  AsYouType,
  CountryCode,
  getExampleNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Selector } from "rn-selector";
// @ts-ignore: Module 'country-telephone-data' has no type declarations
import { allCountries } from "country-telephone-data";

// Updated Tajik SIM card prefixes and operators data for 2025
const TAJIK_PREFIXES = {
  // Current & Primary prefixes
  "90": "MegaFon Tajikistan",
  "55": "MegaFon Tajikistan",
  "41": "MegaFon Tajikistan",
  "88": "MegaFon Tajikistan",
  "00": "MegaFon Tajikistan",
  "01": "MegaFon Tajikistan",
  "02": "MegaFon Tajikistan",
  "07": "MegaFon Tajikistan",
  "97": "MegaFon Tajikistan",
  "12": "MegaFon Tajikistan",
  "21": "MegaFon Tajikistan",
  "27": "MegaFon Tajikistan",
  "91": "ZET-Mobile",
  "40": "ZET-Mobile",
  "80": "ZET-Mobile",
  "33": "ZET-Mobile",
  "81": "ZET-Mobile",
  "03": "ZET-Mobile",
  "04": "ZET-Mobile",
  "08": "ZET-Mobile",
  "05": "ZET-Mobile",
  "09": "ZET-Mobile",
  "06": "ZET-Mobile",
  "18": "ZET-Mobile",
  "19": "ZET-Mobile",
  "66": "ZET-Mobile",
  "38": "ZET-Mobile",
  "92": "Tcell",
  "93": "Tcell",
  "50": "Tcell",
  "77": "Tcell",
  "70": "Tcell",
  "99": "Tcell",
  "11": "Tcell",
  "10": "O-Mobile",
  "20": "O-Mobile",
  "22": "O-Mobile",
  "30": "O-Mobile",
  "78": "Anor",
  "87": "Anor",
  "98": "Babilon-Mobile",
  "94": "Babilon-Mobile",
  "71": "Babilon-Mobile",
  "17": "Babilon-Mobile",
  "75": "Babilon-Mobile",

  // Historical Legacy (3-digit)
  "440": "ZET-Mobile",
  "444": "ZET-Mobile",
  "030": "ZET-Mobile",
  "040": "ZET-Mobile",
  "080": "ZET-Mobile",
  "442": "ZET-Mobile",
  "443": "ZET-Mobile",
  "447": "ZET-Mobile",
  "449": "ZET-Mobile",
  "918": "Babilon-Mobile",
};

const ModalAddFeedbackForApp = ({
  modalAddFeedbackForApp,
  setModalAddFeedbackForApp,
}: {
  modalAddFeedbackForApp: boolean;
  setModalAddFeedbackForApp: any;
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [detectedOperator, setDetectedOperator] = useState("");

  // Get all countries from the library and format for rn-selector
  const COUNTRIES_DATA = allCountries.map((country: any) => ({
    value: country.iso2, // This is lowercase (e.g., "tj", "us")
    label: `${country.name} (+${country.dialCode})`,
    emoji: country.emoji,
    dialCode: country.dialCode,
    name: country.name,
  }));

  // Find current selected country data
  const getSelectedCountry = () => {
    if (!selectedCountry) return null;
    return COUNTRIES_DATA.find(
      (country: any) => country.value === selectedCountry
    );
  };

  // Set default country when modal opens
  useEffect(() => {
    if (modalAddFeedbackForApp) {
      setSelectedCountry("tj");
      setPhone("+992 ");
      setPhoneError("");
      setDetectedOperator("");
    }
  }, [modalAddFeedbackForApp]);

  // Detect Tajik mobile operator from phone number
  const detectTajikOperator = (phoneNumber: string): string => {
    if (!phoneNumber || !phoneNumber.includes("+992")) {
      return "";
    }

    // Extract the national number part (without country code)
    const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
    const nationalNumber = cleanNumber.startsWith("992")
      ? cleanNumber.substring(3)
      : cleanNumber;

    if (!nationalNumber) return "";

    // Check 3-digit prefixes first (historical legacy)
    const threeDigitPrefix = nationalNumber.substring(0, 3);
    if (TAJIK_PREFIXES[threeDigitPrefix as keyof typeof TAJIK_PREFIXES]) {
      return TAJIK_PREFIXES[threeDigitPrefix as keyof typeof TAJIK_PREFIXES];
    }

    // Check 2-digit prefixes (current & primary)
    const twoDigitPrefix = nationalNumber.substring(0, 2);
    if (TAJIK_PREFIXES[twoDigitPrefix as keyof typeof TAJIK_PREFIXES]) {
      return TAJIK_PREFIXES[twoDigitPrefix as keyof typeof TAJIK_PREFIXES];
    }

    return "";
  };

  // Enhanced country detection with Tajik prefix support
  const detectCountryFromPhoneNumber = (phoneNumber: string): string | null => {
    if (!phoneNumber || !phoneNumber.startsWith("+")) {
      return null;
    }

    // Special case: Check for Tajikistan number with specific prefixes
    if (phoneNumber.startsWith("+992")) {
      const operator = detectTajikOperator(phoneNumber);
      setDetectedOperator(operator);
      return "tj"; // Return lowercase to match COUNTRIES_DATA
    }

    // Try to parse with libphonenumber first (most accurate)
    try {
      const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
      if (phoneNumberObj && phoneNumberObj.country) {
        // Convert to lowercase to match COUNTRIES_DATA format
        const detectedCountry = phoneNumberObj.country.toLowerCase();

        if (detectedCountry !== "tj") {
          setDetectedOperator("");
        }
        return detectedCountry;
      }
    } catch (error) {
      console.log("Error parsing phone number:", error);
    }

    // Fallback: Check against our countries data by dial code
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    const sortedCountries = [...COUNTRIES_DATA].sort(
      (a: any, b: any) =>
        b.dialCode.replace("+", "").length - a.dialCode.replace("+", "").length
    );

    for (const country of sortedCountries) {
      const countryDialCode = country.dialCode.replace("+", "");
      if (cleanPhone.startsWith(countryDialCode)) {
        if (country.value !== "tj") {
          setDetectedOperator("");
        }
        return country.value; // Already lowercase
      }
    }

    setDetectedOperator("");
    return null;
  };

  // Enhanced phone number formatting with Tajik prefix support
  const handlePhoneChange = (text: string) => {
    // Allow only digits, plus, spaces, and parentheses
    const cleaned = text.replace(/[^\d+()\s-]/g, "");

    // Always update the phone state first for responsive input
    setPhone(cleaned);

    // Auto-detect country from input when number starts with +
    if (cleaned.startsWith("+") && cleaned.length >= 3) {
      const detectedCountry = detectCountryFromPhoneNumber(cleaned);

      if (detectedCountry && detectedCountry !== selectedCountry) {
        // Country changed - update selected country
        setSelectedCountry(detectedCountry);
        setPhoneError("");
        setDetectedOperator("");

        // Format with new country
        try {
          const formatter = new AsYouType(
            detectedCountry.toUpperCase() as CountryCode
          );
          const formatted = formatter.input(cleaned);
          setPhone(formatted);

          // Auto-detect operator for Tajik numbers
          if (detectedCountry === "tj" && formatted.startsWith("+992")) {
            const operator = detectTajikOperator(formatted);
            setDetectedOperator(operator);
          }
        } catch (error) {
          // Keep the cleaned version if formatting fails
          setPhone(cleaned);
        }

        // Validate with new country
        validatePhoneNumber(cleaned, detectedCountry);
        return;
      }
    }

    // If phone input is empty or doesn't start with +, clear selected country
    if (!cleaned || !cleaned.startsWith("+") || cleaned.length < 3) {
      if (selectedCountry !== "") {
        setSelectedCountry("");
      }
      setPhoneError("");
      setDetectedOperator("");
      return;
    }

    // No country change - format with current country
    if (selectedCountry) {
      try {
        const formatter = new AsYouType(
          selectedCountry.toUpperCase() as CountryCode
        );
        const formatted = formatter.input(cleaned);
        setPhone(formatted);

        // Auto-detect operator for Tajik numbers
        if (selectedCountry === "tj" && formatted.startsWith("+992")) {
          const operator = detectTajikOperator(formatted);
          setDetectedOperator(operator);
        }
      } catch (error) {
        setPhone(cleaned);
      }

      validatePhoneNumber(cleaned, selectedCountry);
    }
  };

  // IMPROVED validation function
  const validatePhoneNumber = (phoneNumber: string, countryCode: string) => {
    // Clear error if input is too short
    if (phoneNumber.replace("+", "").length < 4) {
      setPhoneError("");
      return;
    }

    try {
      const phoneNumberObj = parsePhoneNumberFromString(
        phoneNumber,
        countryCode.toUpperCase() as CountryCode
      );

      if (phoneNumberObj && phoneNumberObj.isValid()) {
        setPhoneError("");

        // Only validate Tajik prefix when number is complete (11+ digits)
        if (countryCode === "tj" && phoneNumber.startsWith("+992")) {
          const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
          if (cleanNumber.length >= 11) {
            const operator = detectTajikOperator(phoneNumber);
            if (!operator) {
              setPhoneError("Invalid Tajik mobile prefix");
            }
          }
        }
      } else {
        // Don't show error for incomplete numbers during typing
        const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
        if (cleanNumber.length < 8) {
          setPhoneError(""); // Too short, don't show error yet
        } else {
          setPhoneError("Please enter a valid phone number");
        }
      }
    } catch (error) {
      // Don't show error for incomplete numbers during typing
      const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
      if (cleanNumber.length < 8) {
        setPhoneError("");
      } else {
        setPhoneError("Please enter a valid phone number");
      }
    }
  };

  // Handle country selection
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setPhoneError("");
    setDetectedOperator("");

    // Update phone with new country code
    const country = COUNTRIES_DATA.find((c: any) => c.value === countryCode);
    if (country) {
      setPhone(`+${country.dialCode} `);
    }
  };

  // Get phone number placeholder based on selected country
  const getPhonePlaceholder = () => {
    if (selectedCountry === "tj") {
      return "e.g., +992 93 123 4567";
    }

    try {
      const exampleNumber = getExampleNumber(
        selectedCountry.toUpperCase() as CountryCode,
        examples
      );
      if (exampleNumber) {
        return exampleNumber.formatNational();
      }
    } catch (error) {
      // Fallback to generic placeholder
    }

    const country = getSelectedCountry();

    return `Enter phone number (${country?.dialCode || "+992"})`;
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    if (!selectedCountry) {
      Alert.alert("Validation Error", "Please select a country.");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Validation Error", "Please enter your phone number.");
      return;
    }

    // Final phone validation before submission
    try {
      const phoneNumber = parsePhoneNumberFromString(
        phone,
        selectedCountry.toUpperCase() as CountryCode
      );

      if (!phoneNumber || !phoneNumber.isValid()) {
        setPhoneError("Please enter a valid phone number");
        Alert.alert("Validation Error", "Please enter a valid phone number.");
        return;
      }

      // Additional validation for Tajik numbers - only when complete
      if (selectedCountry === "tj") {
        const cleanNumber = phone.replace(/[^\d]/g, "");
        if (cleanNumber.length >= 11) {
          const operator = detectTajikOperator(phone);
          if (!operator) {
            setPhoneError("Invalid Tajik mobile prefix");
            Alert.alert(
              "Validation Error",
              "Please enter a valid Tajik phone number with correct mobile prefix."
            );
            return;
          }
        }
      }
    } catch (error) {
      setPhoneError("Please enter a valid phone number");
      Alert.alert("Validation Error", "Please enter a valid phone number.");
      return;
    }

    if (!review.trim()) {
      Alert.alert("Validation Error", "Please enter your feedback.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Submitting feedback with:", {
        email,
        phone,
        country: selectedCountry,
        detectedOperator,
        review,
      });

      Alert.alert(
        "Feedback Submitted!",
        "Thank you for your feedback! We appreciate your input.",
        [
          {
            text: "OK",
            onPress: () => {
              setModalAddFeedbackForApp(false);
              setEmail("");
              setPhone("");
              setReview("");
              setIsLoading(false);
              setPhoneError("");
              setDetectedOperator("");
              setSelectedCountry("");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "Failed to submit feedback. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={modalAddFeedbackForApp}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setModalAddFeedbackForApp(!modalAddFeedbackForApp);
      }}
      style={styles.modalAddFeedbackForAppComponent}
    >
      <Pressable
        style={styles.overlayModalAddFeedbackForApp}
        onPress={() => {
          setModalAddFeedbackForApp(false);
        }}
      >
        <Pressable
          style={styles.modalAddFeedbackForAppMainBlock}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.headerModalAddFeedbackForApp}>
            <Pressable
              style={styles.btnCloseModalAddFeedbackForApp}
              onPress={() => {
                setModalAddFeedbackForApp(false);
              }}
            >
              <FontAwesome name="close" size={32} color="black" />
            </Pressable>
            <Text style={styles.textHeaderModalAddFeedbackForApp}>
              Write Us Feedback
            </Text>
          </View>
          <View style={styles.sectionModalAddFeedbackForApp}>
            <View style={styles.blockUserImgAndUserFullname}>
              <Image
                source={require("../../assets/tajjob/profile/profileImg.jpg")}
                style={styles.userImg}
              />
              <Text style={styles.userFullname}>Olim Yuldoshev</Text>
            </View>
            <View style={styles.scrollViewContainer}>
              <ScrollView
                contentContainerStyle={
                  styles.blockSectionModalAddFeedbackForAppScrollView
                }
                style={styles.blockSectionModalAddFeedbackForApp}
              >
                <View
                  style={[
                    styles.emailLabelIconAndInput,
                    styles.labelIconAndInputBlock,
                  ]}
                >
                  <Text style={styles.label}>Email *</Text>
                  <View style={styles.iconAndInputBlock}>
                    <MaterialCommunityIcons
                      name="email"
                      size={35}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="example@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <View
                  style={[
                    styles.phoneNumberLabelIconAndInput,
                    styles.labelIconAndInputBlock,
                  ]}
                >
                  <Text style={styles.label}>Phone number *</Text>

                  {/* Country Selector */}
                  <View style={styles.countrySelectorContainer}>
                    <View style={styles.selectorWrapper}>
                      <Selector
                        options={COUNTRIES_DATA}
                        selectedValue={selectedCountry}
                        onValueChange={handleCountrySelect}
                        placeholder="Select Country"
                        searchable={true}
                        primaryColor="#4C4ADA"
                        customArrow={
                          <Entypo
                            name="chevron-thin-down"
                            size={16}
                            color="#666"
                          />
                        }
                        optionStyle={styles.optionStyle}
                        searchPlaceholder="Search countries..."
                        style={styles.selectorStyle}
                        dropdownStyle={styles.dropdownStyle}
                      />
                      <Pressable style={styles.selectorBackdrop} />
                    </View>
                  </View>

                  <View style={styles.iconAndInputBlock}>
                    <FontAwesome5
                      name="phone-alt"
                      size={30}
                      color="black"
                      style={styles.phoneIcon}
                    />
                    <TextInput
                      style={[
                        styles.input,
                        phoneError && styles.phoneInputError,
                      ]}
                      placeholder={getPhonePlaceholder()}
                      value={phone}
                      onChangeText={handlePhoneChange}
                      keyboardType="phone-pad"
                      placeholderTextColor="#999"
                    />
                  </View>

                  {phoneError ? (
                    <Text style={styles.phoneErrorText}>{phoneError}</Text>
                  ) : (
                    <Text style={styles.phoneHintText}>
                      {selectedCountry === "tj"
                        ? "Start with +992. Supported prefixes: 90, 91, 92, 93, 94, 98, 99, etc."
                        : "Start with + or select country. The country will auto-detect."}
                    </Text>
                  )}
                </View>

                <View style={styles.detailedReviewLabelAndInput}>
                  <Text style={[styles.labelDetailedReview, styles.label]}>
                    Detailed review *
                  </Text>
                  <TextInput
                    style={styles.inputDetailedReview}
                    placeholder="Enter your feedback here..."
                    multiline
                    numberOfLines={7}
                    value={review}
                    onChangeText={setReview}
                    textAlignVertical="top"
                    placeholderTextColor="#999"
                  />
                </View>

                <Pressable
                  style={[
                    styles.btnSubmitFeedbackForApp,
                    isLoading && styles.btnSubmitFeedbackForAppDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  <Text style={styles.btnTextSubmitFeedbackForApp}>
                    {isLoading ? "Submitting..." : "Submit"}
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ModalAddFeedbackForApp;

const styles = StyleSheet.create({
  modalAddFeedbackForAppComponent: {},
  overlayModalAddFeedbackForApp: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalAddFeedbackForAppMainBlock: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#2623D2",
  },
  headerModalAddFeedbackForApp: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    gap: 51,
  },
  btnCloseModalAddFeedbackForApp: {
    backgroundColor: "#dddddd",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  textHeaderModalAddFeedbackForApp: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  btnTextCloseModalAddFeedbackForApp: {},
  sectionModalAddFeedbackForApp: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    position: "relative",
  },
  blockUserImgAndUserFullname: {
    alignItems: "center",
    gap: 5,
    position: "absolute",
    top: -41,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  userImg: {
    width: 86,
    height: 86,
    borderRadius: 50,
  },
  userFullname: {
    fontSize: 32,
    fontWeight: "700",
  },
  scrollViewContainer: {
    marginTop: 85,
    padding: 10,
    paddingBottom: 0,
  },
  blockSectionModalAddFeedbackForAppScrollView: {
    gap: 15,
    paddingBottom: 10,
  },
  blockSectionModalAddFeedbackForApp: {},
  emailLabelIconAndInput: {},
  phoneNumberLabelIconAndInput: {},
  detailedReviewLabelAndInput: {
    gap: 9,
    paddingHorizontal: 5,
  },
  labelDetailedReview: {},
  inputDetailedReview: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 22,
    fontWeight: "400",
    borderRadius: 20,
    paddingVertical: 15,
    minHeight: 210,
    textAlignVertical: "top",
  },
  btnSubmitFeedbackForApp: {
    backgroundColor: "#2623D2",
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  btnSubmitFeedbackForAppDisabled: {
    backgroundColor: "#999",
    opacity: 0.7,
  },
  btnTextSubmitFeedbackForApp: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },

  // Styles with the same names
  labelIconAndInputBlock: {
    gap: 9,
  },

  label: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  iconAndInputBlock: {
    position: "relative",
    paddingHorizontal: 3,
  },
  icon: {
    position: "absolute",
    top: 9,
    left: 11,
    zIndex: 1,
  },
  phoneIcon: {
    position: "absolute",
    top: 11,
    left: 11,
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 22,
    fontWeight: "400",
    borderRadius: 20,
    paddingVertical: 12,
    paddingLeft: 53,
  },
  phoneInputError: {
    borderColor: "#d32f2f",
    borderWidth: 2,
  },
  phoneErrorText: {
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  phoneHintText: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 5,
    lineHeight: 16,
  },

  // Country selector styles
  countrySelectorContainer: {
    zIndex: 1000,
    marginBottom: 10,
  },
  selectorWrapper: {
    position: "relative",
  },
  selectorStyle: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  selectorBackdrop: {
    position: "absolute",
    top: -100,
    left: -20,
    right: -20,
    bottom: -100,
    zIndex: -1,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 200,
  },
  optionStyle: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
});
