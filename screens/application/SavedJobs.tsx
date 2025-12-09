import EachJob from "@/components/home/EachJob";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const SavedJobs = ({ onJobPress }: { onJobPress: any }) => {
  const jobs = [
    {
      id: 1,
      employer: "Alif Bank",
      job: "Operation Specialist",
      location: "Dushanbe, Tajikistan",
      employmentType: "Full Time",
      workingModel: "Remote",
      jobLevel: "Internship",
      appliers: 3220,
      salary: "1500 sm",
      employerImg: require("../../assets/tajjob/home/alif.jpg"),
      applierImgs: [
        require("../../assets/tajjob/home/applier1.jpg"),
        require("../../assets/tajjob/home/applier2.jpg"),
        require("../../assets/tajjob/home/applier3.jpg"),
      ],
      schedule: {
        workingHours: {
          start: "09:00",
          end: "18:00",
        },
        timezone: "Asia/Dushanbe",
        breaks: [
          {
            start: "13:00",
            end: "14:00",
            duration: 60,
          },
        ],
      },
    },
    {
      id: 2,
      employer: "Alif Bank",
      job: "Operation Specialist",
      location: "Dushanbe, Tajikistan",
      employmentType: "Full Time",
      workingModel: "Remote",
      jobLevel: "Internship",
      appliers: 3220,
      salary: "1500 sm",
      employerImg: require("../../assets/tajjob/home/alif.jpg"),
      applierImgs: [
        require("../../assets/tajjob/home/applier1.jpg"),
        require("../../assets/tajjob/home/applier2.jpg"),
        require("../../assets/tajjob/home/applier3.jpg"),
      ],
      schedule: {
        workingHours: {
          start: "09:00",
          end: "18:00",
        },
        timezone: "Asia/Dushanbe",
        breaks: [
          {
            start: "13:00",
            end: "14:00",
            duration: 60,
          },
        ],
      },
    },
    {
      id: 3,
      employer: "Alif Bank",
      job: "Operation Specialist",
      location: "Dushanbe, Tajikistan",
      employmentType: "Full Time",
      workingModel: "Remote",
      jobLevel: "Internship",
      appliers: 3220,
      salary: "1500 sm",
      employerImg: require("../../assets/tajjob/home/alif.jpg"),
      applierImgs: [
        require("../../assets/tajjob/home/applier1.jpg"),
        require("../../assets/tajjob/home/applier2.jpg"),
        require("../../assets/tajjob/home/applier3.jpg"),
      ],
      schedule: {
        workingHours: {
          start: "09:00",
          end: "18:00",
        },
        timezone: "Asia/Dushanbe",
        breaks: [
          {
            start: "13:00",
            end: "14:00",
            duration: 60,
          },
        ],
      },
    },
  ];

  const handleJobPress = (job: any) => {
    onJobPress?.(job);
  };

  return (
    <View style={styles.savedJobsComponent}>
      <View style={styles.savedJobsComponentBlock}>
        <View style={styles.headerSavedJobsComponent}></View>
        <View style={styles.sectionSavedJobsComponent}>
          <ScrollView
            contentContainerStyle={styles.savedJobsBlockScrollView}
            style={styles.savedJobsBlock}
          >
            {jobs.map((item) => {
              return (
                <EachJob
                  key={item.id}
                  job={item}
                  handleJobPress={handleJobPress}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SavedJobs;

const styles = StyleSheet.create({
  savedJobsComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  savedJobsComponentBlock: {},
  headerSavedJobsComponent: {},
  sectionSavedJobsComponent: {},
  savedJobsBlockScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 15,
  },
  savedJobsBlock: {},
});
