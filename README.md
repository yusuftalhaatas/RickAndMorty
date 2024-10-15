# RickAndMorty

This project is a Rick and Morty character, episode, and location explorer built with **Expo**, **TypeScript**, and **React Native**. It uses the [Rick and Morty API](https://rickandmortyapi.com) to fetch and display data about characters, episodes, and locations from the show. Users can explore, search, and favorite their preferred characters, episodes, and locations, with detailed views for each entity.

## Features

- **Character Search**: Search for Rick and Morty characters by name and view details like their status, species, gender, and episodes they've appeared in.
- **Episodes**: View a list of all episodes, with character details for each episode.
- **Locations**: Explore different locations from the show and the residents that live there.
- **Favorites**: Users can add and remove favorites for characters, episodes, and locations.
- **Highlighting Search Queries**: Searched terms are highlighted in green within the results.
- **Multi-Select**: Select multiple characters, episodes, or locations for better exploration.
- **Loading and Error Handling**: Custom loading indicators and error states ensure a smooth user experience.

## Technologies Used

- **Expo and Expo Router**: Easy mobile development and routing.
- **TypeScript**: Type safety and clean code structure.
- **NativeWind**: Tailwind-like styling for React Native.
- **TanStack Query v5**: Efficient API data fetching and caching.
- **Zustand**: Lightweight state management for handling profile and favorites data.

## How to Install

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yusuftalhaatas/RickAndMorty.git
   cd RickAndMorty
   npm install
   npx expo start

## Project Structure

```bash
├── src
│   ├── api
│   │   ├── characterApi.ts           # API functions for fetching character data
│   │   ├── episodeApi.ts             # API functions for fetching episode data
│   │   └── locationApi.ts            # API functions for fetching location data
│   │
│   ├── components
│   │   ├── CharacterCard.tsx         # Component for displaying character info
│   │   ├── FavoriteCharacterCard.tsx # Component for displaying favorited characters
│   │   ├── FavoriteEpisodeCard.tsx   # Component for displaying favorited episodes
│   │   ├── FavoriteLocationCard.tsx  # Component for displaying favorited locations
│   │   ├── CustomActivityIndicator.tsx # Custom loading indicator
│   │   ├── ErrorScreen.tsx           # Error screen component
│   │   └── NotFound.tsx              # Not found screen for search results
│   │
│   ├── hooks
│   │   └── useCustomFonts.ts         # Hook to load custom fonts
│   │
│   ├── modals
│   │   └── ImageSelector.tsx         # Modal for selecting profile image
│   │
│   ├── navigation
│   │   ├── AppNavigator.tsx          # Main navigation
│   │   └── BottomTabs.tsx            # Bottom tabs    
│   │
│   ├── screens
│   │   ├── CharactersScreen.tsx      # Screen for displaying characters
│   │   ├── EpisodesScreen.tsx        # Screen for displaying episodes
│   │   ├── LocationsScreen.tsx       # Screen for displaying locations
│   │   ├── ProfileScreen.tsx         # User profile screen with favorite lists
│   │   ├── LocationDetailScreen.tsx  # Detailed view of a location
│   │   └── EpisodeDetailScreen.tsx   # Detailed view of an episode
│   │
│   ├── store
│   │   ├── favoriteCharacterStore.ts # Zustand store for managing favorite characters
│   │   ├── favoriteEpisodeStore.ts   # Zustand store for managing favorite episodes
│   │   ├── favoriteLocationStore.ts  # Zustand store for managing favorite locations
│   │   └── profileStore.ts           # Zustand store for managing profile data
│   │
│   ├── types
│   │   ├── character.ts              # Type definitions for character data
│   │   ├── episode.ts                # Type definitions for episode data
│   │   ├── location.ts               # Type definitions for location data
│   │   └── navigation.ts             # Type definitions for navigation props
│   
│   
│                        
│
├── assets                            # Assets like images, fonts, etc.
│   ├── images
│   ├── fonts
│   └── splash
│
├── App.tsx                           # Root component where everything is combined
├── node_modules                      # Node.js modules installed via npm
│
├── package.json                      # Project metadata and dependencies
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind configuration for NativeWind
└── app.json                          # Expo project configuration
```

## Technologies:
- **React Native**
- **Typescript**
- **NativeWind**
- **TanStack Query v5**
- **Zustand**

## App Screenshots

### Splash and Character Screens

<p >
  <img src="https://github.com/user-attachments/assets/4a324a05-7685-4e03-90f7-a217313e519a" alt="Splash Screen" width="200" />
  <img src="https://github.com/user-attachments/assets/3b668abd-4e6a-4040-9edb-8e7107710627" alt="Character Search" width="200" />
</p>

### Episode List and Location List

<p>
  <img src="https://github.com/user-attachments/assets/7ecd8c7a-525a-4b1f-91a9-7e12a937a3ab" alt="Character List" width="200" />
  <img src="https://github.com/user-attachments/assets/9a4f8929-588e-4ef1-8dfa-5836b78561b0" alt="Character Details" width="200" />
</p>

### Profile Screen and Character Searching

<p >
  <img src="https://github.com/user-attachments/assets/7eae5824-28c6-4ca9-9548-93fc2d5bbce1" alt="Episode List" width="200" />
  <img src="https://github.com/user-attachments/assets/8f86092d-ed0d-4699-808a-ea15616f1afd" alt="Favorites" width="200" />
</p>

### Not Found Screen and Profile Photo Picker

<p >
  <img src="https://github.com/user-attachments/assets/f815fe7f-65eb-4a8b-885d-ae29fab48bad" alt="Profile Screen" width="200" />
  <img src="https://github.com/user-attachments/assets/2035359e-d052-4ee5-8f51-873ced362e29" alt="Loading Screen" width="200" />
</p>

### Profile Editing and Character Detail Screen

<p >
  <img src="https://github.com/user-attachments/assets/f2513c4a-746c-40fc-bc62-77666e23763b" alt="404 Error" width="200" />
  <img src="https://github.com/user-attachments/assets/29724a85-ec61-4331-845f-9c526daab889" alt="Failed to Load" width="200" />
</p>

### Episode and Location Details

<p >
  <img src="https://github.com/user-attachments/assets/59ea2bae-eab9-4ab0-ad6b-437bbdc1115d" alt="Episode Details" width="200" />
  <img src="https://github.com/user-attachments/assets/c535ff01-cfda-4adf-a2cd-ec0ac97133ef" alt="Location Details" width="200" />
</p>

### Loading and Error Screen

<p >
  <img src="https://github.com/user-attachments/assets/770b6af6-dc88-40a5-aa59-695499b8bb31" alt="WhatsApp Preview" width="200" />
  <img src="https://github.com/user-attachments/assets/e066e6c1-8bd9-4f8b-b92e-f2a95782fa29" alt="Other Screen 2" width="200" />
</p>


