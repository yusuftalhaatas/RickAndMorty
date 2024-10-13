import { LocationType } from "../types/location";

// API function to fetch location data
export const getAllLocations = async (): Promise<{
  results: LocationType[];
}> => {
  const response = await fetch("https://rickandmortyapi.com/api/location");
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }
  return response.json(); // Parse the data returned in JSON format
};

export const searchLocations = async (
  query: string
): Promise<{ results: LocationType[] }> => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/location?name=${query}`
    );

    // Check if the API call was successful
    if (!response.ok) {
      if (response.status === 404) {
        // Return "No locations found" result when status is 404
        return { results: [] }; // Return empty result, not an error
      }
      throw new Error("Error fetching locations"); // Throw a real error for other statuses
    }

    const data = await response.json();
    return data; // Return the data in successful cases
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
};
