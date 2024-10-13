import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styled } from "nativewind"; // Using styles with NativeWind
import { LocationType } from "../types/location"; // Location type
import { useQuery } from "@tanstack/react-query"; // Using React Query
import { getCharactersByIds } from "../api/characterApi"; // API function
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import CharacterCard from "../components/CharacterCard"; // CharacterCard component
import { FlashList } from "@shopify/flash-list"; // FlashList import
import Icon from "react-native-vector-icons/Ionicons"; // Icon library
import { useFavoriteLocationsStore } from "../store/favoriteLocationStore"; // Store for favorite locations

// Components styled with Tailwind
const StyledView = styled(View);
const StyledText = styled(Text);

const LocationDetailScreen: React.FC = () => {
  const route = useRoute();
  const { location } = route.params as { location: LocationType };

  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocation } =
    useFavoriteLocationsStore(); // Store for managing favorite locations

  const [isFavorite, setIsFavorite] = useState<boolean>(
    favoriteLocations.some((favLocation) => favLocation.id === location.id)
  ); // Check if the location is already a favorite

  // Extract character IDs from URLs
  const characterIds = location.residents.map((url: string) =>
    parseInt(url.split("/").pop()!)
  );

  // Fetch character data for the residents of the location using useQuery
  const {
    data: characters,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["characters", characterIds],
    queryFn: () => getCharactersByIds(characterIds),
    enabled: !!characterIds.length, // Run only if there are character IDs
  });

  // Toggle favorite status for location
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteLocation(location.id);
    } else {
      addFavoriteLocation(location);
    }
    setIsFavorite(!isFavorite); // Toggle the favorite status
  };

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

  if (error) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-900">
        <StyledText className="text-red-500">
          Error fetching characters
        </StyledText>
      </StyledView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlashList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={100} // Estimated item size for performance
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            searchQuery="" // No search query, just displaying character info
          />
        )}
        ListHeaderComponent={
          <StyledView className="p-4">
            {/* Location Title */}
            <StyledView className="mb-4 relative">
              <StyledText className="text-3xl font-bold text-green-500">
                {location.name}
              </StyledText>

              {/* Favorite Icon */}
              <TouchableOpacity
                onPress={handleToggleFavorite}
                className="absolute top-0 right-0"
              >
                <Icon
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={30}
                  color={isFavorite ? "red" : "white"}
                />
              </TouchableOpacity>
            </StyledView>

            {/* Location Details */}
            <StyledView className="bg-gray-800 p-5 rounded-lg shadow-lg mb-4">
              <StyledText className="text-lg text-gray-400">Type:</StyledText>
              <StyledText className="text-xl font-bold text-white">
                {location.type}
              </StyledText>

              <StyledText className="text-lg text-gray-400 mt-2">
                Dimension:
              </StyledText>
              <StyledText className="text-xl font-bold text-white">
                {location.dimension}
              </StyledText>
            </StyledView>

            <StyledText className="text-xl font-semibold text-green-500 mb-4">
              Residents in this location:
            </StyledText>
          </StyledView>
        }
        contentContainerStyle={{ paddingBottom: 20 }} // Adding bottom padding to improve scrolling
      />
    </SafeAreaView>
  );
};

export default LocationDetailScreen;
