import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AboutApp = () => {
  const navigation: any = useNavigation();

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

  return (
    <View style={styles.aboutAppComponent}>
      <View style={styles.aboutAppComponentBlock}>
        <View style={styles.aboutAppComponentBlockHeader}>
          <Pressable
            style={styles.closeOrBackBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="close" size={41} color="black" />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={
            styles.scrollForAboutAppComponentSectionAndFooterBlockScrollView
          }
          style={styles.scrollForAboutAppComponentSectionAndFooterBlock}
        >
          <View style={styles.aboutAppComponentBlockSection}>
            <Image
              source={require("../../assets/tajjob/introduction/tajjobLogo.jpg")}
              style={styles.tajjobLogo}
            />
            <Text style={styles.about}>
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
          <View style={styles.aboutAppComponentBlockFooter}>
            <Text style={styles.footerTitle}>Our social media</Text>
            <View style={styles.socialMediaAndMessengersBlock}>
              <Image
                source={require("../../assets/tajjob/profile/instagram.png")}
                style={styles.socialMediaAndMessenger}
              />
              <Image
                source={require("../../assets/tajjob/profile/telegram.png")}
                style={styles.socialMediaAndMessenger}
              />
              <Image
                source={require("../../assets/tajjob/profile/mobile-phone.png")}
                style={styles.socialMediaAndMessenger}
              />
            </View>
          </View>

          {/* <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
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
                style={styles.icon}
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

const styles = StyleSheet.create({
  aboutAppComponent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  aboutAppComponentBlock: {},
  aboutAppComponentBlockHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 12,
    paddingTop: 40,
  },
  closeOrBackBtn: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 50,
  },
  scrollForAboutAppComponentSectionAndFooterBlockScrollView: {
    paddingBottom: 130,
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
  },
  aboutAppComponentBlockFooter: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 28,
    fontWeight: "500",
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
