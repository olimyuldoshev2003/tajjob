import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Job = ({ route }: { route: any }) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.jobComponent}>
      <View style={styles.headerJobComponent}>
        <Pressable
          style={styles.closePageBtn}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <FontAwesome name="close" size={32} color="black" />
        </Pressable>
        <View style={styles.saveAndShareBtnBlock}>
          <Pressable style={styles.saveBtn}>
            <FontAwesome name="bookmark-o" size={32} color="black" />
          </Pressable>
          <Pressable style={styles.shareBtn}>
            <Entypo name="share" size={32} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.sectionJobComponent}>
        <View style={styles.employerImgEmplyerNameAndJobBlock}>
          <Image
            source={require("../../assets/tajjob/home/alif.jpg")}
            style={styles.employerImg}
          />
          <Text style={styles.employerName}>Alif Bank</Text>
          <Text style={styles.job}>Operation specialist</Text>
          <View style={styles.locationIconAndLocation}>
            <Entypo name="location-pin" size={29} color="black" />
            <Text style={styles.location}>Dushanbe, Tajikistan</Text>
          </View>
        </View>
        <View style={styles.salaryEmploymentTypeWorkingModelAndJobLevelBlock}>
          <View
            style={[
              styles.salaryBlock,
              styles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <Image style={styles.infoIcon} />
            <View style={styles.titleAndInfoBlock}>
              <Text style={styles.title}>Salary(Monthly)</Text>
              <Text style={styles.info}>1500 somoni</Text>
            </View>
          </View>
          <View
            style={[
              styles.employmentTypeBlock,
              styles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <Image style={styles.infoIcon} />
            <View style={styles.titleAndInfoBlock}>
              <Text style={styles.title}>Employment Type</Text>
              <Text style={styles.info}>Full - Time</Text>
            </View>
          </View>
          <View
            style={[
              styles.workingModelBlock,
              styles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <Image style={styles.infoIcon} />
            <View style={styles.titleAndInfoBlock}>
              <Text style={styles.title}>Working Model</Text>
              <Text style={styles.info}>Remote</Text>
            </View>
          </View>
          <View
            style={[
              styles.jobLevelBlock,
              styles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <Image style={styles.infoIcon} />
            <View style={styles.titleAndInfoBlock}>
              <Text style={styles.title}>Level</Text>
              <Text style={styles.info}>Internship</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Job;

const styles = StyleSheet.create({
  jobComponent: {
    flex: 1,
    backgroundColor: "#dddddd",
  },
  headerJobComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  closePageBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  saveAndShareBtnBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  saveBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 50,
  },
  shareBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 50,
  },
  sectionJobComponent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 77,
  },
  employerImgEmplyerNameAndJobBlock: {
    alignItems: "center",
    marginTop: 3,
    position: "absolute",
    top: -46,
    left: "22%",
  },
  employerImg: {
    width: 86,
    height: 89,
    borderRadius: 50,
  },
  employerName: {
    fontSize: 32,
    fontWeight: "700",
  },
  job: {
    color: "#888888",
    fontSize: 25,
    fontWeight: "500",
  },
  locationIconAndLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: "#787878",
    fontSize: 18,
    fontWeight: "400",
  },
  salaryEmploymentTypeWorkingModelAndJobLevelBlock: {},
  salaryBlock: {},
  employmentTypeBlock: {},
  workingModelBlock: {},
  jobLevelBlock: {},

  // 4 informations with the same style blocks
  fourInformationsWithTheSameStyleBlock: {},
  infoIcon: {},
  titleAndInfoBlock: {},
  title: {},
  info: {},
});
