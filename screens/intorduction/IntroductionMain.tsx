import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const IntroductionMain = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.introductionMainComponent}>
      <Image
        source={require("../../assets/tajjob/introduction/tajjobLogo.jpg")}
        style={styles.imgLogo}
      />
      <Pressable style={styles.btnGetStatedBtn}>
        <Text style={styles.btnGetStatedBtn} onPress={() => {
          navigation.navigate("IntroductionFirst");
        }}>
          Get Started
        </Text>
      </Pressable>
    </View>
  );
};

export default IntroductionMain;

const styles = StyleSheet.create({
  introductionMainComponent: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imgLogo: { width: 400, height: 400 },
  btnGetStatedBtn: {
    backgroundColor: "#03466D",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    fontWeight: "bold",
    fontSize: 31,
    width: `100%`,
    textAlign: "center",
  },
});
