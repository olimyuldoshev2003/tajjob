import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const SignInWith = () => {
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
        <View></View>
        <Text></Text>
        <View></View>
      </View>
      <View style={styles.block4SignIn}></View>
    </View>
  );
};

export default SignInWith;

const styles = StyleSheet.create({
  signInWithComponent: {
    backgroundColor: "#fff",
    height: `100%`,
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
    paddingHorizontal: 20,
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
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)",
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
  block3SignIn: {},
  block4SignIn: {},
});
