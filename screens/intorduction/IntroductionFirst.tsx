import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const IntroductionFirst = () => {
  return (
    <View style={styles.introduction1Component}>
      <View style={styles.block1IntroComponent}>
        <View style={styles.imgBlock}>
          <Image
            source={require("../../assets/tajjob/introduction/introduction1.jpg")}
          />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Find your job easily and quickly.</Text>
          <Text style={styles.description}>
            With TajJob you can easily search for jobs and apply with just one
            click. All jobs in one place!
          </Text>
        </View>

        <View style={styles.dotsBlock}>
          <View style={[styles.dots, styles.dot1]}></View>
          <View style={[styles.dots, styles.dot2]}></View>
          <View style={[styles.dots, styles.dot3]}></View>
        </View>
      </View>
      <Pressable style={[styles.btnNext, styles.btn]}>
        <Text style={[styles.btnNext, styles.text]}>Next</Text>
      </Pressable>
    </View>
  );
};

export default IntroductionFirst;

const styles = StyleSheet.create({
  introduction1Component: {
    flex: 1,
    backgroundColor: "white",
  },
  block1IntroComponent: {},
  imgBlock: {},
  textBlock: {
    marginTop: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#2F61F6",
  },
  description: {
    fontWeight: "bold",
    fontSize: 26,
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
    backgroundColor: "#3A65FF",
  },
  dot2: {
    backgroundColor: "#D9D9D9",
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
