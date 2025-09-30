import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const SignInWith = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.signInWithComponent}>
      <View style={styles.block1SignIn}>
        <Image
          source={require("../../assets/tajjob/auth/sign-in-with.jpg")}
          style={styles.imgBlock1}
        />
        <Text style={styles.textBlock1}>Come and join</Text>
      </View>
      <View style={styles.block2SignIn}>
        <View style={styles.blocksSignInWith}>
          <Image
            source={require("../../assets/tajjob/auth/facebookLogo.jpg")}
            style={styles.imgSignInWith}
          />
          <Text style={styles.textSignInWith}>Continue with Facebook</Text>
        </View>
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
      <View style={styles.block3SignIn}>
        <View style={[styles.line, styles.line1]}></View>
        <Text style={styles.textBlock3SignIn}>Or</Text>
        <View style={[styles.line, styles.line2]}></View>
      </View>
      <View style={styles.block4SignIn}>
        <Pressable
          style={styles.btnSignInWithEmail}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.textBtnSignInWithEmail}>Login with email</Text>
        </Pressable>
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

export default SignInWith;

const styles = StyleSheet.create({
  signInWithComponent: {
    backgroundColor: "#fff",
    height: `100%`,
    paddingHorizontal: 20,
    paddingTop: 35
  },
  block1SignIn: {
    alignItems: "center",
    marginTop: 20,
  },
  imgBlock1: {
    width: 220,
    height: 220,
  },
  textBlock1: {
    fontSize: 28,
    fontWeight: "700",
  },
  block2SignIn: {
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
  textSignInWith: {
    fontSize: 18,
    color: "#8E8E8E",
  },
  block3SignIn: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  block4SignIn: {},
  btnSignInWithEmail: {
    backgroundColor: "#3A65FF",
    paddingVertical: 12,
    borderRadius: 20,
  },
  textBtnSignInWithEmail: {
    textAlign: "center",
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
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
