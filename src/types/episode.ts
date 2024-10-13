// Episode type
export interface Episode {
  id: number; // Episode ID
  name: string; // Episode name
  air_date: string; // Air date
  episode: string; // Episode code (e.g., S01E01)
  characters: string[]; // URLs of characters in this episode
  url: string; // URL of the episode
  created: string; // Creation date of the episode in the API
}
