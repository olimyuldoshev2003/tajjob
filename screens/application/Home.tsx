import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

// import Dropdown from "react-native-input-select";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Selector } from "rn-selector";

// Icons
import EachJob from "@/components/home/EachJob";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Define the props interface
interface HomeProps {
  onJobPress?: (job: any) => void;
}

const Home = ({ onJobPress }: HomeProps) => {
  const navigation: any = useNavigation();

  // Use useColorScheme hook to get the current theme
  const colorScheme = useColorScheme();

  const [modalFilter, setModalFilter] = useState<boolean>(false);
  const [filterByCity, setFilterByCity] = useState<string>("");
  const [checked, setChecked] = useState(false);

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  // Update theme whenever colorScheme changes
  useEffect(() => {
    // Force re-render when theme changes
    // This useEffect will trigger whenever useColorScheme() returns a new value
  }, [colorScheme]);

  useEffect(() => {
    if (modalFilter) {
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalFilter]);

  const modalTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_HEIGHT * 1, 0],
  });

  const backdropOpacity = backdropAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

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

  const filtersBySphere = [
    {
      id: 1,
      filterName: "Medicine",
      isChecked: false,
    },
    {
      id: 2,
      filterName: "Engineering",
      isChecked: true,
    },
    {
      id: 3,
      filterName: "Information Technology",
      isChecked: false,
    },
    {
      id: 4,
      filterName: "Education",
      isChecked: true,
    },
    {
      id: 5,
      filterName: "Business Administration",
      isChecked: false,
    },
    {
      id: 6,
      filterName: "Law",
      isChecked: true,
    },
    {
      id: 7,
      filterName: "Architecture",
      isChecked: false,
    },
    {
      id: 8,
      filterName: "Graphic Design",
      isChecked: true,
    },
    {
      id: 9,
      filterName: "Marketing",
      isChecked: false,
    },
    {
      id: 10,
      filterName: "Accounting",
      isChecked: true,
    },
    {
      id: 11,
      filterName: "Psychology",
      isChecked: false,
    },
    {
      id: 12,
      filterName: "Programmer",
      isChecked: true,
    },
    {
      id: 13,
      filterName: "Tourism and Hospitality",
      isChecked: false,
    },
  ];
  const filtersByExperience = [
    {
      id: 1,
      filterName: "No experience required",
      isChecked: true,
    },
    {
      id: 2,
      filterName: "From 3 months to 1 year",
      isChecked: false,
    },
    {
      id: 3,
      filterName: "1-2 years",
      isChecked: true,
    },
    {
      id: 4,
      filterName: "2-5 years",
      isChecked: false,
    },
    {
      id: 5,
      filterName: "10+ years",
      isChecked: true,
    },
  ];

  // Functions
  const handleModalFilter = () => {
    setModalFilter(!modalFilter);
  };

  const handleCloseModal = () => {
    // Animate out before closing
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalFilter(false);
    });
  };

  const handleJobPress = (job: any) => {
    onJobPress?.(job);
  };

  // Dynamic styles based on current theme
  const dynamicStyles = StyleSheet.create({
    homeComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
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
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    seeAllBtn: {},
    seeAllBtnText: {
      color: "#6865C2",
      fontSize: 22,
      fontWeight: "400",
    },

    suggestedJobsBlock: {
      gap: 15,
    },
    recentJobsBlock: {},
    recentJobsText: {
      fontSize: 28,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    filterByCategoryBlock: {},
    filterByCategoryBlockScroll: {
      marginTop: 10,
      gap: 20,
    },
    filterByCategoryBtn: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#d4d4d4",
      paddingVertical: 2.5,
      paddingHorizontal: 10,
      borderRadius: 14,
    },
    filterByCategoryBtnText: {
      fontSize: 20,
      fontWeight: "400",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    recentJobs: {
      marginTop: 30,
      gap: 15,
    },

    // Modal Filter sliding from top
    //////////////////////////////////////////////////
    modalContainer: {
      flex: 1,
      justifyContent: "flex-start",
    },
    overlayModalFilter: {
      ...StyleSheet.absoluteFillObject,
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
      backgroundColor: colorScheme === "dark" ? "#121212" : "white",
      maxHeight: SCREEN_HEIGHT * 1.03,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalFilterScrollContent: {
      flex: 1,
    },
    modalFilterHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 20,
      paddingHorizontal: 20,
      paddingTop: 25,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === "dark" ? "#333" : "#E5E5E5",
    },
    closeButton: {
      padding: 5,
    },
    modalHeaderText: {
      fontSize: 32,
      fontWeight: "700",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    modalFilterSection: {
      paddingVertical: 10,
      paddingBottom: 25,
    },
    filterBySelectBlock: {
      marginHorizontal: 20,
      marginTop: 12,
    },
    selectByCity: {
      borderWidth: 2,
      borderColor: colorScheme === "dark" ? "#555" : "#A2A2A2",
      fontSize: 25,
      fontWeight: "400",
      width: "100%",
      backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#fff",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },

    filterBySphereAndExperienceWithCheckboxBlock: {
      marginTop: 30
    },

    // Filter By Sphere
    filterBySphere: {
      paddingHorizontal: 20,
    },
    titleFilterBySphere: {
      fontSize: 25,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    checkboxesForFilterBySphereBlock: {
      marginTop: 10,
      gap: 12,
    },

    // Filter By Experience
    filterByExperience: {
      paddingHorizontal: 20,
      marginTop: 10,
    },
    titleFilterByExperience: {
      fontSize: 25,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    checkboxesForFilterByExperienceBlock: {
      marginTop: 10,
      gap: 1,
    },

    // Checkbox And its label
    checkboxAndItsLabelBlock: {},
    checkboxAndItsLabel: {},

    // Button Apply and Reset
    btnApplyAndResetBlock: {
      marginTop: 17,
      paddingHorizontal: 21,
      gap: 4,
    },
    btnApply: {
      backgroundColor: "#0961F6",
      borderRadius: 30,
      paddingVertical: 10,
    },
    btnApplyText: {
      textAlign: "center",
      color: "#fff",
      fontSize: 22,
      fontWeight: "500",
    },
    btnReset: {
      borderRadius: 30,
      paddingVertical: 10,
    },
    btnResetText: {
      textAlign: "center",
      color: colorScheme === "dark" ? "#aaa" : "#707070",
      fontSize: 21,
      fontWeight: "400",
    },
    //////////////////////////////////////////////////
  });

  return (
    <View style={dynamicStyles.homeComponent}>
      <View style={dynamicStyles.homeComponentBlock}>
        <View style={[dynamicStyles.headerHomeComponent]}>
          <View style={dynamicStyles.headerBlock1}>
            <View style={dynamicStyles.headerTextBlock}>
              <Text style={dynamicStyles.greetingsAndName}>Hi Olim</Text>
              <Text style={dynamicStyles.greetingText}>Welcome</Text>
            </View>
            <View style={dynamicStyles.blockNotificationIcon}>
              <MaterialIcons
                name="notifications"
                size={44}
                color="white"
                style={dynamicStyles.notificationIcon}
                onPress={() => {
                  navigation.navigate("Notifications");
                }}
              />
              <View style={dynamicStyles.newNotificationNotice} />
            </View>
          </View>
          <View style={[dynamicStyles.headerBlock2]}>
            <View style={[dynamicStyles.searchInputBlock]}>
              <Ionicons
                name="search"
                size={38}
                color="black"
                style={dynamicStyles.searchIcon}
              />
              <TextInput
                style={dynamicStyles.searchInput}
                placeholder="Search"
                pointerEvents="none"
                placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
              />
            </View>
            <Pressable
              style={dynamicStyles.filterBtn}
              onPress={handleModalFilter}
            >
              <Image
                source={require("../../assets/tajjob/home/filter.jpg")}
                style={dynamicStyles.filterIcon}
              />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={dynamicStyles.sectionHomeComponent}>
          <View style={dynamicStyles.suggestedJobAndSeeAllTextsBlock}>
            <Text style={dynamicStyles.suggestedJobText}>Suggested job</Text>
            <Pressable style={dynamicStyles.seeAllBtn}>
              <Text style={dynamicStyles.seeAllBtnText}>See all</Text>
            </Pressable>
          </View>
          <View style={dynamicStyles.suggestedJobsBlock}>
            {jobs.map((suggestedJob: any) => {
              return (
                <EachJob
                  key={suggestedJob.id}
                  job={suggestedJob}
                  handleJobPress={handleJobPress}
                />
              );
            })}
          </View>

          <View style={dynamicStyles.recentJobsBlock}>
            <Text style={dynamicStyles.recentJobsText}>Recent Jobs</Text>
            <ScrollView
              horizontal
              style={dynamicStyles.filterByCategoryBlock}
              contentContainerStyle={dynamicStyles.filterByCategoryBlockScroll}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable style={dynamicStyles.filterByCategoryBtn}>
                <Text style={dynamicStyles.filterByCategoryBtnText}>All</Text>
              </Pressable>
              <Pressable style={dynamicStyles.filterByCategoryBtn}>
                <Text style={dynamicStyles.filterByCategoryBtnText}>
                  IT-Job
                </Text>
              </Pressable>
              <Pressable style={dynamicStyles.filterByCategoryBtn}>
                <Text style={dynamicStyles.filterByCategoryBtnText}>
                  Operator
                </Text>
              </Pressable>
              <Pressable style={dynamicStyles.filterByCategoryBtn}>
                <Text style={dynamicStyles.filterByCategoryBtnText}>
                  Delivery
                </Text>
              </Pressable>
              <Pressable style={dynamicStyles.filterByCategoryBtn}>
                <Text style={dynamicStyles.filterByCategoryBtnText}>
                  Delivery
                </Text>
              </Pressable>
              <Pressable style={dynamicStyles.filterByCategoryBtn}>
                <Text style={dynamicStyles.filterByCategoryBtnText}>
                  Delivery
                </Text>
              </Pressable>
              <Pressable style={dynamicStyles.filterByCategoryBtn}>
                <Text style={dynamicStyles.filterByCategoryBtnText}>
                  Delivery
                </Text>
              </Pressable>
            </ScrollView>
            <View style={dynamicStyles.recentJobs}>
              {jobs.map((recentJob: any) => {
                return (
                  <EachJob
                    key={recentJob.id}
                    job={recentJob}
                    handleJobPress={handleJobPress}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Modal Filter sliding from top */}
      <Modal
        visible={modalFilter}
        animationType="none"
        transparent={true}
        onRequestClose={handleCloseModal}
        statusBarTranslucent={true}
      >
        <View style={dynamicStyles.modalContainer}>
          {/* Animated Backdrop */}
          <Animated.View
            style={[
              dynamicStyles.overlayModalFilter,
              { opacity: backdropOpacity },
            ]}
          >
            <Pressable
              style={dynamicStyles.backdropPressable}
              onPress={handleCloseModal}
            />
          </Animated.View>

          {/* Animated Modal Content */}
          <Animated.View
            style={[
              dynamicStyles.modalFilterStyle,
              {
                transform: [{ translateY: modalTranslateY }],
              },
            ]}
          >
            {/* Fixed Header */}
            <View style={dynamicStyles.modalFilterHeader}>
              <Text style={dynamicStyles.modalHeaderText}>Filter</Text>
              <Pressable
                onPress={handleCloseModal}
                style={dynamicStyles.closeButton}
              >
                <FontAwesome
                  name="close"
                  size={42}
                  color={colorScheme === "dark" ? "#fff" : "black"}
                />
              </Pressable>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              style={dynamicStyles.modalFilterScrollContent}
              contentContainerStyle={dynamicStyles.modalFilterSection}
              showsVerticalScrollIndicator={false}
            >
              <View style={dynamicStyles.filterBySelectBlock}>
                <Selector
                  options={[
                    { label: "All cities", value: "" },
                    { label: "Dushanbe", value: "dushanbe" },
                    { label: "Khujand", value: "khujand" },
                    { label: "Kulob", value: "kulob" },
                    { label: "Bokhtar", value: "bokhtar" },
                  ]}
                  selectedValue={filterByCity}
                  onValueChange={(value) => {
                    setFilterByCity(value);
                  }}
                  placeholder="Select the city..."
                  searchable={true}
                  primaryColor="#1976d2"
                  style={dynamicStyles.selectByCity}
                  textStyle={{
                    color: "#bebebe",
                  }}
                  customArrow={
                    <Entypo
                      name="chevron-thin-down"
                      size={24}
                      color={colorScheme === "dark" ? "#fff" : "black"}
                    />
                  }
                />
              </View>
              <View
                style={
                  dynamicStyles.filterBySphereAndExperienceWithCheckboxBlock
                }
              >
                <View style={dynamicStyles.filterBySphere}>
                  <Text style={dynamicStyles.titleFilterBySphere}>Sphere</Text>
                  <View style={dynamicStyles.checkboxesForFilterBySphereBlock}>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Medicine"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Engineering"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Information Technology"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Education"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Business Administration"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Law"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Architecture"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Graphic Design"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Marketing"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Accounting"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Psychology"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Programmer"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <BouncyCheckbox
                        isChecked={checked}
                        size={25}
                        fillColor="blue"
                        unFillColor={
                          colorScheme === "dark" ? "#333" : "#FFFFFF"
                        }
                        text="Tourism and Hospitality"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                          fontFamily: "JosefinSans-Regular",
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                        onPress={(isChecked: boolean) => {
                          setChecked(checked);
                        }}
                        style={dynamicStyles.checkboxAndItsLabel}
                      />
                    </View>
                  </View>
                </View>
                <View style={dynamicStyles.filterByExperience}>
                  <Text style={dynamicStyles.titleFilterByExperience}>
                    Experience
                  </Text>
                  <View
                    style={dynamicStyles.checkboxesForFilterByExperienceBlock}
                  >
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <AdvancedCheckbox
                        value={checked}
                        onValueChange={() => {
                          setChecked(!checked);
                        }}
                        label="No experience required"
                        checkedColor="#007AFF"
                        uncheckedColor="#ccc"
                        size={24}
                        labelStyle={{
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <AdvancedCheckbox
                        value={checked}
                        onValueChange={() => {
                          setChecked(!checked);
                        }}
                        label="From 3 months to 1 year"
                        checkedColor="#007AFF"
                        uncheckedColor="#ccc"
                        size={24}
                        labelStyle={{
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <AdvancedCheckbox
                        value={checked}
                        onValueChange={() => {
                          setChecked(!checked);
                        }}
                        label="1-2 years"
                        checkedColor="#007AFF"
                        uncheckedColor="#ccc"
                        size={24}
                        labelStyle={{
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <AdvancedCheckbox
                        value={checked}
                        onValueChange={() => {
                          setChecked(!checked);
                        }}
                        label="2-5 years"
                        checkedColor="#007AFF"
                        uncheckedColor="#ccc"
                        size={24}
                        labelStyle={{
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                      />
                    </View>
                    <View style={dynamicStyles.checkboxAndItsLabelBlock}>
                      <AdvancedCheckbox
                        value={checked}
                        onValueChange={() => {
                          setChecked(!checked);
                        }}
                        label="10 years"
                        checkedColor="#007AFF"
                        uncheckedColor="#ccc"
                        size={24}
                        labelStyle={{
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={dynamicStyles.btnApplyAndResetBlock}>
                <Pressable style={dynamicStyles.btnApply}>
                  <Text style={dynamicStyles.btnApplyText}>Apply filter</Text>
                </Pressable>
                <Pressable style={dynamicStyles.btnReset}>
                  <Text style={dynamicStyles.btnResetText}>Reset</Text>
                </Pressable>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
