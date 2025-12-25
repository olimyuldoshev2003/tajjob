import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";

// Icons
import { Entypo, Feather } from "@expo/vector-icons";
import {
  AsYouType,
  CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
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

const EditUser = () => {
  const colorScheme = useColorScheme();

  const scrollViewRef = useRef<ScrollView>(null);
  const [userImage, setUserImage] = useState<string | null>(
    require("../../assets/tajjob/profile/profileIcon.jpg")
  );
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  // Phone number states
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [detectedOperator, setDetectedOperator] = useState("");

  // Date of birth states
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateError, setDateError] = useState("");

  // Validation states
  const [isFullNameValid, setIsFullNameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isLocationValid, setIsLocationValid] = useState<boolean | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [isDateValid, setIsDateValid] = useState<boolean | null>(null);

  // Get all countries from the library and format for rn-selector
  const COUNTRIES_DATA = allCountries.map((country: any) => ({
    value: country.iso2,
    label: `${country.name} (+${country.dialCode})`,
    emoji: country.emoji,
    dialCode: country.dialCode,
    name: country.name,
  }));

  // Initialize with default values
  useEffect(() => {
    // Set default country and phone format
    setSelectedCountry("tj");
    setPhone("+992 ");
    setPhoneError("");
    setDetectedOperator("");
  }, []);

  // Find current selected country data
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

  // Function to handle input focus and scroll
  const handleInputFocus = (inputName: string) => {
    // Calculate scroll position based on input field
    let scrollPosition = 0;

    switch (inputName) {
      case "fullName":
        scrollPosition = 0;
        break;
      case "dateOfBirth":
        scrollPosition = 100;
        break;
      case "phone":
        scrollPosition = 200;
        break;
      case "email":
        scrollPosition = 300;
        break;
      case "location":
        scrollPosition = 400;
        break;
      default:
        scrollPosition = 0;
    }

    // Scroll after a small delay to ensure keyboard is open
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: scrollPosition,
          animated: true,
        });
      }
    }, 300);
  };

  // Full Name validation
  const validateFullName = (name: string) => {
    if (!name.trim()) {
      setIsFullNameValid(null);
      return;
    }

    const isValid = name.trim().length >= 2 && name.trim().length <= 50;
    setIsFullNameValid(isValid);
  };

  // Email validation
  const validateEmail = (email: string) => {
    if (!email.trim()) {
      setIsEmailValid(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email.trim());
    setIsEmailValid(isValid);
  };

  // Location validation
  const validateLocation = (location: string) => {
    if (!location.trim()) {
      setIsLocationValid(null);
      return;
    }

    const isValid =
      location.trim().length >= 2 && location.trim().length <= 100;
    setIsLocationValid(isValid);
  };

  // Date of birth validation
  const validateDateOfBirth = (date: string) => {
    if (!date.trim()) {
      setDateError("");
      setIsDateValid(null);
      return;
    }

    // Test multiple date formats
    const dateFormats = [
      /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\.\d{2}\.\d{4}$/, // DD.MM.YYYY
    ];

    const isValidFormat = dateFormats.some((format) => format.test(date));

    if (!isValidFormat) {
      setDateError("Please use format: DD/MM/YYYY or DD-MM-YYYY");
      setIsDateValid(false);
      return;
    }

    // Parse the date
    let day, month, year;

    if (date.includes("/")) {
      [day, month, year] = date.split("/").map(Number);
    } else if (date.includes("-")) {
      if (date.split("-")[0].length === 4) {
        // YYYY-MM-DD format
        [year, month, day] = date.split("-").map(Number);
      } else {
        // DD-MM-YYYY format
        [day, month, year] = date.split("-").map(Number);
      }
    } else if (date.includes(".")) {
      [day, month, year] = date.split(".").map(Number);
    }

    // Validate date components
    if (!day || !month || !year) {
      setDateError("Invalid date format");
      setIsDateValid(false);
      return;
    }

    // Check if date is valid
    const dateObj = new Date(year, month - 1, day);
    const isValidDate =
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day;

    if (!isValidDate) {
      setDateError("Please enter a valid date");
      setIsDateValid(false);
      return;
    }

    // Check if user is at least 13 years old
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );

    if (dateObj > minAgeDate) {
      setDateError("You must be at least 13 years old");
      setIsDateValid(false);
      return;
    }

    // Check if date is not in the future
    if (dateObj > today) {
      setDateError("Date of birth cannot be in the future");
      setIsDateValid(false);
      return;
    }

    setDateError("");
    setIsDateValid(true);
  };

  // Handle date input change with auto-formatting
  const handleDateChange = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, "");

    // Auto-format as user types
    let formatted = cleaned;

    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
        2,
        4
      )}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    setDateOfBirth(formatted);

    // Validate only when we have a complete date or user is done typing
    if (cleaned.length === 8) {
      validateDateOfBirth(formatted);
    } else if (cleaned.length > 0 && cleaned.length < 8) {
      setDateError("Please complete the date");
      setIsDateValid(false);
    } else {
      setDateError("");
      setIsDateValid(null);
    }
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
      setIsPhoneValid(null);
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
      setIsPhoneValid(null);
      return;
    }

    try {
      const phoneNumberObj = parsePhoneNumberFromString(
        phoneNumber,
        countryCode.toUpperCase() as CountryCode
      );

      if (phoneNumberObj && phoneNumberObj.isValid()) {
        setPhoneError("");
        setIsPhoneValid(true);

        // Only validate Tajik prefix when number is complete (11+ digits)
        if (countryCode === "tj" && phoneNumber.startsWith("+992")) {
          const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
          if (cleanNumber.length >= 11) {
            const operator = detectTajikOperator(phoneNumber);
            if (!operator) {
              setPhoneError("Invalid Tajik mobile prefix");
              setIsPhoneValid(false);
            }
          }
        }
      } else {
        // Don't show error for incomplete numbers during typing
        const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
        if (cleanNumber.length < 8) {
          setPhoneError(""); // Too short, don't show error yet
          setIsPhoneValid(null);
        } else {
          setPhoneError("Please enter a valid phone number");
          setIsPhoneValid(false);
        }
      }
    } catch (error) {
      // Don't show error for incomplete numbers during typing
      const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
      if (cleanNumber.length < 8) {
        setPhoneError("");
        setIsPhoneValid(null);
      } else {
        setPhoneError("Please enter a valid phone number");
        setIsPhoneValid(false);
      }
    }
  };

  // Handle country selection
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setPhoneError("");
    setDetectedOperator("");
    setIsPhoneValid(null);

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

    const country = getSelectedCountry();
    return `Enter phone number (${country?.dialCode || "+1"})`;
  };

  // Get check icon color based on validation state
  const getCheckIconColor = (isValid: boolean | null, hasError?: boolean) => {
    if (isValid === true) return "#4CAF50"; // Green for valid
    if (isValid === false || hasError) return "#FF3B30"; // Red for invalid
    return "#bebebe"; // Gray for empty/not validated
  };

  // Image picker functions
  const pickImage = async () => {
    try {
      setIsLoading(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to change your profile picture!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];

        const fileExtension = selectedImage.uri.split(".").pop()?.toLowerCase();
        const allowedTypes = ["jpg", "jpeg", "png", "heic", "heif"];

        if (!fileExtension || !allowedTypes.includes(fileExtension)) {
          Alert.alert(
            "Invalid File Type",
            "Please select only JPG or PNG images."
          );
          return;
        }

        if (
          selectedImage.fileSize &&
          selectedImage.fileSize > 10 * 1024 * 1024
        ) {
          Alert.alert(
            "File Too Large",
            "Please select an image smaller than 10MB."
          );
          return;
        }

        setUserImage(selectedImage.uri);
        Alert.alert("Success", "Profile picture updated successfully!", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      setIsLoading(true);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera permissions to take a photo!"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const takenPhoto = result.assets[0];
        setUserImage(takenPhoto.uri);
        Alert.alert("Success", "Profile picture updated successfully!", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      {
        text: "Choose from Gallery",
        onPress: pickImage,
      },
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const removeImage = () => {
    if (userImage && typeof userImage === "string") {
      Alert.alert(
        "Remove Profile Picture",
        "Are you sure you want to remove your profile picture?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              setUserImage(
                require("../../assets/tajjob/profile/profileIcon.jpg")
              );
              Alert.alert("Success", "Profile picture removed!");
            },
          },
        ]
      );
    }
  };

  const handleSaveProfile = () => {
    // Validate all fields before saving
    if (dateOfBirth && dateError) {
      Alert.alert(
        "Validation Error",
        "Please fix the date of birth error before saving."
      );
      return;
    }

    if (phone && phoneError) {
      Alert.alert(
        "Validation Error",
        "Please fix the phone number error before saving."
      );
      return;
    }

    if (phone && selectedCountry === "tj") {
      const cleanNumber = phone.replace(/[^\d]/g, "");
      if (cleanNumber.length >= 11) {
        const operator = detectTajikOperator(phone);
        if (!operator) {
          Alert.alert(
            "Validation Error",
            "Please enter a valid Tajik phone number with correct mobile prefix."
          );
          return;
        }
      }
    }

    // Save profile logic here
    const userData = {
      fullName,
      dateOfBirth,
      phone,
      email,
      location,
      profileImage: userImage,
      country: selectedCountry,
      detectedOperator,
    };

    console.log("Saving user data:", userData);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    editUserComponentScrollView: {
      paddingBottom:80,
    },
    editUserComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
      padding: 12,
    },
    headerEditUserComponentBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 30,
    },
    imageContainer: {
      position: "relative",
    },
    userImg: {
      width: 117,
      height: 117,
      borderRadius: 100,
      borderWidth: 3,
    },
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      gap: 12,
    },
    btnImgUserChange: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#FBF9F9",
      padding: 10,
      elevation: 8,
      borderRadius: 20,
    },
    btnRemoveImage: {
      backgroundColor: "#FF3B30",
      paddingVertical: 10,
      paddingHorizontal: 16,
      elevation: 4,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 40,
    },
    btnDisabled: {
      opacity: 0.6,
    },
    btnTextImgUserChange: {
      fontSize: 16,
      fontWeight: "600",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    btnTextRemoveImage: {
      fontSize: 14,
      fontWeight: "600",
      color: "#fff",
    },
    sectionEditUserComponentBlock: {
      marginTop: 20,
    },
    formEditUserlabelsAndInputs: {
      gap: 17,
    },
    fullnameUserBlock: {},
    birthdayDateBlock: {},
    numberPhoneBlock: {},
    emailBlock: {},
    locationBlock: {},

    // Form elements
    labelAndInpBlock: {
      gap: 8,
    },
    label: {
      color: colorScheme === "dark" ? "#fff" : "#747474",
      fontSize: 20,
      fontWeight: "700",
    },
    inpBlock: {
      position: "relative",
    },
    input: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#FBF9F9",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: 17,
      paddingRight: 46,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    inputError: {
      borderColor: "#FF3B30",
      borderWidth: 1,
    },
    checkIcon: {
      position: "absolute",
      right: 10,
      top: 9,
    },
    errorText: {
      color: "#FF3B30",
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
    operatorText: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 14,
      fontWeight: "500",
      marginTop: 4,
      fontStyle: "italic",
    },

    // Country selector styles
    countrySelectorContainer: {
      marginBottom: 8,
      zIndex: 1000,
    },
    selectorStyle: {
      borderWidth: 1,
      borderColor: colorScheme === "dark" ? "#333" : "#fff",
      borderRadius: 10,
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
  

    // Save button
    saveButton: {
      backgroundColor: "#2623D2",
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      elevation: 4,
    },
    saveButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <KeyboardAvoidingView
      style={dynamicStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={dynamicStyles.editUserComponentScrollView}
          style={dynamicStyles.editUserComponent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={dynamicStyles.headerEditUserComponentBlock}>
            <View style={dynamicStyles.imageContainer}>
              <Image
                source={
                  userImage
                    ? typeof userImage === "string"
                      ? { uri: userImage }
                      : userImage
                    : require("../../assets/tajjob/profile/profileIcon.jpg")
                }
                style={dynamicStyles.userImg}
                onError={() => {
                  Alert.alert("Error", "Failed to load image");
                  setUserImage(
                    require("../../assets/tajjob/profile/profileIcon.jpg")
                  );
                }}
              />
              {isLoading && (
                <View style={dynamicStyles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#2623D2" />
                </View>
              )}
            </View>

            <View style={dynamicStyles.buttonContainer}>
              <Pressable
                style={[
                  dynamicStyles.btnImgUserChange,
                  isLoading && dynamicStyles.btnDisabled,
                ]}
                onPress={showImagePickerOptions}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={dynamicStyles.btnTextImgUserChange}>
                    Change Profile Picture
                  </Text>
                )}
              </Pressable>

              {userImage && typeof userImage === "string" && (
                <Pressable
                  style={[
                    dynamicStyles.btnRemoveImage,
                    isLoading && dynamicStyles.btnDisabled,
                  ]}
                  onPress={removeImage}
                  disabled={isLoading}
                >
                  <Text style={dynamicStyles.btnTextRemoveImage}>Remove</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View style={dynamicStyles.sectionEditUserComponentBlock}>
            <View style={dynamicStyles.formEditUserlabelsAndInputs}>
              {/* Full Name Field */}
              <View
                style={[
                  dynamicStyles.labelAndInpBlock,
                  dynamicStyles.fullnameUserBlock,
                ]}
              >
                <Text style={dynamicStyles.label}>Full name</Text>
                <View style={dynamicStyles.inpBlock}>
                  <TextInput
                    style={dynamicStyles.input}
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      validateFullName(text);
                    }}
                    onFocus={() => handleInputFocus("fullName")}
                    placeholder="Enter your full name"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "gray"
                    }
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isFullNameValid)}
                    style={dynamicStyles.checkIcon}
                  />
                </View>
              </View>

              {/* Date of Birth Field */}
              <View
                style={[
                  dynamicStyles.labelAndInpBlock,
                  dynamicStyles.birthdayDateBlock,
                ]}
              >
                <Text style={dynamicStyles.label}>Date of birth</Text>
                <View style={dynamicStyles.inpBlock}>
                  <TextInput
                    style={[
                      dynamicStyles.input,
                      dateError && dynamicStyles.inputError,
                    ]}
                    value={dateOfBirth}
                    onChangeText={handleDateChange}
                    onFocus={() => handleInputFocus("dateOfBirth")}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "gray"
                    }
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isDateValid, !!dateError)}
                    style={dynamicStyles.checkIcon}
                  />
                </View>
                {dateError ? (
                  <Text style={dynamicStyles.errorText}>{dateError}</Text>
                ) : (
                  <Text style={dynamicStyles.hintText}>
                    Format: DD/MM/YYYY (You must be at least 13 years old)
                  </Text>
                )}
              </View>

              {/* Phone Number Field */}
              <View
                style={[
                  dynamicStyles.labelAndInpBlock,
                  dynamicStyles.numberPhoneBlock,
                ]}
              >
                <Text style={dynamicStyles.label}>Phone Number</Text>

                {/* Country Selector */}
                <View style={dynamicStyles.countrySelectorContainer}>
                  <Selector
                    options={COUNTRIES_DATA}
                    selectedValue={selectedCountry}
                    onValueChange={handleCountrySelect}
                    placeholder="Select Country"
                    searchable={true}
                    primaryColor={colorScheme === "dark" ? "#00c3ff":"#4C4ADA"}
                    customArrow={
                      <Entypo
                        name="chevron-thin-down"
                        size={16}
                        color={colorScheme === "dark" ? "#fff" : "#666"}
                      />
                    }
                    searchPlaceholder="Search countries..."
                    optionStyle={dynamicStyles.optionStyle}
                    style={dynamicStyles.selectorStyle}
                    dropdownStyle={dynamicStyles.dropdownStyle}
                    textStyle={{
                      color: "#bebebe",
                    }}
                    searchInputStyle={dynamicStyles.searchInputStyle}
                  />
                </View>

                <View style={dynamicStyles.inpBlock}>
                  <TextInput
                    style={[
                      dynamicStyles.input,
                      phoneError && dynamicStyles.inputError,
                    ]}
                    value={phone}
                    onChangeText={handlePhoneChange}
                    onFocus={() => handleInputFocus("phone")}
                    placeholder={getPhonePlaceholder()}
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "gray"
                    }
                    keyboardType="phone-pad"
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isPhoneValid, !!phoneError)}
                    style={dynamicStyles.checkIcon}
                  />
                </View>

                {/* Display detected operator */}
                {detectedOperator && !phoneError && (
                  <Text style={dynamicStyles.operatorText}>
                    Detected: {detectedOperator}
                  </Text>
                )}

                {phoneError ? (
                  <Text style={dynamicStyles.errorText}>{phoneError}</Text>
                ) : (
                  <Text style={dynamicStyles.hintText}>
                    {selectedCountry === "tj"
                      ? "Start with +992. Supported prefixes: 90, 91, 92, 93, 94, 98, 99, etc."
                      : "Start with + or select country. The country will auto-detect."}
                  </Text>
                )}
              </View>

              {/* Email Field */}
              <View
                style={[
                  dynamicStyles.labelAndInpBlock,
                  dynamicStyles.emailBlock,
                ]}
              >
                <Text style={dynamicStyles.label}>Email</Text>
                <View style={dynamicStyles.inpBlock}>
                  <TextInput
                    style={dynamicStyles.input}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      validateEmail(text);
                    }}
                    onFocus={() => handleInputFocus("email")}
                    placeholder="Enter your email"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "gray"
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isEmailValid)}
                    style={dynamicStyles.checkIcon}
                  />
                </View>
              </View>

              {/* Location Field */}
              <View
                style={[
                  dynamicStyles.labelAndInpBlock,
                  dynamicStyles.locationBlock,
                ]}
              >
                <Text style={dynamicStyles.label}>Location</Text>
                <View style={dynamicStyles.inpBlock}>
                  <TextInput
                    style={dynamicStyles.input}
                    value={location}
                    onChangeText={(text) => {
                      setLocation(text);
                      validateLocation(text);
                    }}
                    onFocus={() => handleInputFocus("location")}
                    placeholder="Enter your location"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#fff" : "gray"
                    }
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isLocationValid)}
                    style={dynamicStyles.checkIcon}
                  />
                </View>
              </View>

              {/* Save Button */}
              <Pressable
                style={dynamicStyles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={dynamicStyles.saveButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditUser;
