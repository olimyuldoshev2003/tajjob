import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { use } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const AboutApp = () => {
  const navigation: any = useNavigation();
  const colorScheme = useColorScheme();


  // const data = [
  //   { label: "Item 1", value: "1" },
  //   { label: "Item 2", value: "2" },
  //   { label: "Item 3", value: "3" },
  //   { label: "Item 4", value: "4" },
  //   { label: "Item 5", value: "5" },
  //   { label: "Item 6", value: "6" },
  //   { label: "Item 7", value: "7" },
  //   { label: "Item 8", value: "8" },
  // ];

  //  const [value, setValue] = useState(null);

  const dynamicStyles = StyleSheet.create({
    aboutAppComponent: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212": "#fff",
    },
    aboutAppComponentBlock: {},
    aboutAppComponentBlockHeader: {
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 12,
      paddingTop: 40,
    },
    closeOrBackBtn: {
      backgroundColor: colorScheme === "dark" ? "#333":"#D9D9D9",
      paddingVertical: 6,
      paddingHorizontal: 11,
      borderRadius: 50,
    },
    scrollForAboutAppComponentSectionAndFooterBlockScrollView: {
      paddingBottom: 170,
      paddingHorizontal: 10,
    },
    scrollForAboutAppComponentSectionAndFooterBlock: {},
    aboutAppComponentBlockSection: {
      justifyContent: "center",
      alignItems: "center",
    },
    tajjobLogo: {
      width: 230,
      height: 230,
    },
    about: {
      fontSize: 26,
      fontWeight: "400",
      textAlign: "justify",
      color: colorScheme === "dark" ? "#fff": "#000",
    },
    aboutAppComponentBlockFooter: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    footerTitle: {
      fontSize: 28,
      fontWeight: "500",
      color: colorScheme === "dark" ? "#fff": "#000",
    },
    socialMediaAndMessengersBlock: {
      marginTop: 10,
      flexDirection: "row",
      gap: 25,
    },
    socialMediaAndMessenger: {},

    // Dropdown

    // dropdown: {
    //   margin: 16,
    //   height: 50,
    //   borderBottomColor: "gray",
    //   borderBottomWidth: 0.5,
    // },
    // icon: {
    //   marginRight: 5,
    // },
    // placeholderStyle: {
    //   fontSize: 16,
    // },
    // selectedTextStyle: {
    //   fontSize: 16,
    // },
    // iconStyle: {
    //   width: 20,
    //   height: 20,
    // },
    // inputSearchStyle: {
    //   height: 40,
    //   fontSize: 16,
    // },
  });


  return (
    <View style={dynamicStyles.aboutAppComponent}>
      <View style={dynamicStyles.aboutAppComponentBlock}>
        <View style={dynamicStyles.aboutAppComponentBlockHeader}>
          <Pressable
            style={dynamicStyles.closeOrBackBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome
              name="close"
              size={41}
              color={colorScheme === "dark" ? "#fff" : "black"}
            />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={
            dynamicStyles.scrollForAboutAppComponentSectionAndFooterBlockScrollView
          }
          style={dynamicStyles.scrollForAboutAppComponentSectionAndFooterBlock}
        >
          <View style={dynamicStyles.aboutAppComponentBlockSection}>
            <Image
              source={
                colorScheme === "dark"
                  ? require("../../assets/tajjob/introduction/tajjobLogoDarkMode.png")
                  : require("../../assets/tajjob/introduction/tajjobLogoLightMode.png")
              }
              style={dynamicStyles.tajjobLogo}
            />
            <Text style={dynamicStyles.about}>
              TajJob is an innovative platform designed for job seekers and
              employers, created specifically for Tajikistan and the global
              market. The app allows anyone to easily find the right job or the
              right employee with just a few steps. The main goal of TajJob is
              to simplify the process of searching and offering jobs. Employers
              can post vacancies, while job seekers can quickly find
              opportunities using advanced filters such as categories, skills,
              salary range, and work type (full-time, part-time, or freelance).
            </Text>
          </View>
          <View style={dynamicStyles.aboutAppComponentBlockFooter}>
            <Text style={dynamicStyles.footerTitle}>Our social media</Text>
            <View style={dynamicStyles.socialMediaAndMessengersBlock}>
              <Image
                source={require("../../assets/tajjob/profile/instagram.png")}
                style={dynamicStyles.socialMediaAndMessenger}
              />
              <Image
                source={require("../../assets/tajjob/profile/telegram.png")}
                style={dynamicStyles.socialMediaAndMessenger}
              />
              <Image
                source={require("../../assets/tajjob/profile/mobile-phone.png")}
                style={dynamicStyles.socialMediaAndMessenger}
              />
            </View>
          </View>

          {/* <Dropdown
            style={dynamicStyles.dropdown}
            placeholderStyle={dynamicStyles.placeholderStyle}
            selectedTextStyle={dynamicStyles.selectedTextStyle}
            inputSearchStyle={dynamicStyles.inputSearchStyle}
            iconStyle={dynamicStyles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={dynamicStyles.icon}
                color="black"
                // name="Safety"
                size={20}
              />
            )}
          /> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default AboutApp;