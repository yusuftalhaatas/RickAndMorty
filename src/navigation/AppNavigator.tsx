// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import BottomTabs from "./BottomTabs";
import { RootStackParamList } from "../types/navigation";
import CharacterDetailScreen from "../screens/CharacterDetailsScreen";
import EpisodeDetailScreen from "../screens/EpisodeDetailScreen";
import LocationDetailScreen from "../screens/LocationDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabs} // Use BottomTabs as the component
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EpisodeDetail"
        component={EpisodeDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocationDetail"
        component={LocationDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
