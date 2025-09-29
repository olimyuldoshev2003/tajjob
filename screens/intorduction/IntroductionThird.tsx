import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const IntroductionThird = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.introduction3Component}>
      <View style={styles.block1IntroComponent}>
        <View style={styles.imgBlock}>
          <Image
            source={require("../../assets/tajjob/introduction/introduction3.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Your job is waiting for you.</Text>
          <Text style={styles.description}>
            Thousands of new opportunities open up for you every day. Start
            today and take a step towards a better future!
          </Text>
        </View>

        <View style={styles.dotsBlock}>
          <View style={[styles.dots, styles.dot1]}></View>
          <View style={[styles.dots, styles.dot2]}></View>
          <View style={[styles.dots, styles.dot3]}></View>
        </View>
      </View>
      <Pressable
        style={[styles.btnNext, styles.btn]}
        onPress={() => {
          navigation.replace("SignInWith");
        }}
      >
        <Text style={[styles.btnNext, styles.text]}>I will start</Text>
      </Pressable>
    </View>
  );
};

export default IntroductionThird;

const styles = StyleSheet.create({
  introduction3Component: {
    flex: 1,
    backgroundColor: "white",
  },
  block1IntroComponent: {},
  imgBlock: {},
  img: {
    width: "100%",
    height: 400,
  },
  textBlock: {
    marginTop: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 33,
    textAlign: "center",
    color: "#2F61F6",
  },
  description: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#8E8E8E",
    paddingHorizontal: 20,
  },
  dotsBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 70,
  },
  dots: {
    width: 16,
    height: 16,
    borderRadius: 10,
  },
  dot1: {
    backgroundColor: "#D9D9D9",
  },
  dot2: {
    backgroundColor: "#D9D9D9",
  },
  dot3: {
    backgroundColor: "#3A65FF",
  },
  btnNext: {
    backgroundColor: "#3A65FF",
    textAlign: "center",
  },

  btn: {
    marginTop: 25,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
});
