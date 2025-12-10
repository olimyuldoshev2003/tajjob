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

const EditUser = () => {
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
  }, []);

  // Find current selected country data
  const getSelectedCountry = () => {
    if (!selectedCountry) return null;
    return COUNTRIES_DATA.find(
      (country: any) => country.value === selectedCountry
    );
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

  // Country detection from phone number
  const detectCountryFromPhoneNumber = (phoneNumber: string): string | null => {
    if (!phoneNumber || !phoneNumber.startsWith("+")) {
      return null;
    }

    // Try to parse with libphonenumber first
    try {
      const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
      if (phoneNumberObj && phoneNumberObj.country) {
        return phoneNumberObj.country.toLowerCase();
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
        return country.value;
      }
    }

    return null;
  };

  // Phone number formatting and country detection
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

        // Format with new country
        try {
          const formatter = new AsYouType(
            detectedCountry.toUpperCase() as CountryCode
          );
          const formatted = formatter.input(cleaned);
          setPhone(formatted);
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
      } catch (error) {
        setPhone(cleaned);
      }

      validatePhoneNumber(cleaned, selectedCountry);
    }
  };

  // Phone number validation
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
    setIsPhoneValid(null);

    // Update phone with new country code
    const country = COUNTRIES_DATA.find((c: any) => c.value === countryCode);
    if (country) {
      setPhone(`+${country.dialCode} `);
    }
  };

  // Get phone number placeholder based on selected country
  const getPhonePlaceholder = () => {
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

    // Save profile logic here
    const userData = {
      fullName,
      dateOfBirth,
      phone,
      email,
      location,
      profileImage: userImage,
    };

    console.log("Saving user data:", userData);
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20} // Changed from -60 to 20 for Android
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.editUserComponentScrollView}
          style={styles.editUserComponent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerEditUserComponentBlock}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  userImage
                    ? typeof userImage === "string"
                      ? { uri: userImage }
                      : userImage
                    : require("../../assets/tajjob/profile/profileIcon.jpg")
                }
                style={styles.userImg}
                onError={() => {
                  Alert.alert("Error", "Failed to load image");
                  setUserImage(
                    require("../../assets/tajjob/profile/profileIcon.jpg")
                  );
                }}
              />
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#2623D2" />
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[
                  styles.btnImgUserChange,
                  isLoading && styles.btnDisabled,
                ]}
                onPress={showImagePickerOptions}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.btnTextImgUserChange}>
                    Change Profile Picture
                  </Text>
                )}
              </Pressable>

              {userImage && typeof userImage === "string" && (
                <Pressable
                  style={[
                    styles.btnRemoveImage,
                    isLoading && styles.btnDisabled,
                  ]}
                  onPress={removeImage}
                  disabled={isLoading}
                >
                  <Text style={styles.btnTextRemoveImage}>Remove</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.sectionEditUserComponentBlock}>
            <View style={styles.formEditUserlabelsAndInputs}>
              {/* Full Name Field */}
              <View style={[styles.labelAndInpBlock, styles.fullnameUserBlock]}>
                <Text style={styles.label}>Full name</Text>
                <View style={styles.inpBlock}>
                  <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      validateFullName(text);
                    }}
                    onFocus={() => handleInputFocus("fullName")}
                    placeholder="Enter your full name"
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isFullNameValid)}
                    style={styles.checkIcon}
                  />
                </View>
              </View>

              {/* Date of Birth Field */}
              <View style={[styles.labelAndInpBlock, styles.birthdayDateBlock]}>
                <Text style={styles.label}>Date of birth</Text>
                <View style={styles.inpBlock}>
                  <TextInput
                    style={[styles.input, dateError && styles.inputError]}
                    value={dateOfBirth}
                    onChangeText={handleDateChange}
                    onFocus={() => handleInputFocus("dateOfBirth")}
                    placeholder="DD/MM/YYYY"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isDateValid, !!dateError)}
                    style={styles.checkIcon}
                  />
                </View>
                {dateError ? (
                  <Text style={styles.errorText}>{dateError}</Text>
                ) : (
                  <Text style={styles.hintText}>
                    Format: DD/MM/YYYY (You must be at least 13 years old)
                  </Text>
                )}
              </View>

              {/* Phone Number Field */}
              <View style={[styles.labelAndInpBlock, styles.numberPhoneBlock]}>
                <Text style={styles.label}>Phone Number</Text>

                {/* Country Selector */}
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
                    style={styles.selectorStyle}
                    dropdownStyle={styles.dropdownStyle}
                  />
                </View>

                <View style={styles.inpBlock}>
                  <TextInput
                    style={[styles.input, phoneError && styles.inputError]}
                    value={phone}
                    onChangeText={handlePhoneChange}
                    onFocus={() => handleInputFocus("phone")}
                    placeholder={getPhonePlaceholder()}
                    keyboardType="phone-pad"
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isPhoneValid, !!phoneError)}
                    style={styles.checkIcon}
                  />
                </View>
                {phoneError ? (
                  <Text style={styles.errorText}>{phoneError}</Text>
                ) : (
                  <Text style={styles.hintText}>
                    Start with + or select country. The country will
                    auto-detect.
                  </Text>
                )}
              </View>

              {/* Email Field */}
              <View style={[styles.labelAndInpBlock, styles.emailBlock]}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inpBlock}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      validateEmail(text);
                    }}
                    onFocus={() => handleInputFocus("email")}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isEmailValid)}
                    style={styles.checkIcon}
                  />
                </View>
              </View>

              {/* Location Field */}
              <View style={[styles.labelAndInpBlock, styles.locationBlock]}>
                <Text style={styles.label}>Location</Text>
                <View style={styles.inpBlock}>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={(text) => {
                      setLocation(text);
                      validateLocation(text);
                    }}
                    onFocus={() => handleInputFocus("location")}
                    placeholder="Enter your location"
                  />
                  <Feather
                    name="check-circle"
                    size={28}
                    color={getCheckIconColor(isLocationValid)}
                    style={styles.checkIcon}
                  />
                </View>
              </View>

              {/* Save Button */}
              <Pressable style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  editUserComponentScrollView: {
    paddingBottom: 40,
  },
  editUserComponent: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#FBF9F9",
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
    color: "#747474",
    fontSize: 20,
    fontWeight: "700",
  },
  inpBlock: {
    position: "relative",
  },
  input: {
    backgroundColor: "#FBF9F9",
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
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 4,
  },

  // Country selector styles
  countrySelectorContainer: {
    marginBottom: 8,
    zIndex: 1000,
  },
  selectorStyle: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
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
