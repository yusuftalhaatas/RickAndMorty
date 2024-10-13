import React, { useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // Using NativeWind for styling
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons for icons
import { Episode } from "../types/episode"; // Importing Episode type
import { useFavoriteEpisodesStore } from "../store/favoriteEpisodeStore"; // Store for managing favorite episodes
import { RootStackParamList } from "../types/navigation"; // Navigation type
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Navigation type
import { useNavigation } from "@react-navigation/native"; // Navigation hook

// EpisodeCardProps interface
interface EpisodeCardProps {
  episode: Episode; // Episode type
  searchQuery: string; // Search query for highlighting
}

// Define Navigation type
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EpisodeDetail"
>;

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, searchQuery }) => {
  const {
    favoriteEpisodes,
    addFavoriteEpisode,
    removeFavoriteEpisode,
    loadFavoriteEpisodes,
  } = useFavoriteEpisodesStore();

  // Check if the episode is a favorite
  const isFavorite = favoriteEpisodes.some(
    (favEpisode: { id: number }) => favEpisode.id === episode.id
  );

  const navigation = useNavigation<NavigationProp>(); // Adding type to navigation

  // Load favorite episodes when the app starts
  useEffect(() => {
    loadFavoriteEpisodes(); // Load favorite episodes from AsyncStorage
  }, [loadFavoriteEpisodes]);

  // Toggle favorite status
  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavoriteEpisode(episode.id); // Remove from favorites
    } else {
      addFavoriteEpisode(episode); // Add to favorites
    }
  }, [isFavorite, episode.id, addFavoriteEpisode, removeFavoriteEpisode]);

  // Highlight the part of the name that matches the search query
  const highlightText = (name: string, query: string) => {
    if (!query)
      return <StyledText className="text-yellow-400">{name}</StyledText>;

    const index = name.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1)
      return <StyledText className="text-yellow-400">{name}</StyledText>;

    // Split and highlight the name based on the search term
    return (
      <>
        <Text className="text-yellow-400">{name.slice(0, index)}</Text>
        <Text className="text-green-400 font-bold">
          {name.slice(index, index + query.length)}
        </Text>
        <Text className="text-yellow-400">
          {name.slice(index + query.length)}
        </Text>
      </>
    );
  };

  return (
    <StyledTouchableOpacity
      onPress={() => navigation.navigate("EpisodeDetail", { episode })} // Navigate to EpisodeDetail screen
      className="bg-gray-900 rounded-lg shadow-lg m-4 flex-1 relative overflow-hidden border-2 border-green-500"
    >
      {/* Episode Information */}
      <StyledView className="p-4 bg-gray-900 rounded-lg">
        <StyledText className="text-xl font-bold">
          {/* Highlight episode name */}
          {highlightText(episode.name, searchQuery)}
        </StyledText>

        {/* Episode Code (e.g., S01E01) */}
        <StyledText className="text-md text-primary font-medium mt-1">
          {episode.episode}
        </StyledText>

        {/* Air Date */}
        <StyledText className="text-sm text-gray-400 mt-2">
          Aired on: {episode.air_date}
        </StyledText>
      </StyledView>

      {/* Add/Remove from favorites icon */}
      <TouchableOpacity
        onPress={toggleFavorite}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-full shadow-md"
      >
        <Icon
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={isFavorite ? "red" : "white"} // Red heart if favorite
        />
      </TouchableOpacity>
    </StyledTouchableOpacity>
  );
};

export default EpisodeCard;
