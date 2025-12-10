import EachJob from "@/components/home/EachJob";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
        <View style={styles.headerSavedJobsComponent}>
          <View
            style={
              styles.blockIconBackAndTitleOfComponentHeaderSavedJobsComponent
            }
          >
            {
              
            }
            <Entypo
              name="chevron-small-left"
              size={37}
              color="black"
              style={styles.iconBack}
            />
            <Text style={styles.titleOfComponent}>Saved job</Text>
          </View>
        </View>
        <View style={styles.sectionSavedJobsComponent}>
          <ScrollView
            contentContainerStyle={styles.savedJobsBlockScrollView}
            style={styles.savedJobsBlock}
          >
            {jobs.map((savedJob: any) => {
              return (
                <EachJob
                  key={savedJob.id}
                  job={savedJob}
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
  savedJobsComponentBlock: {
    paddingTop: 40,
  },
  headerSavedJobsComponent: {},
  blockIconBackAndTitleOfComponentHeaderSavedJobsComponent: {},
  iconBack: {},
  titleOfComponent: {},
  sectionSavedJobsComponent: {},
  savedJobsBlockScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 15,
  },
  savedJobsBlock: {},
});
