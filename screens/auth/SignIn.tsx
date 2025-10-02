import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";

// Types
interface SignInForm {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

const SignIn = () => {
  const navigation: any = useNavigation();

  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: "",
  });
  const [showAndHidePassword, setShowAndHidePassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field: keyof SignInForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Mock API call - replace with your actual authentication service
  const mockSignInAPI = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock validation - replace with real authentication logic
    if (email === "o@gmail.com" && password === "olim2003") {
      return { success: true };
    } else {
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
      };
    }
  };

  // Handle sign in
  const handleSignIn = async () => {
    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual authentication logic
      const result = await mockSignInAPI(formData.email, formData.password);

      if (result.success) {
        // Successful sign in
        Alert.alert("Success", "Welcome back!");
        navigation.replace("Application");
        // Navigate to the main app screen
        // navigation.navigate("Home"); // Uncomment and adjust as needed

        // Reset form
        setFormData({ email: "", password: "" });
      } else {
        // Failed sign in
        setErrors({
          general: result.message || "Sign in failed. Please try again.",
        });
      }
    } catch (error) {
      // Handle network or other errors
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social sign in
  const handleSocialSignIn = (provider: string) => {
    Alert.alert(
      "Social Sign In",
      `This would normally sign you in with ${provider}. Implement your social authentication logic here.`
    );
    // Implement social authentication logic (Google, Apple, etc.)
    // This typically involves using OAuth flows or Firebase Authentication
  };

  // Handle enter key press for password field
  const handlePasswordSubmit = () => {
    handleSignIn();
  };

  return (
    <View style={styles.signInComponent}>
      <View style={styles.backToSignInWithPageBlock}>
        <FontAwesome
          name="close"
          size={47}
          color="black"
          onPress={() => {
            if (!isLoading) {
              navigation.navigate("SignInWith");
            }
          }}
        />
      </View>

      <View style={styles.signInComponentBlock}>
        <Text style={styles.textSignIn}>Sign In</Text>

        {/* General Error Message */}
        {errors.general && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.general}</Text>
          </View>
        )}

        <View style={styles.inpFieldsBlock}>
          {/* Email Input */}
          <View style={[styles.inpEmailBlock, styles.inpBlock]}>
            <Image
              source={require("../../assets/tajjob/auth/emailLogo.jpg")}
              style={[styles.emailImg, styles.img]}
            />
            <TextInput
              placeholder="Email"
              style={[
                styles.inpEmail,
                styles.input,
                errors.email && styles.inputError,
              ]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              onSubmitEditing={handlePasswordSubmit}
              editable={!isLoading}
            />
            {errors.email && (
              <Text style={styles.fieldErrorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={[styles.inpPasswordBlock, styles.inpBlock]}>
            <Image
              source={require("../../assets/tajjob/auth/passwordLogo.jpg")}
              style={[styles.passwordImg, styles.img]}
            />
            <TextInput
              placeholder="Password"
              style={[
                styles.inpPassword,
                styles.input,
                errors.password && styles.inputError,
              ]}
              secureTextEntry={!showAndHidePassword}
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
              onSubmitEditing={handlePasswordSubmit}
              editable={!isLoading}
            />
            {showAndHidePassword ? (
              <AntDesign
                name="eye-invisible"
                size={35}
                color="black"
                style={styles.showAndHidePasswordIcon}
                onPress={() => !isLoading && setShowAndHidePassword(false)}
              />
            ) : (
              <AntDesign
                name="eye"
                size={35}
                color="black"
                style={styles.showAndHidePasswordIcon}
                onPress={() => !isLoading && setShowAndHidePassword(true)}
              />
            )}
            {errors.password && (
              <Text style={styles.fieldErrorText}>{errors.password}</Text>
            )}

            <View style={styles.btnForgetPasswordBlock}>
              <Pressable
                style={styles.btnForgetPassword}
                onPress={() => {
                  if (!isLoading) {
                    navigation.navigate("ForgetPassword");
                  }
                }}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.textBtnForgetPassword,
                    isLoading && styles.disabledText,
                  ]}
                >
                  Forgot your password
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Sign In Button */}
          <Pressable
            style={[styles.btnSignIn, isLoading && styles.btnDisabled]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textBtnSignIn}>Sign In</Text>
            )}
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.block2SignIn}>
          <View style={[styles.line, styles.line1]}></View>
          <Text style={styles.textBlock3SignIn}>Or</Text>
          <View style={[styles.line, styles.line2]}></View>
        </View>

        {/* Social Sign In Options */}
        <View style={styles.block3SignIn}>
          <Pressable
            style={[
              styles.blocksSignInWith,
              isLoading && styles.socialButtonDisabled,
            ]}
            onPress={() => handleSocialSignIn("Google")}
            disabled={isLoading}
          >
            <Image
              source={require("../../assets/tajjob/auth/googleLogo.jpg")}
              style={styles.imgSignInWith}
            />
            <Text style={styles.textSignInWith}>Continue with Google</Text>
          </Pressable>

          <Pressable
            style={[
              styles.blocksSignInWith,
              isLoading && styles.socialButtonDisabled,
            ]}
            onPress={() => handleSocialSignIn("Twitter")}
            disabled={isLoading}
          >
            <Image
              source={require("../../assets/tajjob/auth/twitterLogo.jpg")}
              style={styles.imgSignInWith}
            />
            <Text style={styles.textSignInWith}>Continue with Twitter</Text>
          </Pressable>

          <Pressable
            style={[
              styles.blocksSignInWith,
              isLoading && styles.socialButtonDisabled,
            ]}
            onPress={() => handleSocialSignIn("Apple")}
            disabled={isLoading}
          >
            <Image
              source={require("../../assets/tajjob/auth/appleLogo.jpg")}
              style={styles.imgSignInWith}
            />
            <Text style={styles.textSignInWith}>Continue with iOS</Text>
          </Pressable>
        </View>

        {/* Sign Up Link */}
        <View style={styles.blockSignUpOpenPageBtn}>
          <Text style={styles.textSignUp}>Don't have an account?</Text>
          <Pressable
            style={styles.btnSignUp}
            onPress={() => {
              if (!isLoading) {
                navigation.navigate("SignUp");
              }
            }}
            disabled={isLoading}
          >
            <Text
              style={[styles.textBtnSignUp, isLoading && styles.disabledText]}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signInComponent: {
    height: `100%`,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backToSignInWithPageBlock: {
    marginTop: 5,
  },
  signInComponentBlock: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  textSignIn: {
    fontSize: 40,
    fontWeight: "700",
  },
  inpFieldsBlock: {
    gap: 20,
    marginTop: 20,
  },
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
    width: 38,
    height: 38,
    position: "absolute",
    top: 6,
    left: 6,
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
  inputError: {
    borderColor: "#ff3b30",
    borderWidth: 1,
  },
  btnForgetPasswordBlock: {
    marginTop: 5,
    display: "flex",
    alignItems: "flex-end",
  },
  btnForgetPassword: {},
  textBtnForgetPassword: {
    textAlign: "right",
    fontWeight: "300",
    fontSize: 16,
    color: "#626262",
  },
  btnSignIn: {
    backgroundColor: "#3A65FF",
    paddingVertical: 12,
    borderRadius: 20,
  },
  btnDisabled: {
    backgroundColor: "#9cb0ff",
  },
  textBtnSignIn: {
    textAlign: "center",
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },
  block2SignIn: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textSignInWith: {
    fontSize: 18,
    color: "#8E8E8E",
  },
  line: {
    height: 2,
    backgroundColor: "#D5D5D5",
    width: `42%`,
  },
  line1: {},
  textBlock3SignIn: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 10,
    color: "#747272",
  },
  line2: {},
  block3SignIn: {
    width: `100%`,
    marginTop: 10,
    gap: 15,
  },
  blocksSignInWith: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.6)",
  },
  socialButtonDisabled: {
    opacity: 0.5,
  },
  imgSignInWith: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  blockSignUpOpenPageBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    gap: 5,
  },
  textSignUp: {
    textAlign: "center",
    fontSize: 16,
    color: "#8E8E8E",
    gap: 5,
  },
  btnSignUp: {},
  textBtnSignUp: {
    color: "#3A65FF",
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "#ff3b30",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: 320,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  fieldErrorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
  },
  disabledText: {
    opacity: 0.5,
  },
});
