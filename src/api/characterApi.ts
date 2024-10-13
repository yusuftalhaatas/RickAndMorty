import { Character } from "../types/character";

// API function: Fetches all characters
export const getAllCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// API function: Fetches characters based on search query
export const searchCharacters = async (searchQuery: string) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${searchQuery}`
  );

  // Check if the API call was successful
  if (!response.ok) {
    if (response.status === 404) {
      // Return "No characters found" when status is 404
      return { results: [] }; // Return empty result, not an error
    }
    throw new Error("Error fetching characters"); // Throw an error for other statuses
  }

  const data = await response.json();
  return data; // Return data on success
};

// API function: Fetches characters by IDs
export const getCharactersByIds = async (
  ids: number[]
): Promise<Character[]> => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${ids.join(",")}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch characters by IDs");
    }

    const data = await response.json();

    // API returns an object for a single character, an array for multiple characters.
    // Wrap the single character in an array.
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching characters by IDs:", error);
    throw error;
  }
};

// API function: Fetches character images
export const getCharacterImages = async (): Promise<string[]> => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }

    const data = await response.json();

    // Extract only the image URLs of the characters
    const imageUrls = data.results.map(
      (character: Character) => character.image
    );

    return imageUrls;
  } catch (error) {
    console.error("Error fetching character images:", error);
    throw error;
  }
};
