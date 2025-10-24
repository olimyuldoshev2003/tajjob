import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SignUp = () => {
  const navigation = useNavigation<any>();

  const [showAndHidePassword, setShowAndHidePassword] =
    useState<boolean>(false);
  const [showAndHideConfirmPassword, setShowAndHideConfirmPassword] =
    useState<boolean>(false);

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
                <View style={[styles.inpDateBirthdayBlock, styles.inpBlock]}>
                  <Image
                    source={require("../../assets/tajjob/auth/dateLogo.jpg")}
                    style={[styles.dateBirthdayImg, styles.img]}
                  />
                  <TextInput
                    placeholder="Date Birthday"
                    style={[styles.inpFullname, styles.input]}
                    keyboardType="default"
                    autoCapitalize="none"
                  />
                </View>
                <View style={[styles.inpNumberPhoneBlock, styles.inpBlock]}>
                  <Image
                    source={require("../../assets/tajjob/auth/phoneLogo.jpg")}
                    style={[styles.numberPhoneImg, styles.img]}
                  />
                  <TextInput
                    placeholder="Number Phone"
                    style={[styles.inpNumberPhone, styles.input]}
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
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
