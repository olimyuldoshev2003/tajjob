import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// import Dropdown from "react-native-input-select";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Selector } from "rn-selector";

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
  const [checked, setChecked] = useState(false);

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
              // modalFilter && styles.headerBlock2InOpeningModalFilter,
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

      {/* Modal Filter using React Native Modal Component */}
      <Modal
        visible={modalFilter}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalFilter}
      >
        <View style={styles.modalContainer}>
          {/* Backdrop */}
          <Pressable
            style={styles.overlayModalFilter}
            onPress={handleModalFilter}
          />

          {/* Modal content */}
          <View style={styles.modalFilterStyle}>
            <View style={styles.modalContent}>
              <View style={styles.modalFilterHeader}>
                <Text style={styles.modalHeaderText}>Filter</Text>
                <Pressable onPress={handleModalFilter}>
                  <FontAwesome name="close" size={42} color="black" />
                </Pressable>
              </View>
              <ScrollView contentContainerStyle={styles.modalFilterSection}>
                <View style={styles.filterBySelectBlock}>
                  {/* <Dropdown
                    label="Country"
                    placeholder="Select the city..."
                    options={[
                      { label: "All cities", value: " " },
                      { label: "Dushanbe", value: "dushanbe" },
                      { label: "Khujand", value: "khujand" },
                      { label: "Kulob", value: "kulob" },
                      { label: "Bokhtar", value: "bokhtar" },
                    ]}
                    selectedValue={filterByCity}
                    onValueChange={(value: any) => {
                      setFilterByCity(value);
                    }}
                    primaryColor={"green"}
                  /> */}
                  <Selector
                    options={[
                      { label: "All cities", value: "" },
                      { label: "Dushanbe", value: "dushanbe" },
                      { label: "Khujand", value: "khujand" },
                      { label: "Kulob", value: "kulob" },
                      { label: "Bokhtar", value: "bokhtar" },
                    ]}
                    selectedValue={filterByCity}
                    onValueChange={(value, option) => {
                      setFilterByCity(value);
                    }}
                    placeholder="Select the city..."
                    searchable={true}
                    primaryColor="#1976d2"
                    style={styles.selectByCity}
                    customArrow={
                      <Entypo
                        name="chevron-thin-down"
                        size={24}
                        color="black"
                      />
                    }
                  />
                </View>
                <View
                  style={styles.filterBySphereAndExperienceWithCheckboxBlock}
                >
                  <View style={styles.filterBySphere}>
                    <Text style={styles.titleFilterBySphere}>Sphere</Text>
                    <View style={styles.checkboxesForFilterBySphereBlock}>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Medicine"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Engineering"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Information Technology"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Education"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Business Administration"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Law"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Architecture"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Graphic Design"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Marketing"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Accounting"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Psychology"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Programmer"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <BouncyCheckbox
                          isChecked={checked}
                          size={25}
                          fillColor="blue"
                          unFillColor="#FFFFFF"
                          text="Tourism and Hospitality"
                          iconStyle={{ borderColor: "red" }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={(isChecked: boolean) => {
                            setChecked(checked);
                          }}
                          style={styles.checkboxAndItsLabel}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.filterByExperience}>
                    <Text style={styles.titleFilterByExperience}>
                      Experience
                    </Text>
                    <View style={styles.checkboxesForFilterByExperienceBlock}>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <AdvancedCheckbox
                          value={checked}
                          onValueChange={() => {
                            setChecked(!checked);
                          }}
                          label="No experience required"
                          checkedColor="#007AFF"
                          uncheckedColor="#ccc"
                          size={24}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <AdvancedCheckbox
                          value={checked}
                          onValueChange={() => {
                            setChecked(!checked);
                          }}
                          label="From 3 months to 1 year"
                          checkedColor="#007AFF"
                          uncheckedColor="#ccc"
                          size={24}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <AdvancedCheckbox
                          value={checked}
                          onValueChange={() => {
                            setChecked(!checked);
                          }}
                          label="1-2 years"
                          checkedColor="#007AFF"
                          uncheckedColor="#ccc"
                          size={24}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <AdvancedCheckbox
                          value={checked}
                          onValueChange={() => {
                            setChecked(!checked);
                          }}
                          label="2-5 years"
                          checkedColor="#007AFF"
                          uncheckedColor="#ccc"
                          size={24}
                        />
                      </View>
                      <View style={styles.checkboxAndItsLabelBlock}>
                        <AdvancedCheckbox
                          value={checked}
                          onValueChange={() => {
                            setChecked(!checked);
                          }}
                          label="10 years"
                          checkedColor="#007AFF"
                          uncheckedColor="#ccc"
                          size={24}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.btnApplyAndResetBlock}>
                  <Pressable style={styles.btnApply}>
                    <Text style={styles.btnApplyText}>Apply filter</Text>
                  </Pressable>
                  <Pressable style={styles.btnReset}>
                    <Text style={styles.btnResetText}>Reset</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
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

  // Modal Filter using React Native Modal Component
  //////////////////////////////////////////////////
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  overlayModalFilter: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalFilterStyle: {
    backgroundColor: "white",
    height: "100%",
  },
  modalContent: {
    flex: 1,
    marginTop: 10,
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
    borderColor: "#A2A2A2",
    fontSize: 25,
    fontWeight: "400",
    width: "100%",
  },

  filterBySphereAndExperienceWithCheckboxBlock: {
    marginTop: 30,
  },

  // Filter By Sphere
  filterBySphere: {
    paddingHorizontal: 20,
  },
  titleFilterBySphere: {
    fontSize: 25,
    fontWeight: 500,
  },
  checkboxesForFilterBySphereBlock: {
    marginTop: 10,
    gap: 12,
  },

  // Filter By Experice
  filterByExperience: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  titleFilterByExperience: {
    fontSize: 25,
    fontWeight: 500,
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
    color: "#707070",
    fontSize: 21,
    fontWeight: "400",
  },
  //////////////////////////////////////////////////
});
