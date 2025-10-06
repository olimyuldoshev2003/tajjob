import React, { useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";

// Import your screens
import History from "@/screens/application/History";
import Home from "@/screens/application/Home";
import Message from "@/screens/application/Message";
import Profile from "@/screens/application/Profile";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import JobDetailModal from "./JobDetailModal";

const Tab = createBottomTabNavigator();

const TabNavigatorWithModal = () => {
  const modalizeRef = useRef<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Function to open modal with job data
  const openJobModal = (jobData: any) => {
    setSelectedJob(jobData);
    modalizeRef.current?.open();
  };

  // Enhanced Home component with modal control
  const HomeWithModal = () => <Home onJobPress={openJobModal} />;

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
          name="Home"
          component={HomeWithModal}
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
          name="Message"
          component={Message}
          options={{
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
          name="History"
          component={History}
          options={{
            tabBarIcon({ size, color }) {
              return <FontAwesome5 name="history" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
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

export default TabNavigatorWithModal;
