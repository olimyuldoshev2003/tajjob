import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, usePathname } from "expo-router";
import JobDetailModal from "../../components/home/JobDetailModal";
import StackNavigatorHistoryPage from "../stacks/StackNavigatorHistoryPage";
import StackNavigatorHomePage from "../stacks/StackNavigatorHomePage";
import StackNavigatorMessagesPage from "../stacks/StackNavigatorMessagesPage";
import StackNavigatorProfilePage from "../stacks/StackNavigatorProfilePage";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const pathName = usePathname();

  const modalizeRef = useRef<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Function to open modal with job data
  function openJobModal(jobData: any) {
    setSelectedJob(jobData);
    modalizeRef.current?.open();
  }

  // Function to get tab bar style based on current route
  const getTabBarStyle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    // Define which screens should hide the tab bar
    const hideTabBarScreens = [
      "Notifications",
      "Job",
      "Message",
      "EditUser",
      "Settings",
      "Language",
      "Theme",
      "GestureControl",
      "AboutApp",
      "FAQ",
      "FeedbackForApp",
    ];

    // If we're on a screen that should hide tab bar, return none display
    if (routeName && hideTabBarScreens.includes(routeName)) {
      return {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 8,
        display: "none" as const,
      };
    }

    // Default tab bar style
    return {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 8,
      display: "flex" as const,
    };
  };

  const StackNavigatorHomePageWithFunctionOpenJobModal = () => (
    <StackNavigatorHomePage openJobModal={openJobModal} />
  );

  // Custom tab bar button component
  const CustomTabBarButton = ({ route, children, onPress, ...props }: any) => {
    const handlePress = () => {
      onPress();
    };

    return (
      <TouchableOpacity
        {...props}
        onPress={handlePress}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </TouchableOpacity>
    );
  };

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
          tabBarButton: (props:any) => (
            <CustomTabBarButton route={props.route} {...props} />
          ),
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={StackNavigatorHomePageWithFunctionOpenJobModal}
          options={({ route }) => ({
            tabBarLabel: "Job",
            tabBarStyle: getTabBarStyle(route),
            tabBarIcon({ size, color }) {
              return (
                <MaterialIcons name="business-center" size={27} color={color} />
              );
            },
          })}
        />
        <Tab.Screen
          name="MessagesStack"
          component={StackNavigatorMessagesPage}
          options={({ route }) => ({
            tabBarLabel: "Message",
            tabBarStyle: getTabBarStyle(route),
            tabBarIcon({ size, color }) {
              return (
                <MaterialCommunityIcons
                  name="message-processing"
                  size={size}
                  color={color}
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="HistoryStack"
          component={StackNavigatorHistoryPage}
          options={({ route }) => ({
            tabBarLabel: "History",
            tabBarStyle: getTabBarStyle(route),
            tabBarIcon({ size, color }) {
              return <FontAwesome5 name="history" size={size} color={color} />;
            },
          })}
        />
        <Tab.Screen
          name="ProfileStack"
          component={StackNavigatorProfilePage}
          options={({ route }) => ({
            tabBarLabel: "Profile",
            tabBarStyle: getTabBarStyle(route),
            tabBarIcon({ size, color }) {
              return <FontAwesome name="user" size={size} color={color} />;
            },
          })}
        />
      </Tab.Navigator>

      <JobDetailModal modalizeRef={modalizeRef} jobData={selectedJob} />
    </GestureHandlerRootView>
  );
};

export default TabNavigator;
