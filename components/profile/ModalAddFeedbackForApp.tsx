import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
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

const ModalAddFeedbackForApp = ({
  modalAddFeedbackForApp,
  setModalAddFeedbackForApp,
}: {
  modalAddFeedbackForApp: boolean;
  setModalAddFeedbackForApp: any;
}) => {
  return (
    <Modal
      visible={modalAddFeedbackForApp}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setModalAddFeedbackForApp(!modalAddFeedbackForApp);
      }}
      style={styles.modalAddFeedbackForAppComponent}
    >
      <Pressable
        style={styles.overlayModalAddFeedbackForApp}
        onPress={() => {
          setModalAddFeedbackForApp(false);
        }}
      >
        <Pressable
          style={styles.modalAddFeedbackForAppMainBlock}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.headerModalAddFeedbackForApp}>
            <Pressable
              style={styles.btnCloseModalAddFeedbackForApp}
              onPress={() => {
                setModalAddFeedbackForApp(false);
              }}
            >
              <FontAwesome name="close" size={32} color="black" />
            </Pressable>
            <Text style={styles.textHeaderModalAddFeedbackForApp}>
              Write Us Feedback
            </Text>
          </View>
          <View style={styles.sectionModalAddFeedbackForApp}>
            <View style={styles.blockUserImgAndUserFullname}>
              <Image
                source={require("../../assets/tajjob/profile/profileImg.jpg")}
                style={styles.userImg}
              />
              <Text style={styles.userFullname}>Olim Yuldoshev</Text>
            </View>
            <View style={styles.scrollViewContainer}>
              <ScrollView
                contentContainerStyle={
                  styles.blockSectionModalAddFeedbackForAppScrollView
                }
                style={styles.blockSectionModalAddFeedbackForApp}
              >
                <View
                  style={[
                    styles.emailLabelIconAndInput,
                    styles.labelIconAndInputBlock,
                  ]}
                >
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.iconAndInputBlock}>
                    <MaterialCommunityIcons
                      name="email"
                      size={35}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="example@gmail.com"
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.phoneNumberLabelIconAndInput,
                    styles.labelIconAndInputBlock,
                  ]}
                >
                  <Text style={styles.label}>Phone number</Text>
                  <View style={styles.iconAndInputBlock}>
                    <FontAwesome5
                      name="phone-alt"
                      size={30}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="(+992) ** *** ****"
                    />
                  </View>
                </View>
                <View style={styles.detailedReviewLabelAndInput}>
                  <Text style={[styles.labelDetailedReview, styles.label]}>
                    Detailed review
                  </Text>
                  <TextInput
                    style={styles.inputDetailedReview}
                    placeholder="Enter here"
                    multiline
                    numberOfLines={7}
                  />
                </View>
                <Pressable style={styles.btnSubmitFeedbackForApp}>
                  <Text style={styles.btnTextSubmitFeedbackForApp}>Submit</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ModalAddFeedbackForApp;

const styles = StyleSheet.create({
  modalAddFeedbackForAppComponent: {},
  overlayModalAddFeedbackForApp: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalAddFeedbackForAppMainBlock: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#2623D2",
  },
  headerModalAddFeedbackForApp: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    gap: 51,
  },
  btnCloseModalAddFeedbackForApp: {
    backgroundColor: "#dddddd",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  textHeaderModalAddFeedbackForApp: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  btnTextCloseModalAddFeedbackForApp: {},
  sectionModalAddFeedbackForApp: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    position: "relative",
  },
  blockUserImgAndUserFullname: {
    alignItems: "center",
    gap: 5,
    position: "absolute",
    top: -41,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  userImg: {
    width: 86,
    height: 86,
    borderRadius: 50,
  },
  userFullname: {
    fontSize: 32,
    fontWeight: "700",
  },
  scrollViewContainer: {
    marginTop: 85,
    padding: 10,
    paddingBottom: 0
  },
  blockSectionModalAddFeedbackForAppScrollView: {
    gap: 15,
    paddingBottom: 10,
  },
  blockSectionModalAddFeedbackForApp: {},
  emailLabelIconAndInput: {},
  phoneNumberLabelIconAndInput: {},
  detailedReviewLabelAndInput: {
    gap: 9,
    paddingHorizontal: 5,
  },
  labelDetailedReview: {},
  inputDetailedReview: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 22,
    fontWeight: "400",
    borderRadius: 20,
    paddingVertical: 15,
    minHeight: 210,
    textAlignVertical: "top",
  },
  btnSubmitFeedbackForApp: {
    backgroundColor: "#2623D2",
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  btnTextSubmitFeedbackForApp: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },

  // Styles with the same names
  labelIconAndInputBlock: {
    gap: 9,
  },

  label: {
    color: "#4C4ADA",
    fontSize: 25,
    fontWeight: "500",
  },
  iconAndInputBlock: {
    position: "relative",
    paddingHorizontal: 3,
  },
  icon: {
    position: "absolute",
    top: 9,
    left: 11,
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 22,
    fontWeight: "400",
    borderRadius: 20,
    paddingVertical: 12,
    paddingLeft: 53,
  },
});
