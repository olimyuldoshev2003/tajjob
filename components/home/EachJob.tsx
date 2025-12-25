import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const EachJob = ({
  job,
  handleJobPress,
}: {
  job: any;
  handleJobPress: any;
}) => {
  const colorScheme = useColorScheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
      padding: 15,
      borderRadius: 20,
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      zIndex: 20,
    },
    headerContainerBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    employerImgEmployerNameAndJobBlock: {
      flexDirection: "row",
      gap: 6,
    },
    employerImg: {
      width: 61,
      height: 58,
      borderRadius: 10,
    },
    employerNameAndJobBlock: {},
    employerName: {
      fontWeight: "bold",
      fontSize: 22,
      color: colorScheme === "dark" ? "#fff" : "#000000",
    },
    job: {
      color: colorScheme === "dark" ? "#fff" : "#888888",
      fontSize: 18,
    },
    locationContainerBlock: {
      marginTop: 6,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 10,
    },
    location: {
      color: colorScheme === "dark" ? "#fff" : "#b7b7b7",
      fontSize: 20,
      fontWeight: "600",
    },
    employmentTypeWorkingModelAndJobLevelContainerBlock: {
      marginTop: 13,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    employmentType: {
      color: "#616161",
      fontSize: 18,
      fontWeight: "600",
      paddingVertical: 1,
      paddingHorizontal: 16,
      backgroundColor: "#D9D9D9",
      borderRadius: 8,
    },
    workingModel: {
      color: "#616161",
      fontSize: 18,
      fontWeight: "600",
      paddingVertical: 1,
      paddingHorizontal: 16,
      backgroundColor: "#D9D9D9",
      borderRadius: 8,
    },
    jobLevel: {
      color: "#616161",
      fontSize: 18,
      fontWeight: "600",
      paddingVertical: 1,
      paddingHorizontal: 16,
      backgroundColor: "#D9D9D9",
      borderRadius: 8,
    },
    lineContainerBlock: {
      marginTop: 14,
      backgroundColor: "#D9D9D9",
      height: 6,
    },
    appliersAndSalaryContainerBlock: {
      marginTop: 14,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    someAppliersImgsAndAppliersAmount: {},
    someAppliersImgAndDownIcon: {
      position: "relative",
      height: 30,
    },
    appliersImg: {
      width: 30,
      height: 30,
      position: "absolute",
      borderRadius: 35,
      zIndex: 5,
    },
    downIcon: {
      position: "absolute",
      borderRadius: 35,
      top: 0,
      left: 42,
      zIndex: 5,
      // backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    aplliersAmount: {
      color: colorScheme === "dark" ? "#fff" : "#878787",
      fontSize: 18,
      fontWeight: "500",
      marginTop: 4,
    },
    salaryAmount: {
      fontSize: 23,
      fontWeight: "700",
      color: colorScheme === "dark" ? "#fff" : "#7e7e7e",
    },
    salary: {
      color: colorScheme === "dark" ? "#00c3ff" : "#766EAA",
    },
  });

  const ApplierImages = ({ applierImgs }: { applierImgs: any }) => {
    return (
      <View style={dynamicStyles.someAppliersImgAndDownIcon}>
        {applierImgs.map((imgSource: any, index: number) => (
          <Image
            key={index}
            source={imgSource}
            style={[dynamicStyles.appliersImg, { left: index * 14 }]}
          />
        ))}
        <Entypo
          name="chevron-down"
          size={29}
          // color={colorScheme === "dark" ? "#fff" : "#000000"}
          color={"#000000"}
          style={dynamicStyles.downIcon}
        />
      </View>
    );
  };

  return (
    <Pressable
      //   key={job.id}
      style={dynamicStyles.container}
      onPress={() => handleJobPress(job)}
    >
      <View style={dynamicStyles.headerContainerBlock}>
        <View style={dynamicStyles.employerImgEmployerNameAndJobBlock}>
          <Image source={job.employerImg} style={dynamicStyles.employerImg} />
          <View style={dynamicStyles.employerNameAndJobBlock}>
            <Text style={dynamicStyles.employerName}>{job.employer}</Text>
            <Text style={dynamicStyles.job}>{job.job}</Text>
          </View>
        </View>
        <FontAwesome
          name="bookmark-o"
          size={36}
          color={colorScheme === "dark" ? "#fff" : "#000000"}
        />
      </View>
      <View style={dynamicStyles.locationContainerBlock}>
        <Entypo
          name="location-pin"
          size={29}
          color={colorScheme === "dark" ? "#fff" : "#000000"}
        />
        <Text style={dynamicStyles.location}>{job.location}</Text>
      </View>
      <View
        style={
          dynamicStyles.employmentTypeWorkingModelAndJobLevelContainerBlock
        }
      >
        <Text style={dynamicStyles.employmentType}>{job.employmentType}</Text>
        <Text style={dynamicStyles.workingModel}>{job.workingModel}</Text>
        <Text style={dynamicStyles.jobLevel}>{job.jobLevel}</Text>
      </View>
      <View style={dynamicStyles.lineContainerBlock} />
      <View style={dynamicStyles.appliersAndSalaryContainerBlock}>
        <View style={dynamicStyles.someAppliersImgsAndAppliersAmount}>
          <ApplierImages applierImgs={job.applierImgs} />
          <Text style={dynamicStyles.aplliersAmount}>
            {job.appliers} Appliers
          </Text>
        </View>
        <Text style={dynamicStyles.salaryAmount}>
          <Text style={dynamicStyles.salary}>{job.salary}</Text>/month
        </Text>
      </View>
    </Pressable>
  );
};

export default EachJob;
