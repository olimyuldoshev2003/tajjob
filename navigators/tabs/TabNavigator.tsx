import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import your screens

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import JobDetailModal from "../../components/home/JobDetailModal";
import StackNavigatorHistoryPage from "../stacks/StackNavigatorHistoryPage";
import StackNavigatorHomePage from "../stacks/StackNavigatorHomePage";
import StackNavigatorMessagesPage from "../stacks/StackNavigatorMessagesPage";
import StackNavigatorProfilePage from "../stacks/StackNavigatorProfilePage";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const modalizeRef = useRef<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Function to open modal with job data
  function openJobModal(jobData: any) {
    setSelectedJob(jobData);
    modalizeRef.current?.open();
  }

  const StackNavigatorHomePageWithFunctionOpenJobModal = () => (
    <StackNavigatorHomePage openJobModal={openJobModal} />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#0184F0",
          tabBarInactiveTintColor: "#7F7F7F",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          headerShown: false,
          tabBarStyle: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            elevation: 8,
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={StackNavigatorHomePageWithFunctionOpenJobModal}
          options={{
            tabBarLabel: "Job",
            tabBarIcon({ size, color }) {
              return (
                <MaterialIcons name="business-center" size={27} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="MessagesStack"
          component={StackNavigatorMessagesPage}
          options={{
            tabBarLabel: "Message",
            tabBarIcon({ size, color }) {
              return (
                <MaterialCommunityIcons
                  name="message-processing"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="HistoryStack"
          component={StackNavigatorHistoryPage}
          options={{
            tabBarLabel: "History",
            tabBarIcon({ size, color }) {
              return <FontAwesome5 name="history" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={StackNavigatorProfilePage}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon({ size, color }) {
              return <FontAwesome name="user" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>

      <JobDetailModal modalizeRef={modalizeRef} jobData={selectedJob} />
    </GestureHandlerRootView>
  );
};

export default TabNavigator;
