import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // Using NativeWind
import Icon from "react-native-vector-icons/Ionicons"; // Heart icon from Ionicons
import { Character } from "../types/character"; // Character type
import { useFavoriteCharactersStore } from "../store/favoriteCharacterStore"; // Favorite character store
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Using NativeStackNavigationProp
import { RootStackParamList } from "../types/navigation"; // Navigation type

interface CharacterCardProps {
  character: Character; // Character data
  searchQuery: string; // Search query for highlighting
}

// Define the navigation type
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CharacterDetail"
>;

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledView = styled(View);
const StyledText = styled(Text);

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  searchQuery,
}) => {
  const { favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } =
    useFavoriteCharactersStore();
  const isFavorite = favoriteCharacters.some((fav) => fav.id === character.id); // Check if the character is in favorites

  const navigation = useNavigation<NavigationProp>(); // Add type to navigation

  // Highlight the part that matches the search query
  const highlightText = (name: string, query: string) => {
    if (!query)
      return <StyledText className="text-yellow-400">{name}</StyledText>; // If no search query, show the whole name in yellow

    const index = name.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1)
      return <StyledText className="text-yellow-400">{name}</StyledText>; // If no match, show the name in yellow

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
      onPress={() => navigation.navigate("CharacterDetail", { character })} // Navigate to CharacterDetail screen
      className="bg-gray-900 rounded-lg shadow-lg m-4 flex-1 relative overflow-hidden border-2 border-green-500"
    >
      {/* Character image */}
      <StyledImage
        source={{ uri: character.image }}
        className="w-full h-48 rounded-t-lg"
        style={{ resizeMode: "cover" }}
      />

      {/* Add/remove favorite icon */}
      <TouchableOpacity
        onPress={() => {
          if (isFavorite) {
            removeFavoriteCharacter(character.id);
          } else {
            addFavoriteCharacter(character);
          }
        }}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-full shadow-md"
      >
        <Icon
          name={isFavorite ? "heart" : "heart-outline"} // Filled heart if favorite, otherwise outline heart
          size={24}
          color={isFavorite ? "red" : "white"} // Red heart if favorite
        />
      </TouchableOpacity>

      {/* Character information */}
      <StyledView className="p-4 bg-gray-900 rounded-b-lg">
        <StyledText
          className="text-xl font-bold"
          style={{ fontFamily: "GetSchwifty-Regular" }}
        >
          {/* Highlight character name */}
          {highlightText(character.name, searchQuery)}
        </StyledText>

        {/* Character status */}
        <StyledText
          className={`text-md mt-1 ${
            character.status === "Alive" ? "text-green-400" : "text-red-500"
          } font-medium`}
        >
          {character.status === "Alive" ? "🟢 Alive" : "🔴 Dead"}
        </StyledText>

        {/* Show the number of episodes the character appears in */}
        <StyledText className="text-sm mt-2 text-gray-400">
          in {character.episode.length} episode
          {character.episode.length > 1 ? "s" : ""}
        </StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default CharacterCard;
