import EachJob from "@/components/home/EachJob";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  const navigation: any = useNavigation();

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
            {Platform.OS === "ios" ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Entypo
                  name="chevron-small-left"
                  size={50}
                  color="black"
                  style={styles.iconBack}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="arrow-back-sharp" size={31} color="black" />
              </TouchableOpacity>
            )}
            <Text style={styles.titleOfComponent}>Saved job</Text>
          </View>
          <FontAwesome name="bookmark" size={32} color="black" />
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
            <View style={styles.btnMoreBlock}>
              <Pressable style={styles.btnMore}>
                <Text style={styles.textBtnMore}>More</Text>
                <Entypo
                  name="chevron-small-down"
                  size={37}
                  color="black"
                  style={styles.downIcon}
                />
              </Pressable>
            </View>
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
  headerSavedJobsComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blockIconBackAndTitleOfComponentHeaderSavedJobsComponent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconBack: {},
  titleOfComponent: {
    fontSize: 32,
    fontWeight: "700",
  },
  sectionSavedJobsComponent: {
    marginTop: 20,
  },
  savedJobsBlockScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 15,
    paddingBottom: 135,
  },
  savedJobsBlock: {},

  btnMoreBlock: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnMore: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textBtnMore: {
    color: "#7F7F7F",
    fontSize: 26,
    fontWeight: "400",
  },
  downIcon: {},
});
