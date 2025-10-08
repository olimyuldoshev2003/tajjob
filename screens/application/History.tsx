import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const History = () => {
  return (
    <View style={styles.historyComponent}>
      <View style={styles.historyComponentBlock}>
        <View style={styles.headerBlockHistoryComponent}>
          <Text style={styles.headerTextHistoryComponent}>History</Text>
        </View>
        <View style={styles.sectionBlockHistoryComponent}>
          <ScrollView
            contentContainerStyle={styles.sectionBlockHistoryComponentScroll}
          >
            {/* History 1 */}
            <View style={styles.history}>
              <View style={styles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={styles.employerImg}
                />
                <View style={styles.employerNameAndJob}>
                  <Text style={styles.employerName}>Alif Bank</Text>
                  <Text style={styles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={styles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={styles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color="black"
                  style={styles.locationIcon}
                />
                <Text style={styles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={styles.lineSeparation} />
              <View style={styles.blockReviewedOrNotTitle}>
                <Text style={styles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={styles.submittionDate}>
                Submission date:
                <Text style={styles.dateOfSubmittion}>12.09.2025, 10:23 </Text>
              </Text>
            </View>

            {/* History 2 */}
            <View style={styles.history}>
              <View style={styles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={styles.employerImg}
                />
                <View style={styles.employerNameAndJob}>
                  <Text style={styles.employerName}>Alif Bank</Text>
                  <Text style={styles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={styles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={styles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color="black"
                  style={styles.locationIcon}
                />
                <Text style={styles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={styles.lineSeparation} />
              <View style={styles.blockReviewedOrNotTitle}>
                <Text style={styles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={styles.submittionDate}>
                Submission date:
                <Text style={styles.dateOfSubmittion}>12.09.2025, 10:23 </Text>
              </Text>
            </View>

            {/* History 3 */}
            <View style={styles.history}>
              <View style={styles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={styles.employerImg}
                />
                <View style={styles.employerNameAndJob}>
                  <Text style={styles.employerName}>Alif Bank</Text>
                  <Text style={styles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={styles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={styles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color="black"
                  style={styles.locationIcon}
                />
                <Text style={styles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={styles.lineSeparation} />
              <View style={styles.blockReviewedOrNotTitle}>
                <Text style={styles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={styles.submittionDate}>
                Submission date:
                <Text style={styles.dateOfSubmittion}>12.09.2025, 10:23 </Text>
              </Text>
            </View>

            {/* History 4 */}
            {/* <View style={styles.history}>
              <View style={styles.historyHeader}>
                <Image
                  source={require("../../assets/tajjob/home/alif.jpg")}
                  style={styles.employerImg}
                />
                <View style={styles.employerNameAndJob}>
                  <Text style={styles.employerName}>Alif Bank</Text>
                  <Text style={styles.job}>Operation specialist</Text>
                </View>
              </View>
              <Text style={styles.explanationDescription}>
                You have placed a request in the operator section in the
                alphabet.
              </Text>
              <View style={styles.locationIconAndTheLocation}>
                <Entypo
                  name="location-pin"
                  size={22}
                  color="black"
                  style={styles.locationIcon}
                />
                <Text style={styles.location}>Dushanbe, Tajikistan</Text>
              </View>
              <View style={styles.lineSeparation} />
              <View style={styles.blockReviewedOrNotTitle}>
                <Text style={styles.reviewedOrNotTitle}>
                  It will be reviewed
                </Text>
              </View>
              <Text style={styles.submittionDate}>
                Submission date:
                <Text style={styles.dateOfSubmittion}>12.09.2025, 10:23 </Text>
              </Text>
            </View> */}
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

export default History;

const styles = StyleSheet.create({
  historyComponent: {
    flex: 1,
    backgroundColor: "white",
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
    color: "#000000",
    fontSize: 30,
    fontWeight: "500",
  },
  sectionBlockHistoryComponent: {},
  sectionBlockHistoryComponentScroll: {
    paddingVertical: 18,
    paddingHorizontal: 22,
    gap: 20,
    paddingBottom: 190
  },
  history: {
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
  },
  job: {
    color: "#888888",
    fontSize: 23,
    fontWeight: "500",
  },
  explanationDescription: {
    maxWidth: 293,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  locationIconAndTheLocation: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {},
  location: {
    color: "#B7B7B7",
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
    color: "#616161",
    fontSize: 16,
    fontWeight: "400",
  },
  dateOfSubmittion: {
    color: "#969696",
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
    color: "#7F7F7F",
    fontSize: 26,
    fontWeight: "400",
  },
  downIcon: {},
});
