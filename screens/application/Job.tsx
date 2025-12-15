import ModalAddReview from "@/components/job/ModalAddReview";
import ModalApply from "@/components/job/ModalApply";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import AboutEmployer from "./AboutEmployer";
import AboutJob from "./AboutJob";
import ReviewJob from "./ReviewJob";

const Job = ({ route }: { route: any }) => {
  const navigation: any = useNavigation();

  const colorScheme = useColorScheme();

  const Tab = createMaterialTopTabNavigator();
  const [modalAddReview, setModalAddReview] = useState<boolean>(false);
  const [modalApply, setModalApply] = useState<boolean>(false);

  // Basic share function
  const onShare = async () => {
    try {
      const shareContent = {
        title: "Job Opportunity - Alif Bank",
        message: `Check out this job opportunity!\n\n🏢 Alif Bank\n💼 Operation Specialist\n📍 Dushanbe, Tajikistan\n💰 1500 somoni/month\n🔄 Remote\n📅 Full-Time\n🎯 Internship\n\nDownload TajJob app to apply!`,
        url: "https://tajjob.app/download", // Your app download link
      };

      const result = await Share.share(
        Platform.OS === "android"
          ? {
              title: shareContent.title,
              message: `${shareContent.message}\n\n${shareContent.url}`,
            }
          : shareContent,
        {
          // Android specific options for Direct Share
          dialogTitle: "Share Job Opportunity",
          subject: shareContent.title, // For email
        }
      );

      console.log("Share result:", result);
    } catch (error: any) {
      Alert.alert("Error", "Failed to share job information");
      console.error("Share error:", error.message);
    }
  };

  // Advanced share with more options
  const advancedShare = async () => {
    try {
      const jobData = {
        company: "Alif Bank",
        position: "Operation Specialist",
        location: "Dushanbe, Tajikistan",
        salary: "1500 somoni/month",
        type: "Full-Time",
        model: "Remote",
        level: "Internship",
      };

      const shareOptions = {
        title: `${jobData.position} at ${jobData.company}`,
        message:
          `🚀 Amazing Job Opportunity!\n\n` +
          `🏢 Company: ${jobData.company}\n` +
          `💼 Position: ${jobData.position}\n` +
          `📍 Location: ${jobData.location}\n` +
          `💰 Salary: ${jobData.salary}\n` +
          `🏠 Work: ${jobData.model}\n` +
          `⏱️ Type: ${jobData.type}\n` +
          `🎯 Level: ${jobData.level}\n\n` +
          `Check it out on TajJob app!\n` +
          `https://tajjob.app/download`,
        subject: `Job Opportunity - ${jobData.company}`,
      };

      await Share.share(shareOptions, {
        dialogTitle: "Share this job with...",
        excludedActivityTypes:
          Platform.OS === "ios"
            ? [
                "com.apple.UIKit.activity.AddToReadingList",
                "com.apple.UIKit.activity.AirDrop",
                "com.apple.UIKit.activity.Print",
              ]
            : undefined,
      });
    } catch (error) {
      console.error("Advanced share failed:", error);
    }
  };

  // Share to specific app (limited functionality)
  const shareToSpecificApp = async (appName: string) => {
    let deepLink = "";

    // Define deep links for different apps
    const appLinks: { [key: string]: string } = {
      whatsapp: `whatsapp://send?text=${encodeURIComponent(
        `Check out this job at Alif Bank! Operation Specialist - 1500 somoni/month - Remote`
      )}`,
      telegram: `tg://msg?text=${encodeURIComponent(
        `Check out this job at Alif Bank! Operation Specialist - 1500 somoni/month - Remote`
      )}`,
      // Add more app deep links as needed
    };

    deepLink = appLinks[appName.toLowerCase()];

    if (deepLink) {
      try {
        // You would use Linking.openURL here, but it's limited
        console.log(`Sharing to ${appName}: ${deepLink}`);
        Alert.alert(
          "Info",
          `This would open ${appName} directly. Requires additional setup.`
        );
      } catch (error) {
        Alert.alert(
          "Error",
          `${appName} is not installed or cannot be opened.`
        );
      }
    }
  };

  // Custom share sheet (alternative approach)
  const showCustomShareOptions = () => {
    Alert.alert("Share Job", "Choose how to share this job opportunity:", [
      {
        text: "Standard Share",
        onPress: onShare,
      },
      {
        text: "WhatsApp",
        onPress: () => shareToSpecificApp("whatsapp"),
      },
      {
        text: "Telegram",
        onPress: () => shareToSpecificApp("telegram"),
      },
      {
        text: "Copy Link",
        onPress: copyJobLink,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const copyJobLink = () => {
    // Implement copy to clipboard
    Alert.alert("Success", "Job link copied to clipboard!");
  };

  const dynamicStyles = StyleSheet.create({
    jobComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#dddddd",
    },
    headerJobComponent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    closePageBtn: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 50,
    },
    saveAndShareBtnBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    saveBtn: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      paddingVertical: 6,
      paddingHorizontal: 11,
      borderRadius: 50,
    },
    shareBtn: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      paddingVertical: 6,
      paddingHorizontal: 6,
      borderRadius: 50,
    },
    sectionJobComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 57,
      paddingBottom: 50,
    },
    employerImgEmplyerNameAndJobBlock: {
      alignItems: "center",
      marginTop: 3,
      position: "absolute",
      top: -46,
      left: "22%",
    },
    employerImg: {
      width: 86,
      height: 89,
      borderRadius: 50,
    },
    employerName: {
      fontSize: 32,
      fontWeight: "700",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    job: {
      color: colorScheme === "dark" ? "#fff" : "#888888",
      fontSize: 25,
      fontWeight: "500",
    },
    locationIconAndLocation: {
      flexDirection: "row",
      alignItems: "center",
    },
    location: {
      color: colorScheme === "dark" ? "#ececec" : "#787878",
      fontSize: 18,
      fontWeight: "400",
    },
    salaryEmploymentTypeWorkingModelAndJobLevelBlock: {
      marginTop: 160,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      rowGap: 10,
      columnGap: 30,
    },
    salaryBlock: {},
    employmentTypeBlock: {},
    workingModelBlock: {},
    jobLevelBlock: {},

    // 4 informations with the same style blocks
    fourInformationsWithTheSameStyleBlock: {
      width: "44%",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      boxShadow: "0 0 5px gray",
      padding: 6,
      borderRadius: 5,
    },
    infoIconBlock: {
      backgroundColor: "#E2E2E2",
      padding: 6,
      borderRadius: 50,
    },
    infoIcon: {
      width: 21,
      height: 21,
    },
    titleAndInfoBlock: {},
    title: {
      color: colorScheme === "dark" ? "#fff" : "#969695",
      fontSize: 15,
      fontWeight: "500",
    },
    info: {
      color: colorScheme === "dark" ? "#00c3ff" : "#4C4ADA",
      fontSize: 14,
      fontWeight: "700",
    },
    aboutJobCompanyAndReviewBlock: {},
    btnApplyJobBlock: {
      paddingHorizontal: 10,
    },
    btnApplyJob: {
      backgroundColor: "#2623D2",
      paddingVertical: 10,
      borderRadius: 20,
    },
    btnTextApplyJob: {
      textAlign: "center",
      color: "#FFFFFF",
      fontSize: 25,
      fontWeight: "700",
    },
  });

  const ReviewJobWithModalAddReview = ({ route }: { route: any }) => (
    <ReviewJob setModalAddReview={setModalAddReview} route={route} />
  );

  return (
    <View style={dynamicStyles.jobComponent}>
      <View style={dynamicStyles.headerJobComponent}>
        <Pressable
          style={dynamicStyles.closePageBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome
            name="close"
            size={32}
            color={colorScheme === "dark" ? "#fff" : "black"}
          />
        </Pressable>
        <View style={dynamicStyles.saveAndShareBtnBlock}>
          <Pressable style={dynamicStyles.saveBtn}>
            <FontAwesome
              name="bookmark-o"
              size={32}
              color={colorScheme === "dark" ? "#fff" : "black"}
            />
          </Pressable>
          <Pressable
            style={dynamicStyles.shareBtn}
            // onPress={onShare} // Add the share function here
            onPress={onShare} // Using custom share options
          >
            <Entypo
              name="share"
              size={32}
              color={colorScheme === "dark" ? "#fff" : "black"}
            />
          </Pressable>
        </View>
      </View>
      <View style={dynamicStyles.sectionJobComponent}>
        <View style={dynamicStyles.employerImgEmplyerNameAndJobBlock}>
          <Image
            source={require("../../assets/tajjob/home/alif.jpg")}
            style={dynamicStyles.employerImg}
          />
          <Text style={dynamicStyles.employerName}>Alif Bank</Text>
          <Text style={dynamicStyles.job}>Operation specialist</Text>
          <View style={dynamicStyles.locationIconAndLocation}>
            <Entypo
              name="location-pin"
              size={29}
              color={colorScheme === "dark" ? "#fff" : "black"}
            />
            <Text style={dynamicStyles.location}>Dushanbe, Tajikistan</Text>
          </View>
        </View>
        <View
          style={dynamicStyles.salaryEmploymentTypeWorkingModelAndJobLevelBlock}
        >
          <View
            style={[
              dynamicStyles.salaryBlock,
              dynamicStyles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <View style={dynamicStyles.infoIconBlock}>
              <Image
                source={require("../../assets/tajjob/job/money-icon.png")}
                style={dynamicStyles.infoIcon}
              />
            </View>
            <View style={dynamicStyles.titleAndInfoBlock}>
              <Text style={dynamicStyles.title}>Salary(Monthly)</Text>
              <Text style={dynamicStyles.info}>1500 somoni</Text>
            </View>
          </View>
          <View
            style={[
              dynamicStyles.employmentTypeBlock,
              dynamicStyles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <View style={dynamicStyles.infoIconBlock}>
              <Image
                source={require("../../assets/tajjob/job/employment-type-icon.png")}
                style={dynamicStyles.infoIcon}
              />
            </View>
            <View style={dynamicStyles.titleAndInfoBlock}>
              <Text style={dynamicStyles.title}>Employment Type</Text>
              <Text style={dynamicStyles.info}>Full - Time</Text>
            </View>
          </View>
          <View
            style={[
              dynamicStyles.workingModelBlock,
              dynamicStyles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <View style={dynamicStyles.infoIconBlock}>
              <Image
                source={require("../../assets/tajjob/job/working-model-icon.png")}
                style={dynamicStyles.infoIcon}
              />
            </View>
            <View style={dynamicStyles.titleAndInfoBlock}>
              <Text style={dynamicStyles.title}>Working Model</Text>
              <Text style={dynamicStyles.info}>Remote</Text>
            </View>
          </View>
          <View
            style={[
              dynamicStyles.jobLevelBlock,
              dynamicStyles.fourInformationsWithTheSameStyleBlock,
            ]}
          >
            <View style={dynamicStyles.infoIconBlock}>
              <Image
                source={require("../../assets/tajjob/job/level.png")}
                style={dynamicStyles.infoIcon}
              />
            </View>
            <View style={dynamicStyles.titleAndInfoBlock}>
              <Text style={dynamicStyles.title}>Level</Text>
              <Text style={dynamicStyles.info}>Internship</Text>
            </View>
          </View>
        </View>
        <NavigationIndependentTree>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor:
                  colorScheme === "dark" ? "#00c3ff" : "#2623D0",
                tabBarInactiveTintColor:
                  colorScheme === "dark" ? "#fff" : "#000",
                tabBarLabelStyle: {
                  fontSize: 21,
                  fontWeight: "500",
                },
                tabBarStyle: {
                  marginTop: 19,
                  backgroundColor: "transparent",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                tabBarIndicatorStyle: {
                  backgroundColor:
                    colorScheme === "dark" ? "#00c3ff" : "#2623D0",
                  height: 3,
                },
                tabBarPressOpacity: 0.7,
              }}
            >
              <Tab.Screen
                name="AboutJob"
                component={AboutJob}
                options={{
                  tabBarLabel: "About",
                }}
                initialParams={{
                  aboutJob:
                    "We are looking for consultants for the car loan department (with a service contract, term - 1 month).Duties:- Customer service and support; - Online advice to clients on SME loan products, explanation of the decisions of the Credit Committee.– Knowledge of the basics of lending; – Fluency in Tajik and Russian; – Desire to develop. (We will teach you the rest ourselves 🙂)We value:– hard work; – honesty and modesty; – responsibility and punctuality. Believe in yourself – and succeed! 🚀",
                }}
              />
              <Tab.Screen
                name="AboutEmployer"
                component={AboutEmployer}
                options={{
                  tabBarLabel: "Employer",
                }}
                initialParams={{
                  aboutEmployer:
                    "Alif started its journey only in 2014 and has already become one of the leading fintech companies in Central Asia. We offer our own financial and technological solutions. We have released the Alif Mobi payment application, with which you can make purchases, transfer money within the country and abroad, and manage installments.We opened the largest online platform for retail trade — alifshop.tj, where customers find the product they need, and partners promote their products.",
                }}
              />
              <Tab.Screen
                name="ReviewJob"
                component={ReviewJobWithModalAddReview}
                options={{
                  tabBarLabel: "Review",
                }}
                initialParams={{
                  id: "2",
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </NavigationIndependentTree>
        <View style={dynamicStyles.btnApplyJobBlock}>
          <Pressable
            style={dynamicStyles.btnApplyJob}
            onPress={() => {
              setModalApply(true);
            }}
          >
            <Text style={dynamicStyles.btnTextApplyJob}>Apply</Text>
          </Pressable>
        </View>

        <ModalAddReview
          modalAddReview={modalAddReview}
          setModalAddReview={setModalAddReview}
        />
        <ModalApply modalApply={modalApply} setModalApply={setModalApply} />
      </View>
    </View>
  );
};

export default Job;
