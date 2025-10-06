import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Icons
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";

// Define the props interface
interface HomeProps {
  onJobPress?: (job: any) => void;
}

const Home = ({ onJobPress }: HomeProps) => {
  const navigation: any = useNavigation();

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
    // Call the parent's onJobPress function if it exists
    onJobPress?.(job); // This equivalents to:
    // if (onJobPress) {
    //   onJobPress(job);
    // }
  };

  // Component for rendering applicant images with dynamic positioning
  const ApplierImages = ({ applierImgs }: { applierImgs: any }) => {
    return (
      <View style={styles.someAppliersImgAndDownIcon}>
        {applierImgs.map((imgSource: any, index: number) => (
          <Image
            key={index}
            source={imgSource}
            style={[
              styles.appliersImg,
              { left: index * 14 }, // Dynamic positioning: 0, 14, 28, etc.
            ]}
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
    <View style={styles.homeComponent}>
      <View style={styles.homeComponentBlock}>
        <View style={styles.headerHomeComponent}>
          <View style={styles.headerBlock1}>
            <View style={styles.headerTextBlock}>
              <Text style={styles.greetingsAndName}>Hi Olim</Text>
              <Text style={styles.greetingText}>Welcome</Text>
            </View>
            <View style={styles.blockNotificationIcon}>
              <MaterialIcons
                name="notifications"
                size={44}
                color="white"
                style={styles.notificationIcon}
                onPress={() => {
                  navigation.navigate("Notifications");
                }}
              />
              <View style={styles.newNotificationNotice} />
            </View>
          </View>
          <View style={styles.headerBlock2}>
            <View style={styles.searchInputBlock}>
              <Ionicons
                name="search"
                size={38}
                color="black"
                style={styles.searchIcon}
              />
              <TextInput style={styles.searchInput} placeholder="Search" />
            </View>
            <Pressable style={styles.filterBtn}>
              <Image
                source={require("../../assets/tajjob/home/filter.jpg")}
                style={styles.filterIcon}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.sectionHomeComponent}>
          {jobs.map((job) => (
            <Pressable
              key={job.id}
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
                <Pressable>
                  <FontAwesome name="bookmark-o" size={36} color="black" />
                </Pressable>
              </View>
              <View style={styles.locationContainerBlock}>
                <Entypo name="location-pin" size={29} color="black" />
                <Text style={styles.location}>{job.location}</Text>
              </View>
              <View
                style={
                  styles.employmentTypeWorkingModelAndJobLevelContainerBlock
                }
              >
                <Text style={styles.employmentType}>{job.employmentType}</Text>
                <Text style={styles.workingModel}>{job.workingModel}</Text>
                <Text style={styles.jobLevel}>{job.jobLevel}</Text>
              </View>
              <View style={styles.lineContainerBlock} />
              <View style={styles.appliersAndSalaryContainerBlock}>
                <View style={styles.someAppliersImgsAndAppliersAmount}>
                  <ApplierImages applierImgs={job.applierImgs} />
                  <Text style={styles.aplliersAmount}>
                    {job.appliers} Appliers
                  </Text>
                </View>
                <Text style={styles.salaryAmount}>
                  <Text style={styles.salary}>{job.salary}</Text>/month
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeComponent: {
    height: `100%`,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  homeComponentBlock: {},
  headerHomeComponent: {
    backgroundColor: "#0961F6",
    paddingTop: 16,
    paddingBottom: 30,
    borderStartEndRadius: 20,
    borderEndEndRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerBlock1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  headerTextBlock: {},
  greetingsAndName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 28,
  },
  greetingText: {
    color: "#9FBFE2",
    fontWeight: "500",
    fontSize: 21,
  },
  blockNotificationIcon: {
    position: "relative",
  },
  notificationIcon: {
    backgroundColor: "#ffffff45",
    borderRadius: 10,
  },
  newNotificationNotice: {
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 35,
    position: "absolute",
    top: 8,
    right: 13,
  },
  headerBlock2: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  searchInputBlock: {
    position: "relative",
    flex: 1,
  },
  searchIcon: {
    position: "absolute",
    top: 9,
    left: 7,
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: "#F5F6FA",
    borderRadius: 10,
    paddingLeft: 55,
    paddingRight: 15,
    fontSize: 26,
    fontStyle: "italic",
    fontWeight: "600",
  },
  filterBtn: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  filterIcon: {},
  sectionHomeComponent: {
    paddingHorizontal: 13,
    paddingVertical: 15,
    marginTop: 5,
    gap: 15,
    paddingBottom: 215,
  },
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
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
    left: 42, // 3 images * 14 = 42
    zIndex: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
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
