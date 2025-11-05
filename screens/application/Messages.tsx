import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Messages = () => {

  const navigation:any = useNavigation()

  const users: any = [
    {
      id: 1,
      name: "Danny Hopkins",
      email: "dannylove@gmail.com",
      lastMessage: "dannylove@gmail.com",
      time: "07:43",
      date: "Today",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Bobby Langford",
      email: "bobby.langford@example.com",
      lastMessage: "Will do, super, thank you",
      time: "06:22",
      date: "Tue",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "William Wiles",
      email: "william.wiles@example.com",
      lastMessage: "Uploaded file.",
      time: "14:30",
      date: "Sun",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "James Edelen",
      email: "james.edelen@example.com",
      lastMessage: "Here is another tutorial, if you...",
      time: "11:15",
      date: "23 Mar",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Jose Farmer",
      email: "jose.farmer@example.com",
      lastMessage: "",
      time: "09:45",
      date: "18 Mar",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Frank Marten",
      email: "frank.marten@example.com",
      lastMessage: "no pracujemy z domu przez 5 ...",
      time: "16:20",
      date: "01 Feb",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 7,
      name: "Marzena Klasa",
      email: "marzena.klasa@example.com",
      lastMessage: "potem sie zobaczy",
      time: "13:10",
      date: "01 Feb",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", // Changed image
    },
    {
      id: 8,
      name: "Rose Hopkins",
      email: "rose.hopkins@example.com",
      lastMessage: "dannylove@gmail.com",
      time: "08:43",
      date: "Today",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 9,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      lastMessage: "Let's meet tomorrow at 3 PM",
      time: "15:20",
      date: "Today",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 10,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      lastMessage: "Thanks for your help!",
      time: "12:15",
      date: "Today",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 11,
      name: "David Wilson",
      email: "david.wilson@example.com",
      lastMessage: "I'll send the documents soon",
      time: "10:30",
      date: "Yesterday",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 12,
      name: "Emma Thompson",
      email: "emma.thompson@example.com",
      lastMessage: "Are you available for a call?",
      time: "09:45",
      date: "Yesterday",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 13,
      name: "Robert Garcia",
      email: "robert.garcia@example.com",
      lastMessage: "The project is completed",
      time: "17:55",
      date: "Wed",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 14,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      lastMessage: "See you at the meeting",
      time: "14:20",
      date: "Wed",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 15,
      name: "Kevin Martinez",
      email: "kevin.martinez@example.com",
      lastMessage: "Can you review my code?",
      time: "11:10",
      date: "Tue",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 16,
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      lastMessage: "Lunch tomorrow?",
      time: "19:30",
      date: "Mon",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 17,
      name: "Thomas Brown",
      email: "thomas.brown@example.com",
      lastMessage: "Meeting rescheduled",
      time: "08:15",
      date: "Mon",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 18,
      name: "Amanda White",
      email: "amanda.white@example.com",
      lastMessage: "Thanks for the feedback",
      time: "16:45",
      date: "Sun",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 19,
      name: "Christopher Davis",
      email: "chris.davis@example.com",
      lastMessage: "Document attached",
      time: "13:25",
      date: "Sun",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 20,
      name: "Michelle Taylor",
      email: "michelle.taylor@example.com",
      lastMessage: "Call me when you're free",
      time: "10:05",
      date: "Sat",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 21,
      name: "Daniel Miller",
      email: "daniel.miller@example.com",
      lastMessage: "Budget approved",
      time: "15:40",
      date: "Sat",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 22,
      name: "Jessica Clark",
      email: "jessica.clark@example.com",
      lastMessage: "Presentation ready",
      time: "12:50",
      date: "Fri",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 23,
      name: "Matthew Rodriguez",
      email: "matt.rodriguez@example.com",
      lastMessage: "Team dinner tonight",
      time: "18:20",
      date: "Fri",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 24,
      name: "Elizabeth Lewis",
      email: "elizabeth.lewis@example.com",
      lastMessage: "Deadline extended",
      time: "09:35",
      date: "Thu",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 25,
      name: "Andrew Walker",
      email: "andrew.walker@example.com",
      lastMessage: "New requirements added",
      time: "14:15",
      date: "Thu",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 26,
      name: "Stephanie Hall",
      email: "stephanie.hall@example.com",
      lastMessage: "Client meeting moved",
      time: "11:25",
      date: "Wed",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 27,
      name: "Joshua Allen",
      email: "joshua.allen@example.com",
      lastMessage: "Code review completed",
      time: "16:50",
      date: "Wed",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 28,
      name: "Nicole Young",
      email: "nicole.young@example.com",
      lastMessage: "Files uploaded to drive",
      time: "13:40",
      date: "Tue",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 29,
      name: "Brian King",
      email: "brian.king@example.com",
      lastMessage: "Server maintenance tonight",
      time: "20:10",
      date: "Mon",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 30,
      name: "Rebecca Scott",
      email: "rebecca.scott@example.com",
      lastMessage: "Interview scheduled",
      time: "10:55",
      date: "Mon",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 31,
      name: "Jason Green",
      email: "jason.green@example.com",
      lastMessage: "Project kickoff tomorrow",
      time: "17:30",
      date: "Sun",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 32,
      name: "Melissa Adams",
      email: "melissa.adams@example.com",
      lastMessage: "Budget report sent",
      time: "14:05",
      date: "Sun",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 33,
      name: "Eric Baker",
      email: "eric.baker@example.com",
      lastMessage: "Database updated",
      time: "11:50",
      date: "Sat",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 34,
      name: "Rachel Nelson",
      email: "rachel.nelson@example.com",
      lastMessage: "Team building event",
      time: "19:25",
      date: "Fri",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 35,
      name: "Steven Carter",
      email: "steven.carter@example.com",
      lastMessage: "API documentation ready",
      time: "15:15",
      date: "Fri",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 36,
      name: "Kimberly Mitchell",
      email: "kimberly.mitchell@example.com",
      lastMessage: "Vacation approved",
      time: "12:40",
      date: "Thu",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 37,
      name: "Timothy Perez",
      email: "timothy.perez@example.com",
      lastMessage: "New features deployed",
      time: "18:05",
      date: "Wed",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 38,
      name: "Lauren Roberts",
      email: "lauren.roberts@example.com",
      lastMessage: "Client feedback received",
      time: "13:20",
      date: "Wed",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 39,
      name: "Jeffrey Turner",
      email: "jeffrey.turner@example.com",
      lastMessage: "Meeting notes attached",
      time: "10:10",
      date: "Tue",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 40,
      name: "Samantha Phillips",
      email: "samantha.phillips@example.com",
      lastMessage: "Welcome to the team!",
      time: "16:45",
      date: "Tue",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <View style={styles.messagesComponent}>
      {/* Header with blue background */}
      <View style={styles.headerBlockMessagesComponent}>
        <View style={styles.headerBlock1}>
          <Text style={styles.headerText}>Messages</Text>
          <Entypo name="dots-three-vertical" size={26} color="white" />
        </View>
        <View style={styles.headerBlock2}>
          <Ionicons
            name="search"
            size={27}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={"#C6C7CB"}
          />
        </View>
      </View>

      {/* Messages list with white background - FIXED */}
      <View style={styles.messagesContainer}>
        {users?.length ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {users.map((item: any) => (
              <TouchableWithoutFeedback key={item.id} onPress={() => {
                  navigation.navigate("Message", {
                    id: item.id,
                  });
              }}>
                <View style={styles.container}>
                  <View style={styles.userImgFullNameAndMessageBlock}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.userImg}
                    />
                    <View style={styles.fullNameAndMessageBlock}>
                      <Text style={styles.fullName}>{item.name}</Text>
                      <Text style={styles.message}>
                        {item.lastMessage || item.email}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.messageNotFoundBlock}>
            <Text style={styles.messageNotFoundText}>Users not found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  messagesComponent: {
    flex: 1,
    backgroundColor: "#0961F6",
  },
  headerBlockMessagesComponent: {
    padding: 17,
    paddingBottom: 23,
  },
  headerBlock1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
  },
  headerBlock2: {
    marginTop: 20,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 7,
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: "#F5F6FA",
    borderRadius: 10,
    paddingLeft: 55,
    paddingRight: 15,
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "600",
    color: "#000",
  },

  messagesContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  scrollView: {
    flex: 1,
  },

  messagesContent: {
    padding: 17,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingVertical: 8,
  },
  userImgFullNameAndMessageBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  userImg: {
    width: 51,
    height: 51,
    borderRadius: 25,
  },
  fullNameAndMessageBlock: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  messageNotFoundBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  messageNotFoundText: {
    fontSize: 16,
    color: "#666",
  },
});
