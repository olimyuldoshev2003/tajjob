import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import {
  AsYouType,
  CountryCode,
  getExampleNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import React, { useState } from "react";
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

// Tajik SIM card prefixes and operators data
const TAJIK_PREFIXES = {
  // Current & Primary prefixes
  "90": "Tcell",
  "91": "Tcell",
  "92": "Tcell",
  "93": "Megafon Tajikistan",
  "94": "Megafon Tajikistan",
  "98": "Babilon-Mobile",
  "99": "Babilon-Mobile",
  "88": "ZET-Mobile",
  "87": "ZET-Mobile",
  "77": "O-Mobile",
  "78": "O-Mobile",
  // Current (Niche/Legacy)
  "44": "Various MVNOs",
  "55": "Tcell (ex-Beeline)",
  // Historical Legacy (3-digit)
  "550": "Tcell (ex-Beeline)",
  "918": "Tcell",
  "917": "Tcell",
  "933": "Megafon Tajikistan",
  "934": "Megafon Tajikistan",
};

const ModalApply = ({
  modalApply,
  setModalApply,
}: {
  modalApply: any;
  setModalApply: any;
}) => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [detectedOperator, setDetectedOperator] = useState<string>("");

  // Get all countries from the library and format for rn-selector
  const COUNTRIES_DATA = allCountries.map((country: any) => ({
    value: country.iso2,
    label: `${country.name} (${country.dialCode})`,
    emoji: country.emoji,
    dialCode: country.dialCode,
    name: country.name,
  }));

  // Find current selected country
  const getSelectedCountry = () => {
    if (!selectedCountry) return null;
    return COUNTRIES_DATA.find(
      (country: any) => country.value === selectedCountry
    );
  };

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
      return "TJ";
    }

    // Try to parse with libphonenumber first (most accurate)
    try {
      const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
      if (phoneNumberObj && phoneNumberObj.country) {
        if (phoneNumberObj.country !== "TJ") {
          setDetectedOperator("");
        }
        return phoneNumberObj.country;
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
        if (country.value !== "TJ") {
          setDetectedOperator("");
        }
        return country.value;
      }
    }

    setDetectedOperator("");
    return null;
  };

  // Enhanced phone number formatting with Tajik prefix support
  // FIXED: Enhanced phone number formatting with proper country switching
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
          const formatter = new AsYouType(detectedCountry as CountryCode);
          const formatted = formatter.input(cleaned);
          setPhone(formatted);

          // Auto-detect operator for Tajik numbers
          if (detectedCountry === "TJ" && formatted.startsWith("+992")) {
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

    // No country change - format with current country
    if (selectedCountry) {
      try {
        const formatter = new AsYouType(selectedCountry as CountryCode);
        const formatted = formatter.input(cleaned);
        setPhone(formatted);

        // Auto-detect operator for Tajik numbers
        if (selectedCountry === "TJ" && formatted.startsWith("+992")) {
          const operator = detectTajikOperator(formatted);
          setDetectedOperator(operator);
        }
      } catch (error) {
        setPhone(cleaned);
      }

      validatePhoneNumber(cleaned, selectedCountry);
    }
  };

  // FIXED validation function
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
        countryCode as CountryCode
      );

      if (phoneNumberObj && phoneNumberObj.isValid()) {
        setPhoneError("");

        // Only validate Tajik prefix when number is complete (11+ digits)
        if (countryCode === "TJ" && phoneNumber.startsWith("+992")) {
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

  // FIXED: Handle country selection - ALWAYS clear phone number
  // FIXED: Handle country selection
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setPhoneError("");
    setDetectedOperator("");

    // Only clear phone if user explicitly selects a different country
    // Don't clear if it's the same country or if we have a valid number
    if (
      phone &&
      !phone.startsWith(
        `+${COUNTRIES_DATA.find(
          (c: any) => c.value === countryCode
        )?.dialCode.replace("+", "")}`
      )
    ) {
      setPhone("");
    }
  };

  // Get phone number placeholder based on selected country
  const getPhonePlaceholder = () => {
    if (!selectedCountry) {
      return "Please select a country first";
    }

    if (selectedCountry === "TJ") {
      return "e.g., +992 93 123 4567";
    }

    try {
      const exampleNumber = getExampleNumber(
        selectedCountry as CountryCode,
        examples
      );
      if (exampleNumber) {
        return exampleNumber.formatNational();
      }
    } catch (error) {
      // Fallback to generic placeholder
    }

    const country = getSelectedCountry();
    return `Enter phone number (${country?.dialCode || "+1"})`;
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "pdf",
        "doc",
        "docx",
      ];

      const fileExtension = file.name?.split(".").pop()?.toLowerCase();
      const isFileTypeValid =
        allowedTypes.includes(file.mimeType || "") ||
        (fileExtension && allowedTypes.includes(fileExtension));

      if (!isFileTypeValid) {
        Alert.alert(
          "Invalid File Type",
          "Please select only PDF, DOC, or DOCX files."
        );
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size && file.size > maxSize) {
        Alert.alert(
          "File Too Large",
          "Please select a file smaller than 5 MB."
        );
        return;
      }

      setSelectedFile(result);
    } catch (err) {
      console.error("Error picking document:", err);
      Alert.alert("Error", "Failed to select file. Please try again.");
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Please enter your full name.");
      return;
    }

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
        selectedCountry as CountryCode
      );

      if (!phoneNumber || !phoneNumber.isValid()) {
        setPhoneError("Please enter a valid phone number");
        Alert.alert("Validation Error", "Please enter a valid phone number.");
        return;
      }

      // FIXED: Additional validation for Tajik numbers - only when complete
      if (selectedCountry === "TJ") {
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

    if (!selectedFile || selectedFile.canceled) {
      Alert.alert("Validation Error", "Please upload your CV.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const file = selectedFile.assets[0];
      console.log("Submitting application with:", {
        fullName,
        email,
        phone,
        country: selectedCountry,
        detectedOperator,
        comment,
        fileName: file.name,
        fileUri: file.uri,
        fileSize: file.size,
        fileType: file.mimeType,
      });

      Alert.alert(
        "Application Submitted!",
        "Your job application has been submitted successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              setModalApply(false);
              setFullName("");
              setEmail("");
              setPhone("");
              setComment("");
              setSelectedFile(null);
              setIsLoading(false);
              setPhoneError("");
              setDetectedOperator("");
              setSelectedCountry(null);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error submitting application:", error);
      Alert.alert("Error", "Failed to submit application. Please try again.");
      setIsLoading(false);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const isFileSelected = selectedFile && !selectedFile.canceled;

  const truncateFileName = (fileName: string, maxLength: number = 30) => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split(".").pop();
    const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
    const truncatedName = nameWithoutExtension.slice(
      0,
      maxLength - 3 - (extension?.length || 0)
    );

    return `${truncatedName}...${extension}`;
  };

  const getFileName = () => {
    if (!isFileSelected) return "Browse File (PDF, DOC, DOCX)";

    const fileName = selectedFile.assets[0].name;
    return `File Selected: ${truncateFileName(fileName, 25)}`;
  };

  const getFullFileName = () => {
    if (!isFileSelected) return "";
    return selectedFile.assets[0].name;
  };

  return (
    <Modal
      visible={modalApply}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalApply(false);
      }}
    >
      <Pressable
        style={styles.overlayModalApply}
        onPress={() => setModalApply(false)}
      >
        <Pressable
          style={styles.modalApplyMainBlock}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.headerModalApply}>
            <Pressable
              style={styles.closeModalBtn}
              onPress={() => {
                setModalApply(false);
              }}
            >
              <FontAwesome name="close" size={32} color="black" />
            </Pressable>
            <Text style={styles.textHeaderModalApply}>Apply for Job</Text>
          </View>

          <View style={styles.sectionModalApply}>
            <ScrollView
              contentContainerStyle={styles.block1SectionModalApply}
              showsVerticalScrollIndicator={false}
            >
              {/* Full Name Field */}
              <View style={styles.fullnameBlock}>
                <Text style={styles.fullnameLabel}>Full Name *</Text>
                <View style={styles.fullnameInputContainer}>
                  <Image
                    source={require("../../assets/tajjob/auth/userLogo.jpg")}
                    style={styles.fullnameImg}
                  />
                  <TextInput
                    placeholder="Enter your full name"
                    style={styles.fullnameInput}
                    value={fullName}
                    onChangeText={setFullName}
                    returnKeyType="next"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              {/* Email Field */}
              <View style={styles.emailBlock}>
                <Text style={styles.emailLabel}>Email *</Text>
                <View style={styles.emailInputContainer}>
                  <Image
                    source={require("../../assets/tajjob/auth/emailLogo.jpg")}
                    style={styles.emailImg}
                  />
                  <TextInput
                    placeholder="example@gmail.com"
                    style={styles.emailInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType="next"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.phoneBlock}>
                <Text style={styles.phoneLabel}>Phone Number *</Text>

                <View style={styles.countrySelectorContainer}>
                  <Selector
                    options={COUNTRIES_DATA}
                    selectedValue={selectedCountry}
                    onValueChange={handleCountrySelect}
                    placeholder="Select Country"
                    searchable={true}
                    primaryColor="#4C4ADA"
                    customArrow={
                      <Entypo name="chevron-thin-down" size={16} color="#666" />
                    }
                    optionStyle={styles.optionStyle}
                    searchPlaceholder="Search countries..."
                  />
                </View>

                <View style={styles.phoneInputContainer}>
                  <Image
                    source={require("../../assets/tajjob/auth/phoneLogo.jpg")}
                    style={[
                      styles.phoneImg,
                      !selectedCountry && styles.phoneImgDisabled,
                    ]}
                  />
                  <TextInput
                    placeholder={getPhonePlaceholder()}
                    style={[
                      styles.phoneInput,
                      phoneError && styles.phoneInputError,
                      !selectedCountry && styles.phoneInputDisabled,
                    ]}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={handlePhoneChange}
                    returnKeyType="next"
                    editable={!!selectedCountry}
                    placeholderTextColor="#999"
                  />
                </View>

                {detectedOperator ? (
                  <Text style={styles.operatorText}>
                    Detected: {detectedOperator}
                  </Text>
                ) : null}

                {phoneError ? (
                  <Text style={styles.phoneErrorText}>{phoneError}</Text>
                ) : (
                  <Text style={styles.phoneHintText}>
                    {!selectedCountry
                      ? "Please select a country first to enter phone number"
                      : selectedCountry === "TJ"
                      ? "Start with +992. Supported prefixes: 90, 91, 92 (Tcell), 93, 94 (Megafon), etc."
                      : "Start with + or select country. The country will auto-detect."}
                  </Text>
                )}
              </View>

              <View style={styles.uploadCvBlock}>
                <Text style={styles.uploadCVLabel}>Upload CV *</Text>
                <Pressable
                  style={[
                    styles.uploadCVButton,
                    isFileSelected && styles.uploadCVButtonSelected,
                  ]}
                  onPress={pickDocument}
                >
                  <Image
                    source={require("../../assets/tajjob/job/upload-cv-img.jpg")}
                    style={styles.uploadCVButtonImg}
                  />
                  <Text
                    style={[
                      styles.uploadCVButtonText,
                      isFileSelected && styles.uploadCVButtonTextSelected,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {getFileName()}
                  </Text>
                </Pressable>

                {isFileSelected && (
                  <View style={styles.fileActions}>
                    <View style={styles.fileNameContainer}>
                      <Text
                        style={styles.fileSelectedText}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                      >
                        Selected: {getFullFileName()}
                      </Text>
                    </View>
                    <Pressable
                      onPress={removeSelectedFile}
                      style={styles.removeFileBtn}
                    >
                      <Text style={styles.removeFileText}>Remove</Text>
                    </Pressable>
                  </View>
                )}

                <Text style={styles.fileHint}>
                  Maximum file size: 5 MB. Supported formats: PDF, DOC, DOCX
                </Text>
              </View>

              <View style={styles.commentApplyBlock}>
                <Text style={styles.commentApplyLabel}>
                  Additional Comments
                </Text>
                <TextInput
                  placeholder="Enter any additional information here..."
                  style={styles.commentInput}
                  multiline
                  numberOfLines={5}
                  value={comment}
                  onChangeText={setComment}
                  textAlignVertical="top"
                  placeholderTextColor="#999"
                />
              </View>

              <Pressable
                style={[styles.btnApply, isLoading && styles.btnApplyDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.btnTextApply}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

// STYLES REMAIN EXACTLY THE SAME - NO CHANGES
const styles = StyleSheet.create({
  modalApplyComponent: {},
  overlayModalApply: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalApplyMainBlock: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#fff",
  },
  headerModalApply: {
    flexDirection: "row",
    alignItems: "center",
    gap: 41,
    padding: 20,
  },
  closeModalBtn: {
    backgroundColor: "#dddddd",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  textHeaderModalApply: {
    color: "#3E3D3D",
    fontSize: 25,
    fontWeight: "600",
  },
  sectionModalApply: {},
  block1SectionModalApply: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 20,
  },
  fullnameBlock: {
    gap: 10,
  },
  fullnameLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  fullnameInputContainer: {
    position: "relative",
  },
  fullnameImg: {
    width: 38,
    height: 38,
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 1,
  },
  fullnameInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingLeft: 53,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  emailBlock: {
    gap: 10,
  },
  emailLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  emailInputContainer: {
    position: "relative",
  },
  emailImg: {
    width: 38,
    height: 38,
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 1,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingLeft: 53,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  phoneBlock: {
    gap: 10,
  },
  phoneLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  countrySelectorContainer: {
    zIndex: 1000,
  },
  optionStyle: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  phoneInputContainer: {
    position: "relative",
  },
  phoneImg: {
    width: 31,
    height: 31,
    position: "absolute",
    top: 11,
    left: 11,
    zIndex: 1,
  },
  phoneImgDisabled: {
    opacity: 0.5,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingLeft: 53,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  phoneInputDisabled: {
    backgroundColor: "#f5f5f5",
    color: "#999",
    borderColor: "#ddd",
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
  operatorText: {
    color: "#4C4ADA",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    fontStyle: "italic",
  },
  uploadCvBlock: {
    gap: 10,
  },
  uploadCVLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  uploadCVButton: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    gap: 2,
    minHeight: 60,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
  },
  uploadCVButtonSelected: {
    borderColor: "#4C4ADA",
    backgroundColor: "#f0f4ff",
  },
  uploadCVButtonImg: {},
  uploadCVButtonText: {
    color: "#A2A2A2",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    flex: 1,
  },
  uploadCVButtonTextSelected: {
    color: "#666",
  },
  fileActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },
  fileNameContainer: {
    flex: 1,
    marginRight: 10,
  },
  fileSelectedText: {
    color: "#4C4ADA",
    fontSize: 14,
    fontWeight: "500",
  },
  removeFileBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ffebee",
    borderRadius: 8,
    flexShrink: 0,
  },
  removeFileText: {
    color: "#d32f2f",
    fontSize: 12,
    fontWeight: "500",
  },
  fileHint: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 4,
  },
  commentApplyBlock: {
    gap: 10,
  },
  commentApplyLabel: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: "100%",
    height: 190,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  btnApply: {
    backgroundColor: "#2623D2",
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 30,
  },
  btnApplyDisabled: {
    backgroundColor: "#999",
    opacity: 0.7,
  },
  btnTextApply: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },
});

export default ModalApply;
