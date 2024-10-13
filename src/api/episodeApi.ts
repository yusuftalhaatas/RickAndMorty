import { Episode } from "../types/episode";

// Function to get all episodes
export const getAllEpisodes = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/episode");
  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }
  return response.json();
};

// Function to get episodes by their IDs
export const getEpisodesByIds = async (ids: number[]): Promise<Episode[]> => {
  try {
    // Making an API request by separating IDs with commas
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode/${ids.join(",")}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch episodes by IDs");
    }

    const data = await response.json();

    // The API returns an object when a single episode is fetched, and an array when multiple episodes are fetched.
    // In the case of a single episode, we wrap the episode in an array.
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching episodes by IDs:", error);
    throw error;
  }
};

// Function to search episodes by query
export const searchEpisodes = async (query: string) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode?name=${query}`
  );

  // Checking if the API call was successful
  if (!response.ok) {
    if (response.status === 404) {
      // Return "No episodes found" when status is 404
      return { results: [] }; // Return empty results, not an error
    }
    throw new Error("Error fetching episodes"); // Throw a real error for other statuses
  }

  const data = await response.json();
  return data; // Return data in successful cases
};
