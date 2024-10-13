import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; // Navigation type
import { styled } from "nativewind"; // For using Tailwind
import { useQuery } from "@tanstack/react-query"; // React Query
import { getEpisodesByIds } from "../api/episodeApi"; // Function to get episodes by IDs
import { Episode } from "../types/episode";
import { useCustomFonts } from "../hooks/useCustomFonts"; // Hook to load custom fonts
import EpisodeCard from "../components/EpisodeCard"; // Importing EpisodeCard component
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { FlashList } from "@shopify/flash-list"; // Importing FlashList component
import { useFavoriteCharactersStore } from "../store/favoriteCharacterStore"; // Store for favorite characters
import Icon from "react-native-vector-icons/Ionicons"; // Icon library

type Props = NativeStackScreenProps<RootStackParamList, "CharacterDetail">;

const StyledView = styled(View);
const StyledText = styled(Text);

const CharacterDetailScreen: React.FC<Props> = ({ route }) => {
  const { character } = route.params; // Getting character details from route
  const { favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } =
    useFavoriteCharactersStore(); // Store for managing favorite characters

  const fontsLoaded = useCustomFonts(); // Loading fonts
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favoriteCharacters.some((favChar) => favChar.id === character.id)
  ); // Check if the character is already a favorite

  // Extracting episode IDs from character's episodes
  const episodeIds = character.episode.map((url: string) =>
    parseInt(url.split("/").pop()!)
  );

  // Fetching episode data using getEpisodesByIds API function
  const {
    data: episodes,
    error,
    isLoading,
  } = useQuery<Episode[]>({
    queryKey: ["episodes", episodeIds], // Unique query key
    queryFn: () => getEpisodesByIds(episodeIds), // API function
    enabled: !!episodeIds.length, // Run if there are IDs
  });

  // Toggle favorite status
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteCharacter(character.id);
    } else {
      addFavoriteCharacter(character);
    }
    setIsFavorite(!isFavorite); // Toggle the favorite status
  };

  // Loading state
  if (isLoading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-900">
        <CustomActivityIndicator />
        <StyledText className="text-white mt-2">Loading episodes...</StyledText>
      </StyledView>
    );
  }

  // Error state
  if (error) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-900">
        <StyledText className="text-red-500">
          Failed to load episodes
        </StyledText>
      </StyledView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlashList
        ListHeaderComponent={
          <StyledView className="p-4">
            {/* Character Image */}
            <StyledView className="bg-black">
              <Image
                source={{ uri: character.image }}
                className="w-full h-96"
                resizeMode="cover"
              />
            </StyledView>

            {/* Character Name */}
            <StyledView className="px-4 py-6 bg-gray-800 rounded-t-3xl -mt-8 shadow-lg">
              {fontsLoaded && (
                <StyledText
                  className="text-4xl font-bold text-center text-green-500 mb-4"
                  style={{ fontFamily: "GetSchwifty-Regular" }} // Using custom font
                >
                  {character.name}
                </StyledText>
              )}

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

              {/* Character Details */}
              <StyledView className="mt-6">
                <StyledText className="text-xl font-semibold text-gray-400">
                  Status
                </StyledText>
                <StyledText className="text-lg text-white mb-4">
                  {character.status === "Alive" ? "🟢 Alive" : "🔴 Dead"}
                </StyledText>

                <StyledText className="text-xl font-semibold text-gray-400">
                  Species
                </StyledText>
                <StyledText className="text-lg text-white mb-4">
                  {character.species}
                </StyledText>

                {character.type ? (
                  <>
                    <StyledText className="text-xl font-semibold text-gray-400">
                      Type
                    </StyledText>
                    <StyledText className="text-lg text-white mb-4">
                      {character.type}
                    </StyledText>
                  </>
                ) : null}

                <StyledText className="text-xl font-semibold text-gray-400">
                  Gender
                </StyledText>
                <StyledText className="text-lg text-white mb-4">
                  {character.gender}
                </StyledText>

                <StyledText className="text-xl font-semibold text-gray-400">
                  Origin
                </StyledText>
                <StyledText className="text-lg text-white mb-4">
                  {character.origin.name}
                </StyledText>

                <StyledText className="text-xl font-semibold text-gray-400">
                  Location
                </StyledText>
                <StyledText className="text-lg text-white mb-4">
                  {character.location.name}
                </StyledText>

                <StyledText className="text-xl font-semibold text-gray-400">
                  Episodes
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        }
        data={episodes} // Rendering episodes with FlashList
        estimatedItemSize={150} // Estimating item size for performance
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-2">
            <EpisodeCard episode={item} searchQuery="" />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CharacterDetailScreen;
