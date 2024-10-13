import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import EpisodeCard from "../components/EpisodeCard"; // Import EpisodeCard component
import { getAllEpisodes, searchEpisodes } from "../api/episodeApi"; // API functions
import { styled } from "nativewind"; // Using Tailwind for styling
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import NotFound from "../components/NotFound";
import Error from "../components/Error";
import { Episode } from "../types/episode";

// Components styled with Tailwind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledSafeAreaView = styled(SafeAreaView);

export default function EpisodesScreen() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // API call to get all episodes
  const {
    data: allEpisodesData,
    error: allEpisodesError,
    isLoading: allEpisodesLoading,
  } = useQuery({
    queryKey: ["allEpisodes"],
    queryFn: getAllEpisodes,
  });

  // API call to get episodes based on search query
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetched: isSearchFetched,
  } = useQuery({
    queryKey: ["searchEpisodes", searchQuery],
    queryFn: () => searchEpisodes(searchQuery),
    enabled: !!searchQuery, // Fetch only if there is a search term
  });

  // Logic to display episodes (all episodes if no search, search results if there is a search)
  const episodesToShow: Episode[] = searchQuery
    ? (searchData?.results as Episode[])
    : (allEpisodesData?.results as Episode[]);

  // Loading state
  const isSearching = searchLoading && searchQuery;
  const isLoadingEpisodes = allEpisodesLoading || isSearching;

  // Show "not found" message if no results are found for the search query
  const noResultsFound =
    searchQuery && isSearchFetched && searchData?.results?.length === 0;

  return (
    <StyledSafeAreaView className="flex-1 p-4 bg-gray-900">
      {/* Search Icon and Bar */}
      <StyledView className="flex-row justify-between items-center mb-4">
        <StyledText className="text-2xl font-bold text-green-500">
          Episodes
        </StyledText>

        {/* Search Bar */}
        <StyledTextInput
          placeholder="Search episodes..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update search term
          className="border border-green-500 p-2 rounded-lg flex-1 ml-2 mr-2 bg-gray-800 text-white"
        />
      </StyledView>

      {/* Loading Indicator (shown during global loading and search) */}
      {isLoadingEpisodes && (
        <StyledView className="flex-1 justify-center items-center bg-gray-900">
          <CustomActivityIndicator />
          <StyledText className="text-white mt-2">Loading...</StyledText>
        </StyledView>
      )}

      {/* Error state */}
      {(allEpisodesError || searchError) && (
        <Error message="Failed to load episodes" />
      )}

      {/* Episode Listing */}
      {!isLoadingEpisodes && episodesToShow?.length > 0 ? (
        <FlashList
          data={episodesToShow}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EpisodeCard episode={item} searchQuery={searchQuery} />
          )}
          estimatedItemSize={100} // Estimated size of each item
        />
      ) : noResultsFound && !isLoadingEpisodes ? (
        // Show this message if search was done but no results were found
        <NotFound />
      ) : null}
    </StyledSafeAreaView>
  );
}
