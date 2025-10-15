import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";

interface JobDetailModalProps {
  modalizeRef: React.RefObject<Modalize>;
  jobData?: any;
}

const JobDetailModal = ({ modalizeRef, jobData }: JobDetailModalProps) => {
  const navigation: any = useNavigation();

  function handleCloseModal() {
    modalizeRef?.current?.close();
  }
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={false}
      modalHeight={380}
      withHandle={true}
    >
      <View style={styles.modalEachJobBlock}>
        <View style={styles.blockCloseModalIcon}>
          <FontAwesome
            name="close"
            size={35}
            color="black"
            onPress={handleCloseModal}
          />
        </View>
        <View style={styles.employerImgEmployerNameAndJobBlock}>
          <Image source={jobData?.employerImg} style={styles.employerImg} />
          <View style={styles.employerNameAndJobBlock}>
            <Text style={styles.employerName}>{jobData?.employer}</Text>
            <Text style={styles.job}>{jobData?.job}</Text>
          </View>
        </View>
        <View style={styles.locationContainerBlock}>
          <Entypo name="location-pin" size={35} color="black" />
          <Text style={styles.location}>{jobData?.location}</Text>
        </View>
        <View
          style={styles.employmentTypeWorkingModelAndJobLevelContainerBlock}
        >
          <Text style={styles.employmentType}>{jobData?.employmentType}</Text>
          <Text style={styles.workingModel}>{jobData?.workingModel}</Text>
          <Text style={styles.jobLevel}>{jobData?.jobLevel}</Text>
        </View>
        <View style={styles.salaryAndWorkTimeBlock}>
          <View style={styles.salaryBlock}>
            <Image
              source={require("../../assets/tajjob/home/moneyIcon.jpg")}
              style={styles.moneyIcon}
            />
            <Text style={styles.salaryAmount}>
              <Text style={styles.salary}>{jobData?.salary}</Text>/month
            </Text>
          </View>
          <View style={styles.workTimeBlock}>
            <MaterialIcons name="access-time" size={36} color="black" />
            <Text style={styles.workingTime}>
              {jobData?.schedule?.workingHours?.start}-
              {jobData?.schedule?.workingHours?.end}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsBlock}>
          <Pressable style={styles.btnCancel} onPress={handleCloseModal}>
            <Text style={styles.textBtnCancel}>Cancel</Text>
          </Pressable>
          <Pressable
            style={styles.btnOpenPageJobByIdPage}
            onPress={() => {
              navigation.navigate("Job", { id: 1 });
              handleCloseModal();
            }}
          >
            <Text style={styles.textBtnOpenPageJobByIdPage}>Next</Text>
          </Pressable>
        </View>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalEachJobBlock: {
    padding: 13,
  },
  blockCloseModalIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  employerImgEmployerNameAndJobBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  employerImg: {
    width: 66,
    height: 66,
    borderRadius: 10,
  },
  employerNameAndJobBlock: {},
  employerName: {
    fontWeight: "bold",
    fontSize: 30,
  },
  job: {
    color: "#888888",
    fontSize: 25,
  },
  locationContainerBlock: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  location: {
    color: "#B7B7B7",
    fontSize: 24,
    fontWeight: "600",
  },
  employmentTypeWorkingModelAndJobLevelContainerBlock: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  employmentType: {
    color: "#616161",
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 1,
    paddingHorizontal: 8,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },
  workingModel: {
    color: "#616161",
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 1,
    paddingHorizontal: 8,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },
  jobLevel: {
    color: "#616161",
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 1,
    paddingHorizontal: 8,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },
  salaryAndWorkTimeBlock: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  salaryBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  moneyIcon: {},
  salaryAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7E7E7E",
  },
  salary: {
    color: "#766EAA",
  },
  workTimeBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  workingTime: {
    fontSize: 19,
    fontWeight: "600",
  },
  buttonsBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 30,
  },
  textBtnCancel: {
    fontSize: 25,
    fontWeight: "500",
  },
  btnOpenPageJobByIdPage: {
    backgroundColor: "#2623D0",
    borderRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 30,
  },
  textBtnOpenPageJobByIdPage: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
});

export default JobDetailModal;
