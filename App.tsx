import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFavoriteCharactersStore } from "./src/store/favoriteCharacterStore";
import { useFavoriteLocationsStore } from "./src/store/favoriteLocationStore";
import { useFavoriteEpisodesStore } from "./src/store/favoriteEpisodeStore";
import { useProfileStore } from "./src/store/profileStore"; // Import the profile store

// Create a QueryClient
const queryClient = new QueryClient();

export default function App() {
  const loadFavoriteCharacters = useFavoriteCharactersStore(
    (state) => state.loadFavoriteCharacters
  );
  const loadFavoriteLocations = useFavoriteLocationsStore(
    (state) => state.loadFavoriteLocations
  );
  const loadFavoriteEpisodes = useFavoriteEpisodesStore(
    (state) => state.loadFavoriteEpisodes
  );
  const loadProfile = useProfileStore((state) => state.loadProfile); // Get the loadProfile function from the profile store

  useEffect(() => {
    // Load favorites and profile when the app starts
    loadFavoriteCharacters();
    loadFavoriteLocations();
    loadFavoriteEpisodes();
    loadProfile(); // Load profile data as well
  }, [
    loadFavoriteCharacters,
    loadFavoriteLocations,
    loadFavoriteEpisodes,
    loadProfile,
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
