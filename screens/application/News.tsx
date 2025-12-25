import React, { use } from "react";
import { Image, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";

const News = () => {
  const colorScheme = useColorScheme();

  const dynamicStyles = StyleSheet.create({
  newsComponent: {
    flex: 1,
    backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
    paddingHorizontal: 16,
  },
  newsBlock: {
    paddingHorizontal: 7,
    paddingBottom: 55,
  },
  newsContainer: {},
  newsSentDay: {
    textAlign: "center",
    color: colorScheme === "dark" ? "#fff" : "#9E9E9E",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
  },
  newsBlockOfThisDay: {
    marginTop: 15,
    gap: 15,
  },
  news: {
    borderRadius: 20,
    backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  newsImg: {
    width: "100%",
    height: 95,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  newsTitleAndDescriptionBlock: {
    padding: 15,
    gap: 6,
  },
  newsTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
  newsDescription: {
    fontSize: 18,
    fontWeight: "400",
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
  newsTime: {
    fontSize: 14,
    fontWeight: "400",
    color:colorScheme === "dark" ? "#fff" : "#9E9E9E",
    textAlign: "right",
  },
  });
  
  return (
    <View style={dynamicStyles.newsComponent}>
      <ScrollView
        contentContainerStyle={dynamicStyles.newsBlock}
        showsVerticalScrollIndicator={false}
      >
        <View style={dynamicStyles.newsContainer}>
          <Text style={dynamicStyles.newsSentDay}>Yesterday</Text>

          {/* News 1 */}
          <View style={dynamicStyles.newsBlockOfThisDay}>
            <View style={dynamicStyles.news}>
              <Image
                source={require("../../assets/tajjob/notifications/megafon-news.jpg")}
                style={dynamicStyles.newsImg}
              />
              <View style={dynamicStyles.newsTitleAndDescriptionBlock}>
                <Text style={dynamicStyles.newsTitle}>Megafon</Text>
                <Text style={dynamicStyles.newsDescription}>
                  Megafon has partnered with it and you can now look for work at
                  Megafon.We are happy that our partners are growing and are
                  cooperating with us in job postings.
                </Text>
                <Text style={dynamicStyles.newsTime}>06:47</Text>
              </View>
            </View>

            {/* News 2 */}
            <View style={dynamicStyles.news}>
              <Image
                source={require("../../assets/tajjob/notifications/partnership-news.jpg")}
                style={dynamicStyles.newsImg}
              />
              <View style={dynamicStyles.newsTitleAndDescriptionBlock}>
                <Text style={dynamicStyles.newsTitle}>Growing Partners</Text>
                <Text style={dynamicStyles.newsDescription}>
                  We are partnered by more than 1,200 state-owned enterprises
                  and 650 foreign enterprises, and have 12,000 job
                  advertisements. You can find the job that suits you and we
                  wish you success.
                </Text>
                <Text style={dynamicStyles.newsTime}>06:48</Text>
              </View>
            </View>

            {/* News 3 */}
            <View style={dynamicStyles.news}>
              <Image
                source={require("../../assets/tajjob/notifications/oroyonbank-news.jpg")}
                style={dynamicStyles.newsImg}
              />
              <View style={dynamicStyles.newsTitleAndDescriptionBlock}>
                <Text style={dynamicStyles.newsTitle}>Oriyonbank Bank</Text>
                <Text style={dynamicStyles.newsDescription}>
                  Oriyonbank has launched a great initiative and you can get
                  cars for up to 4 years on a 12% loan.
                </Text>
                <Text style={dynamicStyles.newsTime}>06:48</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default News;


