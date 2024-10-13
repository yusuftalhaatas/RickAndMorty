import React, { useState } from "react";
import { View, Text, FlatList, TextInput, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../components/CharacterCard"; // Character card component
import { getAllCharacters, searchCharacters } from "../api/characterApi"; // API functions
import { styled } from "nativewind"; // Using Tailwind for styling
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import Error from "../components/Error";
import NotFound from "../components/NotFound";

// Components styled with Tailwind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledSafeAreaView = styled(SafeAreaView);

export default function CharactersScreen() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // API call to get all characters
  const {
    data: allCharactersData,
    error: allCharactersError,
    isLoading: allCharactersLoading,
  } = useQuery({ queryKey: ["allCharacters"], queryFn: getAllCharacters });

  // API call to get characters based on search query
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetched: isSearchFetched, // To check if the search operation is completed
  } = useQuery({
    queryKey: ["characters", searchQuery], // Dynamic query key based on search query
    queryFn: () => searchCharacters(searchQuery), // Calling the search function
    enabled: !!searchQuery, // Fetch only when a search term is entered
  });

  // Logic to display characters (all characters if no search, search results if search is performed)
  const charactersToShow = searchQuery
    ? searchData?.results
    : allCharactersData?.results;

  // Loading state, shown only during search
  const isSearching = searchLoading && searchQuery;

  // Global loading state (shown while all characters are loading)
  const isLoadingCharacters = allCharactersLoading || searchLoading;

  // If no data is found in the API result, show a "character not found" message
  const noResultsFound =
    searchQuery && isSearchFetched && searchData?.results?.length === 0;

  return (
    <StyledSafeAreaView className="flex-1 p-4 bg-gray-900">
      {/* Search Icon and Bar */}
      <StyledView className="flex-row justify-between items-center mb-4">
        <StyledText className="text-2xl font-bold text-green-500">
          Characters
        </StyledText>

        {/* Search Bar */}
        <StyledTextInput
          placeholder="Search characters..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update search term
          className="border border-green-500 p-2 rounded-lg flex-1 ml-2 mr-2 bg-gray-800 text-white"
        />
      </StyledView>

      {/* Loading Indicator (shown during global loading and search) */}
      {isLoadingCharacters && (
        <StyledView className="flex-1 justify-center items-center bg-gray-900">
          <CustomActivityIndicator />
          <StyledText className="text-white mt-2">Loading...</StyledText>
        </StyledView>
      )}

      {/* Error state */}
      {(allCharactersError || searchError) && (
        <Error message="Failed to load characters" />
      )}

      {/* Listing Characters */}
      {!isLoadingCharacters && charactersToShow?.length > 0 ? (
        <FlatList
          data={charactersToShow}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <CharacterCard character={item} searchQuery={searchQuery} />
          )}
          initialNumToRender={15} // Render 15 items initially
          maxToRenderPerBatch={5} // Render 5 items per batch
          windowSize={4} // Set the window size for items kept in memory
          removeClippedSubviews={true} // Remove items not in view from memory
        />
      ) : noResultsFound && !isLoadingCharacters ? (
        // Show this message if search is performed but no results are found
        <NotFound />
      ) : null}
    </StyledSafeAreaView>
  );
}
