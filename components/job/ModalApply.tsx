import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
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
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
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

const ModalApply = ({
  modalApply,
  setModalApply,
}: {
  modalApply: any;
  setModalApply: any;
}) => {
  const colorScheme = useColorScheme();

  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>(""); // Start empty

  const [detectedOperator, setDetectedOperator] = useState("");
  // const [showCountrySelector, setShowCountrySelector] = useState(false);

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

  // Get display text for selected country
  // const getSelectedCountryDisplay = () => {
  //   const country = getSelectedCountry();
  //   return country ? `${country.name} (${country.dialCode})` : "Select Country";
  // };

  // Set default country when modal opens
  useEffect(() => {
    if (modalApply) {
      setSelectedCountry("tj");
      setPhone("+992 ");
    }
  }, [modalApply]);

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

    // setShowCountrySelector(false);
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
              setSelectedCountry("");
              // setShowCountrySelector(false);
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

  const dynamicStyles = StyleSheet.create({
    modalApplyComponent: {},
    overlayModalApply: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalApplyMainBlock: {
      position: "absolute",
      inset: 0,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
    },
    headerModalApply: {
      flexDirection: "row",
      alignItems: "center",
      gap: 41,
      padding: 20,
    },
    closeModalBtn: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#dddddd",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 50,
    },
    textHeaderModalApply: {
      color: colorScheme === "dark" ? "#fff" : "#3E3D3D",
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
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 25,
      fontWeight: "500",
    },
    fullnameInputContainer: {
      position: "relative",
    },
    fullnameImg: {
      position: "absolute",
      top: 10,
      left: 12,
      zIndex: 1,
    },
    fullnameInput: {
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingLeft: 53,
      paddingVertical: 12,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      fontSize: 20,
      width: "100%",
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    emailBlock: {
      gap: 10,
    },
    emailLabel: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 25,
      fontWeight: "500",
    },
    emailInputContainer: {
      position: "relative",
    },
    emailImg: {
      position: "absolute",
      top: 12,
      left: 12,
      zIndex: 1,
    },
    emailInput: {
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingLeft: 53,
      paddingVertical: 12,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      fontSize: 20,
      width: "100%",
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    phoneBlock: {
      gap: 10,
    },
    phoneLabel: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 25,
      fontWeight: "500",
    },
    countrySelectorContainer: {
      zIndex: 1000,
    },
    selectedCountryContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    selectedCountryText: {
      fontSize: 16,
      color: "#333",
    },
    selectorWrapper: {
      position: "relative",
    },
    selectorStyle: {
      borderWidth: 1,
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
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
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
    },
    optionStyle: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    searchInputStyle: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    phoneInputContainer: {
      position: "relative",
    },
    phoneImg: {
      position: "absolute",
      top: 12,
      left: 12,
      zIndex: 1,
    },
    phoneInput: {
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingLeft: 53,
      paddingVertical: 12,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      fontSize: 20,
      width: "100%",
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
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
      color: colorScheme === "dark" ? "#fff" : "#666",
      fontSize: 12,
      fontStyle: "italic",
      marginTop: 5,
      lineHeight: 16,
    },
    operatorText: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 14,
      fontWeight: "500",
      marginTop: 5,
      fontStyle: "italic",
    },
    uploadCvBlock: {
      gap: 10,
    },
    uploadCVLabel: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 25,
      fontWeight: "500",
    },
    uploadCVButton: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      borderRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 15,
      alignItems: "center",
      gap: 2,
      minHeight: 60,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    uploadCVButtonSelected: {
      borderColor: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      backgroundColor: "#f0f4ff",
    },
    uploadCVButtonImg: {},
    uploadCVButtonText: {
      color: colorScheme === "dark" ? "#fff" : "#A2A2A2",
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
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
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
      color: colorScheme === "dark" ? "#fff" : "#666",
      fontSize: 12,
      fontStyle: "italic",
      marginTop: 4,
    },
    commentApplyBlock: {
      gap: 10,
    },
    commentApplyLabel: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 25,
      fontWeight: "500",
    },
    commentInput: {
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      fontSize: 20,
      width: "100%",
      height: 190,
      textAlignVertical: "top",
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
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

  return (
    <Modal
      visible={modalApply}
      animationType="slide"
      transparent
      onRequestClose={() => {
        setModalApply(false);
      }}
    >
      <Pressable
        style={dynamicStyles.overlayModalApply}
        onPress={() => setModalApply(false)}
      >
        <Pressable
          style={dynamicStyles.modalApplyMainBlock}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={dynamicStyles.headerModalApply}>
            <Pressable
              style={dynamicStyles.closeModalBtn}
              onPress={() => {
                setModalApply(false);
              }}
            >
              <FontAwesome
                name="close"
                size={32}
                color={colorScheme === "dark" ? "#fff" : "black"}
              />
            </Pressable>
            <Text style={dynamicStyles.textHeaderModalApply}>
              Apply for Job
            </Text>
          </View>

          <View style={dynamicStyles.sectionModalApply}>
            <ScrollView
              contentContainerStyle={dynamicStyles.block1SectionModalApply}
              showsVerticalScrollIndicator={false}
            >
              {/* Full Name Field */}
              <View style={dynamicStyles.fullnameBlock}>
                <Text style={dynamicStyles.fullnameLabel}>Full Name *</Text>
                <View style={dynamicStyles.fullnameInputContainer}>
                  {/* <Image
                    source={require("../../assets/tajjob/auth/userLogo.jpg")}
                    style={dynamicStyles.fullnameImg}
                  /> */}
                  <FontAwesome6
                    name="user-large"
                    size={28}
                    color={colorScheme === "dark" ? "#fff" : "black"}
                    style={dynamicStyles.fullnameImg}
                  />

                  <TextInput
                    placeholder="Enter your full name"
                    style={dynamicStyles.fullnameInput}
                    value={fullName}
                    onChangeText={setFullName}
                    returnKeyType="next"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "#999"
                    }
                  />
                </View>
              </View>

              {/* Email Field */}
              <View style={dynamicStyles.emailBlock}>
                <Text style={dynamicStyles.emailLabel}>Email *</Text>
                <View style={dynamicStyles.emailInputContainer}>
                  <MaterialCommunityIcons
                    name="email"
                    size={32}
                    color={colorScheme === "dark" ? "#fff" : "black"}
                    style={dynamicStyles.emailImg}
                  />
                  <TextInput
                    placeholder="example@gmail.com"
                    style={dynamicStyles.emailInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType="next"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "#999"
                    }
                  />
                </View>
              </View>

              <View style={dynamicStyles.phoneBlock}>
                <Text style={dynamicStyles.phoneLabel}>Phone Number *</Text>

                <View style={dynamicStyles.countrySelectorContainer}>
                  <View style={dynamicStyles.selectorWrapper}>
                    <Selector
                      options={COUNTRIES_DATA}
                      selectedValue={selectedCountry}
                      onValueChange={handleCountrySelect}
                      placeholder="Select Country"
                      searchable={true}
                      primaryColor={
                        colorScheme === "dark" ? "#00c3ff" : "#4C4ADA"
                      }
                      customArrow={
                        <Entypo
                          name="chevron-thin-down"
                          size={16}
                          color={colorScheme === "dark" ? "#fff" : "#666"}
                        />
                      }
                      searchPlaceholder="Search countries..."
                      textStyle={{
                        color: "#bebebe",
                      }}
                      style={dynamicStyles.selectorStyle}
                      optionStyle={dynamicStyles.optionStyle}
                      dropdownStyle={dynamicStyles.dropdownStyle}
                      searchInputStyle={dynamicStyles.searchInputStyle}
                    />
                    {/* Close selector when tapping outside */}
                    <Pressable style={dynamicStyles.selectorBackdrop} />
                  </View>
                </View>

                <View style={dynamicStyles.phoneInputContainer}>
                  <FontAwesome
                    name="phone"
                    size={32}
                    color={colorScheme === "dark" ? "#fff" : "black"}
                    style={dynamicStyles.phoneImg}
                  />
                  <TextInput
                    placeholder={getPhonePlaceholder()}
                    style={[
                      dynamicStyles.phoneInput,
                      phoneError && dynamicStyles.phoneInputError,
                    ]}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={handlePhoneChange}
                    returnKeyType="next"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "#999"
                    }
                  />
                </View>

                {/* {detectedOperator ? (
                  <Text style={dynamicStyles.operatorText}>
                    Detected: {detectedOperator}
                  </Text>
                ) : null} */}

                {phoneError ? (
                  <Text style={dynamicStyles.phoneErrorText}>{phoneError}</Text>
                ) : (
                  <Text style={dynamicStyles.phoneHintText}>
                    {selectedCountry === "tj"
                      ? "Start with +992. Supported prefixes: 90, 91, 92, 93, 94, 98, 99, etc."
                      : "Start with + or select country. The country will auto-detect."}
                  </Text>
                )}
              </View>

              <View style={dynamicStyles.uploadCvBlock}>
                <Text style={dynamicStyles.uploadCVLabel}>Upload CV *</Text>
                <Pressable
                  style={[
                    dynamicStyles.uploadCVButton,
                    isFileSelected && dynamicStyles.uploadCVButtonSelected,
                  ]}
                  onPress={pickDocument}
                >
                  <MaterialIcons
                    name="cloud-upload"
                    size={75}
                    color={colorScheme === "dark" ? "#fff" : "black"}
                    style={dynamicStyles.uploadCVButtonImg}
                  />
                  <Text
                    style={[
                      dynamicStyles.uploadCVButtonText,
                      isFileSelected &&
                        dynamicStyles.uploadCVButtonTextSelected,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {getFileName()}
                  </Text>
                </Pressable>

                {isFileSelected && (
                  <View style={dynamicStyles.fileActions}>
                    <View style={dynamicStyles.fileNameContainer}>
                      <Text
                        style={dynamicStyles.fileSelectedText}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                      >
                        Selected: {getFullFileName()}
                      </Text>
                    </View>
                    <Pressable
                      onPress={removeSelectedFile}
                      style={dynamicStyles.removeFileBtn}
                    >
                      <Text style={dynamicStyles.removeFileText}>Remove</Text>
                    </Pressable>
                  </View>
                )}

                <Text style={dynamicStyles.fileHint}>
                  Maximum file size: 5 MB. Supported formats: PDF, DOC, DOCX
                </Text>
              </View>

              <View style={dynamicStyles.commentApplyBlock}>
                <Text style={dynamicStyles.commentApplyLabel}>
                  Additional Comments
                </Text>
                <TextInput
                  placeholder="Enter any additional information here..."
                  style={dynamicStyles.commentInput}
                  multiline
                  numberOfLines={5}
                  value={comment}
                  onChangeText={setComment}
                  textAlignVertical="top"
                  placeholderTextColor={
                    colorScheme === "dark" ? "#fff" : "#999"
                  }
                />
              </View>

              <Pressable
                style={[
                  dynamicStyles.btnApply,
                  isLoading && dynamicStyles.btnApplyDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={dynamicStyles.btnTextApply}>
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

export default ModalApply;
