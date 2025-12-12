import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const History = () => {
  const colorScheme = useColorScheme();

  const dynamicStyles = StyleSheet.create({
    historyComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "white",
    },
    historyComponentBlock: {},
    headerBlockHistoryComponent: {
      paddingVertical: 11.5,
      paddingHorizontal: 19,
      paddingTop: 36,
      borderBottomWidth: 1,
      borderBottomColor: "#D9D9D9",
    },
    headerTextHistoryComponent: {
      color: colorScheme === "dark" ? "#fff" : "#000000",
      fontSize: 30,
      fontWeight: "500",
    },
    sectionBlockHistoryComponent: {},
    sectionBlockHistoryComponentScroll: {
      paddingVertical: 18,
      paddingHorizontal: 22,
      gap: 20,
      paddingBottom: 190,
    },
    history: {
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
    historyHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      paddingHorizontal: 3,
    },
    employerImg: {
      width: 59,
      height: 59,
      borderRadius: 35,
    },
    employerNameAndJob: {},
    employerName: {
      fontSize: 26,
      fontWeight: "600",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    job: {
      color: colorScheme === "dark" ? "#fff" : "#888888",
      fontSize: 23,
      fontWeight: "500",
    },
    explanationDescription: {
      maxWidth: 293,
      fontSize: 16,
      fontWeight: "400",
      marginTop: 10,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    locationIconAndTheLocation: {
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    locationIcon: {},
    location: {
      color: colorScheme === "dark" ? "#fff" : "#b7b7b7",
      fontSize: 18,
      fontWeight: "600",
    },
    lineSeparation: {
      height: 4,
      backgroundColor: "#D9D9D9",
    },
    blockReviewedOrNotTitle: {
      flexDirection: "row",
      marginTop: 6,
    },
    reviewedOrNotTitle: {
      fontSize: 16,
      fontWeight: "500",
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: "#DDDDDD",
      borderRadius: 20,
    },
    submittionDate: {
      marginTop: 3,
      color: colorScheme === "dark" ? "#fff" : "#616161",
      fontSize: 16,
      fontWeight: "400",
    },
    dateOfSubmittion: {
      color: colorScheme === "dark" ? "#fff" : "#969696",
      fontSize: 14,
      fontWeight: "300",
    },
    btnMoreBlock: {
      flexDirection: "row",
      justifyContent: "center",
    },
    btnMore: {
      flexDirection: "row",
      justifyContent: "center",
    },
    textBtnMore: {
      color: colorScheme === "dark" ? "#fff" : "#7f7f7f",
      fontSize: 26,
      fontWeight: "400",
    },
    downIcon: {},
  });

  return (
    <View style={dynamicStyles.historyComponent}>
      <View style={dynamicStyles.historyComponentBlock}>
        <View style={dynamicStyles.headerBlockHistoryComponent}>
          <Text style={dynamicStyles.headerTextHistoryComponent}>History</Text>
        </View>
        <View style={dynamicStyles.sectionBlockHistoryComponent}>
          <ScrollView
            contentContainerStyle={
              dynamicStyles.sectionBlockHistoryComponentScroll
            }
          >
            {/* History 1 */}
            <View style={dynamicStyles.history}>
              <View style={dynamicStyles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={dynamicStyles.employerImg}
                />
                <View style={dynamicStyles.employerNameAndJob}>
                  <Text style={dynamicStyles.employerName}>Alif Bank</Text>
                  <Text style={dynamicStyles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={dynamicStyles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={dynamicStyles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color={colorScheme === "dark" ? "white" : "black"}
                  style={dynamicStyles.locationIcon}
                />
                <Text style={dynamicStyles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={dynamicStyles.lineSeparation} />
              <View style={dynamicStyles.blockReviewedOrNotTitle}>
                <Text style={dynamicStyles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={dynamicStyles.submittionDate}>
                Submission date:
                <Text style={dynamicStyles.dateOfSubmittion}>
                  12.09.2025, 10:23{" "}
                </Text>
              </Text>
            </View>

            {/* History 2 */}
            <View style={dynamicStyles.history}>
              <View style={dynamicStyles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={dynamicStyles.employerImg}
                />
                <View style={dynamicStyles.employerNameAndJob}>
                  <Text style={dynamicStyles.employerName}>Alif Bank</Text>
                  <Text style={dynamicStyles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={dynamicStyles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={dynamicStyles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color={colorScheme === "dark" ? "white" : "black"}
                  style={dynamicStyles.locationIcon}
                />
                <Text style={dynamicStyles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={dynamicStyles.lineSeparation} />
              <View style={dynamicStyles.blockReviewedOrNotTitle}>
                <Text style={dynamicStyles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={dynamicStyles.submittionDate}>
                Submission date:
                <Text style={dynamicStyles.dateOfSubmittion}>
                  12.09.2025, 10:23{" "}
                </Text>
              </Text>
            </View>

            {/* History 3 */}
            <View style={dynamicStyles.history}>
              <View style={dynamicStyles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={dynamicStyles.employerImg}
                />
                <View style={dynamicStyles.employerNameAndJob}>
                  <Text style={dynamicStyles.employerName}>Alif Bank</Text>
                  <Text style={dynamicStyles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={dynamicStyles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={dynamicStyles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color={colorScheme === "dark" ? "white" : "black"}
                  style={dynamicStyles.locationIcon}
                />
                <Text style={dynamicStyles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={dynamicStyles.lineSeparation} />
              <View style={dynamicStyles.blockReviewedOrNotTitle}>
                <Text style={dynamicStyles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={dynamicStyles.submittionDate}>
                Submission date:
                <Text style={dynamicStyles.dateOfSubmittion}>
                  12.09.2025, 10:23{" "}
                </Text>
              </Text>
            </View>

            {/* History 4 */}
            {/* <View style={dynamicStyles.history}>
              <View style={dynamicStyles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={dynamicStyles.employerImg}
                />
                <View style={dynamicStyles.employerNameAndJob}>
                  <Text style={dynamicStyles.employerName}>Alif Bank</Text>
                  <Text style={dynamicStyles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={dynamicStyles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={dynamicStyles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color="black"
                  style={dynamicStyles.locationIcon}
                />
                <Text style={dynamicStyles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={dynamicStyles.lineSeparation} />
              <View style={dynamicStyles.blockReviewedOrNotTitle}>
                <Text style={dynamicStyles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={dynamicStyles.submittionDate}>
                Submission date:
                <Text style={dynamicStyles.dateOfSubmittion}>12.09.2025, 10:23 </Text>
              </Text>
            </View> */}
            <View style={dynamicStyles.btnMoreBlock}>
              <Pressable style={dynamicStyles.btnMore}>
                <Text style={dynamicStyles.textBtnMore}>More</Text>
                <Entypo
                  name="chevron-small-down"
                  size={37}
                  color={colorScheme === "dark" ? "white" : "black"}
                  style={dynamicStyles.downIcon}
                />
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default History;
