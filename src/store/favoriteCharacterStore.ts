import { create } from "zustand/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Character } from "../types/character"; // Character type

interface FavoriteCharactersState {
  favoriteCharacters: Character[]; // Favorite characters
  addFavoriteCharacter: (character: Character) => void; // Add favorite character
  removeFavoriteCharacter: (id: number) => void; // Remove favorite character
  loadFavoriteCharacters: () => void; // Load favorite characters
}

// Function to save favorite characters to AsyncStorage
const saveCharactersToStorage = async (characters: Character[]) => {
  try {
    const jsonValue = JSON.stringify(characters);
    await AsyncStorage.setItem("favoriteCharacters", jsonValue);
  } catch (e) {
    console.error("Failed to save favorite characters:", e);
  }
};

// Function to load favorite characters from AsyncStorage
const getCharactersFromStorage = async (): Promise<Character[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("favoriteCharacters");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load favorite characters:", e);
    return [];
  }
};

// Define Zustand store
export const useFavoriteCharactersStore = create<FavoriteCharactersState>(
  (set) => ({
    favoriteCharacters: [],

    addFavoriteCharacter: (character) =>
      set((state) => {
        const updatedFavorites = [...state.favoriteCharacters, character];
        saveCharactersToStorage(updatedFavorites); // Save to AsyncStorage
        return { favoriteCharacters: updatedFavorites };
      }),

    removeFavoriteCharacter: (id) =>
      set((state) => {
        const updatedFavorites = state.favoriteCharacters.filter(
          (character) => character.id !== id
        );
        saveCharactersToStorage(updatedFavorites); // Save to AsyncStorage
        return { favoriteCharacters: updatedFavorites };
      }),

    loadFavoriteCharacters: async () => {
      const storedFavorites = await getCharactersFromStorage(); // Load from AsyncStorage
      set({ favoriteCharacters: storedFavorites });
    },
  })
);
