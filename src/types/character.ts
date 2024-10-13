export interface Character {
  id: number; // Unique identifier for the character
  name: string; // Name of the character
  status: string; // Status of the character (e.g., Alive, Dead, Unknown)
  species: string; // Species of the character
  type: string; // Type or subspecies of the character
  gender: string; // Gender of the character
  origin: {
    name: string; // Name of the character's origin location
    url: string; // URL of the character's origin location
  };
  location: {
    name: string; // Name of the character's current location
    url: string; // URL of the character's current location
  };
  image: string; // URL of the character's image
  episode: string[]; // List of episodes in which the character has appeared
  url: string; // URL of the character's own endpoint
  created: string; // Time at which the character was created in the database
}

export interface CharacterAPIResponse {
  info: {
    count: number; // Total number of characters
    pages: number; // Total number of pages
    next: string | null; // URL of the next page (if any)
    prev: string | null; // URL of the previous page (if any)
  };
  results: Character[]; // Array of characters
}
