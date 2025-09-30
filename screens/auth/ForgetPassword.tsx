import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ForgetPassword = () => {
  const navigation:any = useNavigation()
  return (
    <View style={styles.forgetPasswordComponent}>
      <View style={styles.backToSignInPageBlock}>

        <FontAwesome name="close" size={47} color="black" onPress={() => {
          navigation.navigate("SignIn")
        }}/>
      </View>
      <View style={styles.forgetPasswordComponentBlock}>
        <Text style={styles.textForgetPassword}>Trouble logging in?</Text>
        <View style={styles.inpFieldsBlock}>
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
            />
          </View>

          <Pressable style={styles.btnForgetPassword}>
            <Text style={styles.textBtnForgetPassword}>Send</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  forgetPasswordComponent: {
    height: `100%`,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backToSignInPageBlock: {
    marginTop: 5,
  },
  forgetPasswordComponentBlock: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  textForgetPassword: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
  },
  inpFieldsBlock: {
    gap: 20,
    marginTop: 20,
  },
  inpBlock: {
    position: "relative",
    width: 320,
  },
  img: {
    width: 32,
    height: 32,
    position: "absolute",
    top: 10,
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
  inpNumberPhoneBlock: {},
  inpNumberPhone: {},
  numberPhoneImg: {},
  inpEmailBlock: {},
  emailImg: {},
  inpEmail: {},
  btnForgetPassword: {
    backgroundColor: "#3A65FF",
    paddingVertical: 12,
    borderRadius: 20,
  },
  textBtnForgetPassword: {
    textAlign: "center",
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },
});
