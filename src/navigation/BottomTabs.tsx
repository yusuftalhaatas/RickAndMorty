import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CharactersScreen from "../screens/CharactersScreen";
import EpisodesScreen from "../screens/EpisodesScreen";
import Icon from "react-native-vector-icons/Ionicons";
import LocationScreen from "../screens/LocationScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Creating Bottom Tab navigator
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          // Setting which icon to show based on the route name
          if (route.name === "Characters") {
            iconName = "people";
          } else if (route.name === "Episodes") {
            iconName = "film";
          } else if (route.name === "Locations") {
            iconName = "location-sharp";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          // Using icons from Ionicons
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#facc15", // Color of the active tab
        tabBarInactiveTintColor: "#3CB371", // Color of the inactive tabs
        tabBarStyle: {
          backgroundColor: "#1f2937", // Background color of the tab bar (dark theme suitable for Rick and Morty universe)
          borderTopWidth: 0, // Removing the top border
          height: 70, // Height of the tab bar
          paddingBottom: 20, // Padding to center the icons
        },
        tabBarLabelStyle: {
          fontSize: 12, // Size of the tab labels
          fontFamily: "GetSchwifty-Regular", // Rick and Morty font
        },
        tabBarIconStyle: {
          marginTop: 8, // Pulling the icons up
        },
        headerShown: false, // Hiding the header for each tab
      })}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersScreen}
        options={{
          tabBarLabel: "Characters", // Tab label
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={EpisodesScreen}
        options={{
          tabBarLabel: "Episodes", // Tab label
        }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationScreen}
        options={{
          tabBarLabel: "Locations", // Tab label
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile", // Tab label
        }}
      />
    </Tab.Navigator>
  );
}
