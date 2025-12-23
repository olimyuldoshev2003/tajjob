import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { Modalize } from "react-native-modalize";

interface JobDetailModalProps {
  modalizeRef: React.RefObject<Modalize>;
  jobData?: any;
}

const JobDetailModal = ({ modalizeRef, jobData }: JobDetailModalProps) => {
  const navigation: any = useNavigation();
  const colorScheme = useColorScheme()

  function handleCloseModal() {
    modalizeRef?.current?.close();
  }

  const handleNavigateToJob = () => {
    handleCloseModal();
    
    // Navigate to the Job screen with the job data
    // navigation.navigate("Application", {
    //   screen: "HomeStack",
    //   params: {
    //     screen: "Job",
    //     params: {
    //       id: jobData?.id || 1,
    //       jobData: jobData,
    //     },
    //   },
    // });

    navigation.navigate("Job", {
      params: {
        id: jobData?.id || 1,
        jobData: jobData,
      },
    });
  };

    const dynamicStyles = StyleSheet.create({
      modalEachJobBlock: {
        padding: 13,
        backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
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
        color: colorScheme === "dark" ? "#fff" : "#000",
      },
      job: {
        color: colorScheme === "dark" ? "#f1f1f1" : "#888888",
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
        color: colorScheme === "dark" ? "#f1f1f1" : "#B7B7B7",
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
        color: colorScheme === "dark" ? "#fff" : "#7E7E7E",
      },
      salary: {
        color: colorScheme === "dark" ? "#00c3ff" : "#766EAA",
      },
      workTimeBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      },
      workingTime: {
        fontSize: 19,
        fontWeight: "600",
        color: colorScheme === "dark" ? "#fff":"#000"
      },
      buttonsBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 30,
      },
      btnCancel: {
        borderWidth: 1,
        borderColor: colorScheme === "dark" ? "#fff":"#000",
        borderRadius: 20,
        paddingVertical: 1,
        paddingHorizontal: 30,
      },
      textBtnCancel: {
        fontSize: 25,
        fontWeight: "500",
        color: colorScheme === "dark" ? "#fff":"#000",
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

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={false}
      modalHeight={380}
      withHandle={true}
    >
      <View style={dynamicStyles.modalEachJobBlock}>
        <View style={dynamicStyles.blockCloseModalIcon}>
          <FontAwesome
            name="close"
            size={35}
            color={colorScheme === "dark" ? "#fff" : "black"}
            onPress={handleCloseModal}
          />
        </View>
        <View style={dynamicStyles.employerImgEmployerNameAndJobBlock}>
          <Image
            source={jobData?.employerImg}
            style={dynamicStyles.employerImg}
          />
          <View style={dynamicStyles.employerNameAndJobBlock}>
            <Text style={dynamicStyles.employerName}>{jobData?.employer}</Text>
            <Text style={dynamicStyles.job}>{jobData?.job}</Text>
          </View>
        </View>
        <View style={dynamicStyles.locationContainerBlock}>
          <Entypo
            name="location-pin"
            size={35}
            color={colorScheme === "dark" ? "#fff" : "black"}
          />
          <Text style={dynamicStyles.location}>{jobData?.location}</Text>
        </View>
        <View
          style={
            dynamicStyles.employmentTypeWorkingModelAndJobLevelContainerBlock
          }
        >
          <Text style={dynamicStyles.employmentType}>
            {jobData?.employmentType}
          </Text>
          <Text style={dynamicStyles.workingModel}>
            {jobData?.workingModel}
          </Text>
          <Text style={dynamicStyles.jobLevel}>{jobData?.jobLevel}</Text>
        </View>
        <View style={dynamicStyles.salaryAndWorkTimeBlock}>
          <View style={dynamicStyles.salaryBlock}>
            <Image
              source={require("../../assets/tajjob/home/moneyIcon.jpg")}
              style={dynamicStyles.moneyIcon}
            />
            <Text style={dynamicStyles.salaryAmount}>
              <Text style={dynamicStyles.salary}>{jobData?.salary}</Text>/month
            </Text>
          </View>
          <View style={dynamicStyles.workTimeBlock}>
            <MaterialIcons
              name="access-time"
              size={36}
              color={colorScheme === "dark" ? "#fff" : "black"}
            />
            <Text style={dynamicStyles.workingTime}>
              {jobData?.schedule?.workingHours?.start}-
              {jobData?.schedule?.workingHours?.end}
            </Text>
          </View>
        </View>
        <View style={dynamicStyles.buttonsBlock}>
          <Pressable style={dynamicStyles.btnCancel} onPress={handleCloseModal}>
            <Text style={dynamicStyles.textBtnCancel}>Cancel</Text>
          </Pressable>
          <Pressable
            style={dynamicStyles.btnOpenPageJobByIdPage}
            onPress={handleNavigateToJob}
          >
            <Text style={dynamicStyles.textBtnOpenPageJobByIdPage}>Next</Text>
          </Pressable>
        </View>
      </View>
    </Modalize>
  );
};



export default JobDetailModal;
