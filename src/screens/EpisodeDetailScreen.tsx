import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { styled } from "nativewind"; // For using NativeWind
import CharacterCard from "../components/CharacterCard"; // CharacterCard component
import { Character } from "../types/character"; // Character type
import { useQuery } from "@tanstack/react-query"; // React Query
import { getCharactersByIds } from "../api/characterApi"; // API function
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { FlashList } from "@shopify/flash-list"; // FlashList import
import Error from "../components/Error";
import Icon from "react-native-vector-icons/Ionicons"; // Icon library
import { useFavoriteEpisodesStore } from "../store/favoriteEpisodeStore"; // Store for favorite episodes

type Props = NativeStackScreenProps<RootStackParamList, "EpisodeDetail">;

const StyledView = styled(View);
const StyledText = styled(Text);

const EpisodeDetailScreen: React.FC<Props> = ({ route }) => {
  const { episode } = route.params;

  const { favoriteEpisodes, addFavoriteEpisode, removeFavoriteEpisode } =
    useFavoriteEpisodesStore(); // Store for managing favorite episodes

  const [isFavorite, setIsFavorite] = useState<boolean>(
    favoriteEpisodes.some((favEpisode) => favEpisode.id === episode.id)
  ); // Check if the episode is already a favorite

  // Extract character IDs from URLs
  const characterIds = episode.characters.map((url: string) =>
    parseInt(url.split("/").pop()!)
  );

  // Fetch character data using useQuery
  const {
    data: characters,
    error,
    isLoading,
  } = useQuery<Character[]>({
    queryKey: ["characters", characterIds], // Unique query key
    queryFn: () => getCharactersByIds(characterIds), // API function
    enabled: !!characterIds.length, // Run only if there are character IDs
  });

  // Toggle favorite status for episode
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteEpisode(episode.id);
    } else {
      addFavoriteEpisode(episode);
    }
    setIsFavorite(!isFavorite); // Toggle the favorite status
  };

  // Loading state
  if (isLoading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-900">
        <CustomActivityIndicator />
        <StyledText className="text-white mt-2">
          Loading characters...
        </StyledText>
      </StyledView>
    );
  }

  // Error state
  if (error) {
    return <Error message="Failed to load characters" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlashList
        ListHeaderComponent={
          <>
            {/* Episode Details */}
            <StyledView className="bg-gray-800 p-5 rounded-lg shadow-lg mb-4 relative">
              <StyledText className="text-3xl font-bold text-green-500 mb-2">
                {episode.name}
              </StyledText>
              <StyledText className="text-lg text-gray-300">
                {episode.episode} - Aired on {episode.air_date}
              </StyledText>

              {/* Favorite Icon */}
              <TouchableOpacity
                onPress={handleToggleFavorite}
                className="absolute top-5 right-5"
              >
                <Icon
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={30}
                  color={isFavorite ? "red" : "white"}
                />
              </TouchableOpacity>
            </StyledView>

            <StyledText className="text-xl font-semibold text-green-500 mb-4">
              Characters in this episode:
            </StyledText>
          </>
        }
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={100} // Estimated item size for performance
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            searchQuery="" // No search query, just displaying character info
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }} // Padding for proper display
      />
    </SafeAreaView>
  );
};

export default EpisodeDetailScreen;
