import { create } from "zustand/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationType } from "../types/location"; // Location type

interface FavoriteLocationsState {
  favoriteLocations: LocationType[]; // Favorite locations
  addFavoriteLocation: (location: LocationType) => void; // Add favorite location
  removeFavoriteLocation: (id: number) => void; // Remove favorite location
  loadFavoriteLocations: () => void; // Load favorite locations
}

// Function to save favorite locations to AsyncStorage
const saveLocationsToStorage = async (locations: LocationType[]) => {
  try {
    const jsonValue = JSON.stringify(locations);
    await AsyncStorage.setItem("favoriteLocations", jsonValue);
  } catch (e) {
    console.error("Failed to save favorite locations:", e);
  }
};

// Function to load favorite locations from AsyncStorage
const getLocationsFromStorage = async (): Promise<LocationType[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("favoriteLocations");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load favorite locations:", e);
    return [];
  }
};

// Define Zustand store
export const useFavoriteLocationsStore = create<FavoriteLocationsState>(
  (set) => ({
    favoriteLocations: [],

    addFavoriteLocation: (location) =>
      set((state) => {
        const updatedFavorites = [...state.favoriteLocations, location];
        saveLocationsToStorage(updatedFavorites); // Save to AsyncStorage
        return { favoriteLocations: updatedFavorites };
      }),

    removeFavoriteLocation: (id) =>
      set((state) => {
        const updatedFavorites = state.favoriteLocations.filter(
          (location) => location.id !== id
        );
        saveLocationsToStorage(updatedFavorites); // Save to AsyncStorage
        return { favoriteLocations: updatedFavorites };
      }),

    loadFavoriteLocations: async () => {
      const storedFavorites = await getLocationsFromStorage(); // Load favorites from AsyncStorage
      set({ favoriteLocations: storedFavorites });
    },
  })
);
