import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CharactersScreen from "../screens/CharactersScreen";
import EpisodesScreen from "../screens/EpisodesScreen";
import Icon from "react-native-vector-icons/Ionicons";
import LocationScreen from "../screens/LocationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { styled } from "nativewind"; // NativeWind importu

// Bottom Tab navigator oluşturuyoruz
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          // Route adına göre hangi ikonun gösterileceğini ayarlıyoruz
          if (route.name === "Characters") {
            iconName = "people";
          } else if (route.name === "Episodes") {
            iconName = "film";
          } else if (route.name === "Locations") {
            iconName = "location-sharp";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          // Ionicons'dan simgeleri kullanıyoruz
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#facc15", // Seçili (aktif) olan tab'ın rengi
        tabBarInactiveTintColor: "#3CB371", // Seçilmemiş tab'ların rengi
        tabBarStyle: {
          backgroundColor: "#1f2937", // Tab bar arka planı (Rick and Morty evrenine uygun koyu bir tema)
          borderTopWidth: 0, // Üst sınırı kaldırıyoruz
          height: 70, // Tab bar yüksekliği
          paddingBottom: 20, // İçerideki ikonları ortalamak için padding
        },
        tabBarLabelStyle: {
          fontSize: 12, // Tab etiketlerinin boyutu
          fontFamily: "GetSchwifty-Regular", // Rick and Morty fontu
        },
        tabBarIconStyle: {
          marginTop: 8, // İkonları yukarı çekiyoruz
        },
        headerShown: false, // Her tab için header'ı gizliyoruz
      })}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersScreen}
        options={{
          tabBarLabel: "Characters", // Tab etiketi
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={EpisodesScreen}
        options={{
          tabBarLabel: "Episodes", // Tab etiketi
        }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationScreen}
        options={{
          tabBarLabel: "Locations", // Tab etiketi
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile", // Tab etiketi
        }}
      />
    </Tab.Navigator>
  );
}
