// src/types/navigation.ts
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Character } from "./character";
import { Episode } from "./episode";
import { LocationType } from "./location";

// Define the parameter list for the root stack navigator
export type RootStackParamList = {
  Welcome: undefined; // No parameters for the Welcome screen
  Home: undefined; // No parameters for the Home screen
  CharacterDetail: { character: Character }; // Character parameter for the CharacterDetail screen
  EpisodeDetail: { episode: Episode }; // Episode parameter for the EpisodeDetail screen
  LocationDetail: { location: LocationType }; // Location parameter for the LocationDetail screen
};

// Define the props for the Welcome screen
export type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Welcome"
>;

// Define the props for the Home screen
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

// Define the props for the CharacterDetail screen
export type CharacterDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CharacterDetail"
>;

// Define the props for the EpisodeDetail screen
export type EpisodeDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EpisodeDetail"
>;

// Define the props for the LocationDetail screen
export type LocationDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "LocationDetail"
>;
