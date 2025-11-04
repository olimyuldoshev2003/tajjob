import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "expo-router";
import {
  AsYouType,
  CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import React, { useEffect, useState } from "react";
import {
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
import { Selector } from "rn-selector";
// @ts-ignore: Module 'country-telephone-data' has no type declarations
import { allCountries } from "country-telephone-data";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SignUp = () => {
  const navigation = useNavigation<any>();

  const [showAndHidePassword, setShowAndHidePassword] =
    useState<boolean>(false);
  const [showAndHideConfirmPassword, setShowAndHideConfirmPassword] =
    useState<boolean>(false);

  // Phone number states
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // Date of birth states
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateError, setDateError] = useState("");

  // Get all countries from the library and format for rn-selector
  const COUNTRIES_DATA = allCountries.map((country: any) => ({
    value: country.iso2,
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
    setSelectedCountry("tj");
    setPhone("+992 ");
  }, []);

  // Date of birth validation
  const validateDateOfBirth = (date: string) => {
    if (!date.trim()) {
      setDateError("");
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
      return;
    }

    // Check if date is not in the future
    if (dateObj > today) {
      setDateError("Date of birth cannot be in the future");
      return;
    }

    // Check if not too old (e.g., 150 years)
    const maxAgeDate = new Date(
      today.getFullYear() - 150,
      today.getMonth(),
      today.getDate()
    );

    if (dateObj < maxAgeDate) {
      setDateError("Please enter a valid date of birth");
      return;
    }

    setDateError("");
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
    } else {
      setDateError("");
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
      return;
    }

    try {
      const phoneNumberObj = parsePhoneNumberFromString(
        phoneNumber,
        countryCode.toUpperCase() as CountryCode
      );

      if (phoneNumberObj && phoneNumberObj.isValid()) {
        setPhoneError("");
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.signUpComponent}>
            <View style={styles.backToSignInWithPageBlock}>
              <FontAwesome
                name="close"
                size={47}
                color="black"
                onPress={() => {
                  navigation.navigate("SignInWith");
                }}
              />
            </View>
            <View style={styles.signUpComponentBlock}>
              <Text style={styles.textSignUp}>Sign Up</Text>
              <View style={styles.inpFieldsBlock}>
                <View style={[styles.inpFullnameBlock, styles.inpBlock]}>
                  <Image
                    source={require("../../assets/tajjob/auth/userLogo.jpg")}
                    style={[styles.fullnameImg, styles.img]}
                  />
                  <TextInput
                    placeholder="Full Name"
                    style={[styles.inpFullname, styles.input]}
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                  />
                </View>

                {/* Date of Birth Field */}
                <View style={styles.dateBlock}>
                  <View style={[styles.inpDateBirthdayBlock, styles.inpBlock]}>
                    <Image
                      source={require("../../assets/tajjob/auth/dateLogo.jpg")}
                      style={[styles.dateBirthdayImg, styles.img]}
                    />
                    <TextInput
                      placeholder="DD/MM/YYYY"
                      style={[
                        styles.inpFullname,
                        styles.input,
                        dateError && styles.dateInputError,
                      ]}
                      keyboardType="numeric"
                      autoCapitalize="none"
                      value={dateOfBirth}
                      onChangeText={handleDateChange}
                      maxLength={10}
                    />
                  </View>
                  {dateError ? (
                    <Text style={styles.dateErrorText}>{dateError}</Text>
                  ) : (
                    <Text style={styles.dateHintText}>
                      Format: DD/MM/YYYY (You must be at least 13 years old)
                    </Text>
                  )}
                </View>

                {/* Phone Number Field with Country Selector */}
                <View style={styles.phoneBlock}>
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
                    </View>
                  </View>

                  <View style={[styles.inpNumberPhoneBlock, styles.inpBlock]}>
                    <Image
                      source={require("../../assets/tajjob/auth/phoneLogo.jpg")}
                      style={[styles.numberPhoneImg, styles.img]}
                    />
                    <TextInput
                      placeholder={getPhonePlaceholder()}
                      style={[
                        styles.inpNumberPhone,
                        styles.input,
                        phoneError && styles.phoneInputError,
                      ]}
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={handlePhoneChange}
                      autoCapitalize="none"
                    />
                  </View>

                  {phoneError ? (
                    <Text style={styles.phoneErrorText}>{phoneError}</Text>
                  ) : (
                    <Text style={styles.phoneHintText}>
                      Start with + or select country. The country will
                      auto-detect.
                    </Text>
                  )}
                </View>

                <View style={[styles.inpEmailBlock, styles.inpBlock]}>
                  <Image
                    source={require("../../assets/tajjob/auth/emailLogo.jpg")}
                    style={[styles.emailImg, styles.img]}
                  />
                  <TextInput
                    placeholder="Email"
                    style={[styles.inpEmail, styles.input]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
                <View style={[styles.inpPasswordBlock, styles.inpBlock]}>
                  <Image
                    source={require("../../assets/tajjob/auth/passwordLogo.jpg")}
                    style={[styles.passwordImg, styles.img]}
                  />
                  <TextInput
                    placeholder="Password"
                    style={[styles.inpPassword, styles.input]}
                    secureTextEntry={!showAndHidePassword}
                    autoComplete="password-new"
                  />
                  {showAndHidePassword ? (
                    <AntDesign
                      name="eye-invisible"
                      size={35}
                      color="black"
                      style={styles.showAndHidePasswordIcon}
                      onPress={() => setShowAndHidePassword(false)}
                    />
                  ) : (
                    <AntDesign
                      name="eye"
                      size={35}
                      color="black"
                      style={styles.showAndHidePasswordIcon}
                      onPress={() => setShowAndHidePassword(true)}
                    />
                  )}
                </View>
                <View style={[styles.inpConfirmPasswordBlock, styles.inpBlock]}>
                  <Image
                    source={require("../../assets/tajjob/auth/passwordLogo.jpg")}
                    style={[styles.passwordImg, styles.img]}
                  />
                  <TextInput
                    placeholder="Confirm password"
                    style={[styles.inpPassword, styles.input]}
                    secureTextEntry={!showAndHideConfirmPassword}
                    autoComplete="password-new"
                  />
                  {showAndHideConfirmPassword ? (
                    <AntDesign
                      name="eye-invisible"
                      size={35}
                      color="black"
                      style={styles.showAndHidePasswordIcon}
                      onPress={() => setShowAndHideConfirmPassword(false)}
                    />
                  ) : (
                    <AntDesign
                      name="eye"
                      size={35}
                      color="black"
                      style={styles.showAndHidePasswordIcon}
                      onPress={() => setShowAndHideConfirmPassword(true)}
                    />
                  )}
                </View>
                <Pressable style={styles.btnSignUp}>
                  <Text style={styles.textBtnSignUp}>Sign Up</Text>
                </Pressable>
              </View>
              <View style={styles.blockSignInOpenPageBtn}>
                <Text style={styles.textSignIn}>Already signed up?</Text>
                <Pressable
                  style={styles.btnSignIn}
                  onPress={() => {
                    navigation.navigate("SignIn");
                  }}
                >
                  <Text style={styles.textBtnSignIn}>Sign in</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  signUpComponent: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backToSignInWithPageBlock: {
    marginTop: 5,
  },
  signUpComponentBlock: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  textSignUp: {
    fontSize: 40,
    fontWeight: "700",
  },
  inpFieldsBlock: {
    gap: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  dateBlock: {
    gap: 10,
    width: 320,
  },
  phoneBlock: {
    gap: 10,
    width: 320,
  },
  phoneLabel: {
    color: "#4C4ADA",
    fontSize: 18,
    fontWeight: "500",
  },
  countrySelectorContainer: {
    zIndex: 1000,
  },
  selectorWrapper: {
    position: "relative",
  },
  selectorStyle: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
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
  inpFullnameBlock: {},
  inpFullname: {},
  fullnameImg: {},
  inpDateBirthdayBlock: {},
  inpDateBirthday: {},
  dateBirthdayImg: {},
  inpNumberPhoneBlock: {},
  inpNumberPhone: {},
  numberPhoneImg: {},
  inpEmailBlock: {},
  emailImg: {},
  inpBlock: {
    position: "relative",
    width: 320,
  },
  inpEmail: {},
  inpPasswordBlock: {},
  passwordImg: {},
  inpPassword: {},
  showAndHidePasswordIcon: {
    position: "absolute",
    top: 9,
    right: 12,
  },
  img: {
    width: 32,
    height: 32,
    position: "absolute",
    top: 10,
    left: 6,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingLeft: 53,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
    fontSize: 20,
    width: `100%`,
  },
  phoneInputError: {
    borderColor: "#d32f2f",
    borderWidth: 2,
  },
  dateInputError: {
    borderColor: "#d32f2f",
    borderWidth: 2,
  },
  phoneErrorText: {
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  dateErrorText: {
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
  dateHintText: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 5,
    lineHeight: 16,
  },
  inpConfirmPasswordBlock: {},

  btnSignUp: {
    backgroundColor: "#3A65FF",
    paddingVertical: 12,
    borderRadius: 20,
    width: 320,
    marginTop: 10,
  },
  textBtnSignUp: {
    textAlign: "center",
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },
  blockSignInOpenPageBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    gap: 5,
  },
  textSignIn: {
    textAlign: "center",
    fontSize: 16,
    color: "#8E8E8E",
  },
  btnSignIn: {},
  textBtnSignIn: {
    color: "#3A65FF",
    fontSize: 16,
    fontWeight: "500",
  },
});
