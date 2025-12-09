import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const EachJob = ({
  job,
  handleJobPress,
}: {
  job: any;
  handleJobPress: any;
}) => {
  const ApplierImages = ({ applierImgs }: { applierImgs: any }) => {
    return (
      <View style={styles.someAppliersImgAndDownIcon}>
        {applierImgs.map((imgSource: any, index: number) => (
          <Image
            key={index}
            source={imgSource}
            style={[styles.appliersImg, { left: index * 14 }]}
          />
        ))}
        <Entypo
          name="chevron-down"
          size={29}
          color="black"
          style={styles.downIcon}
        />
      </View>
    );
  };

  return (
    <Pressable
    //   key={job.id}
      style={styles.container}
      onPress={() => handleJobPress(job)}
    >
      <View style={styles.headerContainerBlock}>
        <View style={styles.employerImgEmployerNameAndJobBlock}>
          <Image source={job.employerImg} style={styles.employerImg} />
          <View style={styles.employerNameAndJobBlock}>
            <Text style={styles.employerName}>{job.employer}</Text>
            <Text style={styles.job}>{job.job}</Text>
          </View>
        </View>
        <FontAwesome name="bookmark-o" size={36} color="black" />
      </View>
      <View style={styles.locationContainerBlock}>
        <Entypo name="location-pin" size={29} color="black" />
        <Text style={styles.location}>{job.location}</Text>
      </View>
      <View style={styles.employmentTypeWorkingModelAndJobLevelContainerBlock}>
        <Text style={styles.employmentType}>{job.employmentType}</Text>
        <Text style={styles.workingModel}>{job.workingModel}</Text>
        <Text style={styles.jobLevel}>{job.jobLevel}</Text>
      </View>
      <View style={styles.lineContainerBlock} />
      <View style={styles.appliersAndSalaryContainerBlock}>
        <View style={styles.someAppliersImgsAndAppliersAmount}>
          <ApplierImages applierImgs={job.applierImgs} />
          <Text style={styles.aplliersAmount}>{job.appliers} Appliers</Text>
        </View>
        <Text style={styles.salaryAmount}>
          <Text style={styles.salary}>{job.salary}</Text>/month
        </Text>
      </View>
    </Pressable>
  );
};

export default EachJob;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
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
  },
  job: {
    color: "#888888",
    fontSize: 18,
  },
  locationContainerBlock: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  location: {
    color: "#B7B7B7",
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
    backgroundColor: "white",
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
    color: "#878787",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 4,
  },
  salaryAmount: {
    fontSize: 23,
    fontWeight: "700",
    color: "#7E7E7E",
  },
  salary: {
    color: "#766EAA",
  },
});
