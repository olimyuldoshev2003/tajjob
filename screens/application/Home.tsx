import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

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

  const [modalFilter, setModalFilter] = useState<boolean>(false);
  const [filterByCity, setFilterByCity] = useState<string>("");

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(1000)).current;

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

  // Functions
  const handleModalFilter = () => {
    if (!modalFilter) {
      // Open modal with animation
      setModalFilter(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Close modal with animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1000,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalFilter(false);
      });
    }
  };

  const handleJobPress = (job: any) => {
    onJobPress?.(job);
  };

  // Component for rendering applicant images with dynamic positioning
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
    <View style={styles.homeComponent}>
      <View style={styles.homeComponentBlock}>
        <View style={[styles.headerHomeComponent]}>
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
          <View
            style={[
              styles.headerBlock2,
              modalFilter && styles.headerBlock2InOpeningModalFilter,
            ]}
          >
            <View
              style={[
                styles.searchInputBlock,
                // modalFilter && styles.searchInputBlockInOpeningModalFilter,
              ]}
            >
              <Ionicons
                name="search"
                size={38}
                color="black"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                pointerEvents="none"
              />
            </View>
            <Pressable style={styles.filterBtn} onPress={handleModalFilter}>
              <Image
                source={require("../../assets/tajjob/home/filter.jpg")}
                style={styles.filterIcon}
              />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.sectionHomeComponent}>
          <View style={styles.suggestedJobAndSeeAllTextsBlock}>
            <Text style={styles.suggestedJobText}>Suggested job</Text>
            <Pressable style={styles.seeAllBtn}>
              <Text style={styles.seeAllBtnText}>See all</Text>
            </Pressable>
          </View>
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
                <FontAwesome name="bookmark-o" size={36} color="black" />
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
          <View style={styles.recentJobsBlock}>
            <Text style={styles.recentJobsText}>Recent Jobs</Text>
            <ScrollView
              horizontal
              style={styles.filterByCategoryBlock}
              contentContainerStyle={styles.filterByCategoryBlockScroll}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable style={styles.filterByCategoryBtn}>
                <Text style={styles.filterByCategoryBtnText}>All</Text>
              </Pressable>
              <Pressable style={styles.filterByCategoryBtn}>
                <Text style={styles.filterByCategoryBtnText}>IT-Job</Text>
              </Pressable>
              <Pressable style={styles.filterByCategoryBtn}>
                <Text style={styles.filterByCategoryBtnText}>Operator</Text>
              </Pressable>
              <Pressable style={styles.filterByCategoryBtn}>
                <Text style={styles.filterByCategoryBtnText}>Delivery</Text>
              </Pressable>
              <Pressable style={styles.filterByCategoryBtn}>
                <Text style={styles.filterByCategoryBtnText}>Delivery</Text>
              </Pressable>
              <Pressable style={styles.filterByCategoryBtn}>
                <Text style={styles.filterByCategoryBtnText}>Delivery</Text>
              </Pressable>
              <Pressable style={styles.filterByCategoryBtn}>
                <Text style={styles.filterByCategoryBtnText}>Delivery</Text>
              </Pressable>
            </ScrollView>
            <View style={styles.recentJobs}>
              {jobs.map((job) => (
                <Pressable
                  key={job.id}
                  style={styles.containerRecentJobs}
                  onPress={() => handleJobPress(job)}
                >
                  <View style={styles.headerContainerBlockRecentJobs}>
                    <View
                      style={
                        styles.employerImgEmployerNameAndJobBlockRecentJobs
                      }
                    >
                      <Image
                        source={job.employerImg}
                        style={styles.employerImgRecentJobs}
                      />
                      <View style={styles.employerNameAndJobBlockRecentJobs}>
                        <Text style={styles.employerNameRecentJobs}>
                          {job.employer}
                        </Text>
                        <Text style={styles.jobRecentJobs}>{job.job}</Text>
                      </View>
                    </View>
                    <FontAwesome name="bookmark-o" size={36} color="black" />
                  </View>
                  <View style={styles.locationContainerBlockRecentJobs}>
                    <Entypo name="location-pin" size={29} color="black" />
                    <Text style={styles.locationRecentJobs}>
                      {job.location}
                    </Text>
                  </View>
                  <View
                    style={
                      styles.employmentTypeWorkingModelAndJobLevelContainerBlockRecentJobs
                    }
                  >
                    <Text style={styles.employmentTypeRecentJobs}>
                      {job.employmentType}
                    </Text>
                    <Text style={styles.workingModelRecentJobs}>
                      {job.workingModel}
                    </Text>
                    <Text style={styles.jobLevelRecentJobs}>
                      {job.jobLevel}
                    </Text>
                  </View>
                  <View style={styles.lineContainerBlockRecentJobs} />
                  <View
                    style={styles.appliersAndSalaryContainerBlockRecentJobs}
                  >
                    <View
                      style={styles.someAppliersImgsAndAppliersAmountRecentJobs}
                    >
                      <ApplierImages applierImgs={job.applierImgs} />
                      <Text style={styles.aplliersAmountRecentJobs}>
                        {job.appliers} Appliers
                      </Text>
                    </View>
                    <Text style={styles.salaryAmountRecentJobs}>
                      <Text style={styles.salaryRecentJobs}>{job.salary}</Text>
                      /month
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Modal Filter with Animation - FIXED */}
      {modalFilter && (
        <View style={styles.modalContainer}>
          {/* Backdrop with fade animation */}
          <Animated.View
            style={[styles.overlayModalFilter, { opacity: fadeAnim }]}
          >
            <Pressable
              style={styles.backdropPressable}
              onPress={handleModalFilter}
            />
          </Animated.View>

          {/* Modal content with slide animation - FIXED */}
          <Animated.View
            style={[
              styles.modalFilterStyle,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalFilterHeader}>
                <Text style={styles.modalHeaderText}>Filter</Text>
                <Pressable onPress={handleModalFilter}>
                  <FontAwesome name="close" size={42} color="black" />
                </Pressable>
              </View>
              <View style={styles.filterBySelectBlock}>
                {/* <Picker
                  selectedValue={filterByCity}
                  onValueChange={(itemValue) => setFilterByCity(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="All cities" value="" />
                  <Picker.Item label="Dushanbe" value="dushanbe" />
                  <Picker.Item label="Khujand" value="khujand" />
                  <Picker.Item label="Kulob" value="kulob" />
                  <Picker.Item label="Bokhtar" value="bokhtar" />
                </Picker> */}
                <RNPickerSelect
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "All cities", value: "" },
                    { label: "Dushanbe", value: "dushanbe" },
                    { label: "Khujand", value: "khujand" },
                    { label: "Kulob", value: "kulob" },
                    { label: "Bokhtar", value: "bokhtar" },
                  ]}
                  style={{
                    inputIOS: {
                      width: "100%",
                      borderRadius: 20,
                      borderWidth: 1,
                      fontSize: 18,
                      paddingVertical: 12,
                      paddingHorizontal: 10,
                      color: "black",
                      backgroundColor: "#F5F6FA",
                      marginTop: 10,
                    },
                    inputAndroid: {
                      width: "100%",
                      borderRadius: 20,
                      borderWidth: 1,
                      fontSize: 18,
                      paddingVertical: 1,
                      paddingHorizontal: 10,
                      color: "black",
                      backgroundColor: "#F5F6FA",
                      marginTop: 10,
                    },
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  homeComponentBlock: {
    flex: 1,
  },
  headerHomeComponent: {
    backgroundColor: "#0961F6",
    paddingTop: 50,
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
  headerBlock2InOpeningModalFilter: {
    display: "none",
  },
  searchInputBlock: {
    position: "relative",
    flex: 1,
  },
  searchInputBlockInOpeningModalFilter: {
    display: "none",
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
    paddingBottom: 22,
  },
  suggestedJobAndSeeAllTextsBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  suggestedJobText: {
    fontSize: 28,
    fontWeight: "500",
  },
  seeAllBtn: {},
  seeAllBtnText: {
    color: "#6865C2",
    fontSize: 22,
    fontWeight: "400",
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
  recentJobsBlock: {},
  recentJobsText: {
    fontSize: 28,
    fontWeight: "500",
  },
  filterByCategoryBlock: {},
  filterByCategoryBlockScroll: {
    marginTop: 10,
    gap: 20,
  },
  filterByCategoryBtn: {
    backgroundColor: "#d4d4d4",
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  filterByCategoryBtnText: {
    fontSize: 20,
    fontWeight: "400",
  },
  recentJobs: {
    marginTop: 30,
    gap: 15,
  },
  containerRecentJobs: {
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
  headerContainerBlockRecentJobs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  employerImgEmployerNameAndJobBlockRecentJobs: {
    flexDirection: "row",
    gap: 6,
  },
  employerImgRecentJobs: {
    width: 61,
    height: 58,
    borderRadius: 50,
  },
  employerNameAndJobBlockRecentJobs: {},
  employerNameRecentJobs: {
    fontWeight: "bold",
    fontSize: 22,
  },
  jobRecentJobs: {
    color: "#888888",
    fontSize: 18,
  },
  locationContainerBlockRecentJobs: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  locationRecentJobs: {
    color: "#B7B7B7",
    fontSize: 20,
    fontWeight: "600",
  },
  employmentTypeWorkingModelAndJobLevelContainerBlockRecentJobs: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  employmentTypeRecentJobs: {
    color: "#616161",
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 1,
    paddingHorizontal: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
  },
  workingModelRecentJobs: {
    color: "#616161",
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 1,
    paddingHorizontal: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
  },
  jobLevelRecentJobs: {
    color: "#616161",
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 1,
    paddingHorizontal: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
  },
  lineContainerBlockRecentJobs: {
    marginTop: 14,
    backgroundColor: "#D9D9D9",
    height: 6,
  },
  appliersAndSalaryContainerBlockRecentJobs: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  someAppliersImgsAndAppliersAmountRecentJobs: {},
  someAppliersImgAndDownIconRecentJobs: {
    position: "relative",
    height: 30,
  },
  appliersImgRecentJobs: {
    width: 30,
    height: 30,
    position: "absolute",
    borderRadius: 35,
    zIndex: 5,
  },
  downIconRecentJobs: {
    position: "absolute",
    borderRadius: 35,
    top: 0,
    left: 42,
    zIndex: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  aplliersAmountRecentJobs: {
    color: "#878787",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 4,
  },
  salaryAmountRecentJobs: {
    fontSize: 23,
    fontWeight: "700",
    color: "#7E7E7E",
  },
  salaryRecentJobs: {
    color: "#766EAA",
  },

  // Modal Filter with Animation - COMPLETELY FIXED
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  overlayModalFilter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropPressable: {
    flex: 1,
  },
  modalFilterStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
  modalContent: {
    flex: 1,
    marginTop: 50,
  },
  modalFilterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalHeaderText: {
    fontSize: 32,
    fontWeight: "700",
  },
  filterBySelectBlock: {
    padding: 0,
    marginHorizontal: 20,
  },
  picker: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
  },
});
