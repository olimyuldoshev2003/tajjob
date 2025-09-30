import React, { useState } from "react";
import {
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

const SignIn = () => {
  const navigation: any = useNavigation();

  const [showAndHidePassword, setShowAndHidePassword] =
    useState<boolean>(false);

  return (
    <View style={styles.signInComponent}>
      <View style={styles.backToSignInWithPageBlock}>
        <FontAwesome name="close" size={47} color="black" onPress={() => {
          navigation.navigate("SignInWith")
        }}/>
      </View>
      <View style={styles.signInComponentBlock}>
        <Text style={styles.textSignIn}>Sign In</Text>
        <View style={styles.inpFieldsBlock}>
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
            <View style={styles.btnForgetPasswordBlock}>
              <Pressable
                style={styles.btnForgetPassword}
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text style={styles.textBtnForgetPassword}>
                  Forgot your password
                </Text>
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.btnSignIn}>
            <Text style={styles.textBtnSignIn}>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles.block2SignIn}>
          <View style={[styles.line, styles.line1]}></View>
          <Text style={styles.textBlock3SignIn}>Or</Text>
          <View style={[styles.line, styles.line2]}></View>
        </View>
        <View style={styles.block3SignIn}>
          {/* <View style={styles.blocksSignInWith}>
          <Image
          source={require("../../assets/tajjob/auth/facebookLogo.jpg")}
          style={styles.imgSignInWith}
          />
          <Text style={styles.textSignInWith}>Continue with Facebook</Text>
          </View> */}
          <View style={styles.blocksSignInWith}>
            <Image
              source={require("../../assets/tajjob/auth/googleLogo.jpg")}
              style={styles.imgSignInWith}
            />
            <Text style={styles.textSignInWith}>Continue with Google</Text>
          </View>
          <View style={styles.blocksSignInWith}>
            <Image
              source={require("../../assets/tajjob/auth/twitterLogo.jpg")}
              style={styles.imgSignInWith}
            />
            <Text style={styles.textSignInWith}>Continue with Twiiter</Text>
          </View>
          <View style={styles.blocksSignInWith}>
            <Image
              source={require("../../assets/tajjob/auth/appleLogo.jpg")}
              style={styles.imgSignInWith}
            />
            <Text style={styles.textSignInWith}>Continue with IOS</Text>
          </View>
        </View>
        <View style={styles.blockSignUpOpenPageBtn}>
          <Text style={styles.textSignUp}>Don't have an account?</Text>
          <Pressable
            style={styles.btnSignUp}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.textBtnSignUp}>Sign up</Text>
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
    // justifyContent: "center",
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
});
