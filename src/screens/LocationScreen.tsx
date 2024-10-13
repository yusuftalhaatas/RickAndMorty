import React, { useState } from "react";
import { Text, TextInput, SafeAreaView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import LocationCard from "../components/LocationCard"; // Importing LocationCard component
import { getAllLocations, searchLocations } from "../api/locationApi"; // API functions
import { styled } from "nativewind";
import { LocationType } from "../types/location";
import NotFound from "../components/NotFound";
import CustomActivityIndicator from "../components/CustomActivityIndicator";

// Components styled with Tailwind
const StyledTextInput = styled(TextInput);
const StyledView = styled(View);
const StyledText = styled(Text);

export default function LocationsScreen() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // API call to get all locations
  const {
    data: allLocationsData,
    error: allLocationsError,
    isLoading: allLocationsLoading,
  } = useQuery({
    queryKey: ["allLocations"],
    queryFn: getAllLocations,
  });

  // API call to get locations based on search query
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetched: isSearchFetched,
  } = useQuery({
    queryKey: ["searchLocations", searchQuery],
    queryFn: () => searchLocations(searchQuery),
    enabled: !!searchQuery, // Fetch only if there is a search term
  });

  // Logic to determine which locations to show (all locations if no search, search results if searching)
  const locationsToShow = searchQuery
    ? searchData?.results
    : allLocationsData?.results;

  // Loading state (shown during both full list and search)
  const isSearching = searchLoading && searchQuery;
  const isLoadingLocations = allLocationsLoading || searchLoading;

  // Show "not found" message if no results are found for the search query
  const noResultsFound =
    searchQuery && isSearchFetched && searchData?.results?.length === 0;

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-900">
      {/* Search Bar */}
      <StyledView className="flex-row justify-between items-center mb-4">
        <StyledText className="text-2xl font-bold text-green-500">
          Locations
        </StyledText>
        <StyledTextInput
          placeholder="Search locations..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="border border-green-500 p-2 rounded-lg flex-1 ml-2 mr-2 bg-gray-800 text-white"
        />
      </StyledView>

      {/* Loading Indicator */}
      {isLoadingLocations && (
        <StyledView className="items-center my-4">
          <CustomActivityIndicator />
          <StyledText className="text-white">Loading locations...</StyledText>
        </StyledView>
      )}

      {/* Error State */}
      {(allLocationsError || searchError) && (
        <StyledText className="text-center mt-5 text-red-500">
          Error fetching locations. Please try again.
        </StyledText>
      )}

      {/* Location Listing */}
      {!isLoadingLocations && (locationsToShow ?? []).length > 0 ? (
        <FlashList
          data={locationsToShow}
          renderItem={({ item }: { item: LocationType }) => (
            <LocationCard
              key={item.id}
              location={item}
              searchQuery={searchQuery} // Passing search query to LocationCard component
            />
          )}
          estimatedItemSize={100} // Adjust this based on your item size
        />
      ) : noResultsFound ? (
        <NotFound />
      ) : null}
    </SafeAreaView>
  );
}
