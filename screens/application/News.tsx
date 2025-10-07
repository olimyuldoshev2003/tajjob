import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const News = () => {
  return (
    <View style={styles.newsComponent}>
      <ScrollView contentContainerStyle={styles.newsBlock}>
        <Text style={styles.newsSentDay}>Yesterday</Text>

        {/* News 1 */}
        <View style={styles.newsBlockOfThisDay}>
          <View style={styles.news}>
            <Image
              source={require("../../assets/tajjob/notifications/megafon-news.jpg")}
              style={styles.newsImg}
            />
            <View style={styles.newsTitleAndDescriptionBlock}>
              <Text style={styles.newsTitle}>Megafon</Text>
              <Text style={styles.newsDescription}>
                Megafon has partnered with it and you can now look for work at
                Megafon.We are happy that our partners are growing and are
                cooperating with us in job postings.
              </Text>
              <Text style={styles.newsTime}>06:47</Text>
            </View>
          </View>

          {/* News 2 */}
          <View style={styles.news}>
            <Image
              source={require("../../assets/tajjob/notifications/partnership-news.jpg")}
              style={styles.newsImg}
            />
            <View style={styles.newsTitleAndDescriptionBlock}>
              <Text style={styles.newsTitle}>Growing Partners</Text>
              <Text style={styles.newsDescription}>
                We are partnered by more than 1,200 state-owned enterprises and
                650 foreign enterprises, and have 12,000 job advertisements. You
                can find the job that suits you and we wish you success.
              </Text>
              <Text style={styles.newsTime}>06:48</Text>
            </View>
          </View>

          {/* News 3 */}
          <View style={styles.news}>
            <Image
              source={require("../../assets/tajjob/notifications/oroyonbank-news.jpg")}
              style={styles.newsImg}
            />
            <View style={styles.newsTitleAndDescriptionBlock}>
              <Text style={styles.newsTitle}>Oriyonbank Bank</Text>
              <Text style={styles.newsDescription}>
                Oriyonbank has launched a great initiative and you can get cars
                for up to 4 years on a 12% loan.
              </Text>
              <Text style={styles.newsTime}>06:48</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default News

const styles = StyleSheet.create({
  newsComponent: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  newsBlock: {
    paddingHorizontal: 7,
    paddingBottom: 15,
  },
  newsSentDay: {
    textAlign: "center",
    color: "#9E9E9E",
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
    backgroundColor: "#fff",
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
    color: "#000",
  },
  newsDescription: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000",
  },
  newsTime: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9E9E9E",
    textAlign: "right",
  },
})