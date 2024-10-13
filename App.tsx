import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFavoriteCharactersStore } from "./src/store/favoriteCharacterStore";
import { useFavoriteLocationsStore } from "./src/store/favoriteLocationStore";
import { useFavoriteEpisodesStore } from "./src/store/favoriteEpisodeStore";
import { useProfileStore } from "./src/store/profileStore"; // Import the profile store
import CustomActivityIndicator from "./src/components/CustomActivityIndicator";
import { useCustomFonts } from "./src/hooks/useCustomFonts"; // Font loading hook

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

  const fontsLoaded = useCustomFonts(); // Load fonts
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Load favorites and profile when the app starts
    loadFavoriteCharacters();
    loadFavoriteLocations();
    loadFavoriteEpisodes();
    loadProfile(); // Load profile data as well

    // Set isLoading to false after all data is loaded
    if (fontsLoaded) {
      setIsLoading(false);
    }
  }, [
    loadFavoriteCharacters,
    loadFavoriteLocations,
    loadFavoriteEpisodes,
    loadProfile,
    fontsLoaded, // This will also trigger after fonts are loaded
  ]);

  // Show loading indicator until fonts and favorites are loaded
  if (isLoading) {
    return <CustomActivityIndicator />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
