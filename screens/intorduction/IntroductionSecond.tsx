import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const IntroductionSecond = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.introduction2Component}>
      <View style={styles.block1IntroComponent}>
        <View style={styles.imgBlock}>
          <Image
            source={require("../../assets/tajjob/introduction/introduction2.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>For workers and job seekers</Text>
          <Text style={styles.description}>
            TajJob empowers both job seekers and employers. Easily connect in
            Tajikistan and around the world.
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
          navigation.replace("IntroductionThird");
        }}
      >
        <Text style={[styles.btnNext, styles.text]}>Next</Text>
      </Pressable>
    </View>
  );
};

export default IntroductionSecond;

const styles = StyleSheet.create({
  introduction2Component: {
    flex: 1,
    backgroundColor: "white",
  },
  block1IntroComponent: {},
  img: {
    width: "100%",
    height: 400,
  },
  imgBlock: {},
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
    backgroundColor: "#3A65FF",
  },
  dot3: {
    backgroundColor: "#D9D9D9",
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
