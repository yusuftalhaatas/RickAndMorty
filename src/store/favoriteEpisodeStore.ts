import AsyncStorage from "@react-native-async-storage/async-storage";
import { Episode } from "../types/episode"; // Episode type
import { create } from "zustand/react";

interface FavoriteEpisodesState {
  favoriteEpisodes: Episode[]; // Favorite episodes
  addFavoriteEpisode: (episode: Episode) => void; // Add favorite episode
  removeFavoriteEpisode: (id: number) => void; // Remove favorite episode
  loadFavoriteEpisodes: () => void; // Load favorite episodes
}

// Function to save favorite episodes to AsyncStorage
const saveEpisodesToStorage = async (episodes: Episode[]) => {
  try {
    const jsonValue = JSON.stringify(episodes);
    await AsyncStorage.setItem("favoriteEpisodes", jsonValue);
  } catch (e) {
    console.error("Failed to save favorite episodes:", e);
  }
};

// Function to load favorite episodes from AsyncStorage
const getEpisodesFromStorage = async (): Promise<Episode[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("favoriteEpisodes");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load favorite episodes:", e);
    return [];
  }
};

// Define Zustand store
export const useFavoriteEpisodesStore = create<FavoriteEpisodesState>(
  (set) => ({
    favoriteEpisodes: [],

    addFavoriteEpisode: (episode) =>
      set((state) => {
        const updatedFavorites = [...state.favoriteEpisodes, episode];
        saveEpisodesToStorage(updatedFavorites); // Save to AsyncStorage
        return { favoriteEpisodes: updatedFavorites };
      }),

    removeFavoriteEpisode: (id) =>
      set((state) => {
        const updatedFavorites = state.favoriteEpisodes.filter(
          (episode) => episode.id !== id
        );
        saveEpisodesToStorage(updatedFavorites); // Save to AsyncStorage
        return { favoriteEpisodes: updatedFavorites };
      }),

    loadFavoriteEpisodes: async () => {
      const storedFavorites = await getEpisodesFromStorage(); // Load favorites from AsyncStorage
      set({ favoriteEpisodes: storedFavorites });
    },
  })
);
