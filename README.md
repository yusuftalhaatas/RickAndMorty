# RickAndMorty
## -Requirements
### 1. Expo and Expo Router with TypeScript
- The project is built using **Expo** and **TypeScript** to provide enhanced developer experience, type safety

### 2. Multi-select Implementation According to the Design
- A **multi-select** feature has been implemented, allowing users to select and manage multiple characters, episodes, or locations as per the design requirements.

### 3. Dynamic Query and API Integration
- The query entered in the input field is dynamically **queried via the API**. Results are displayed in a popup with different states depending on whether the query is active or not.

### 4. Character Display with Image, Name, and Episodes Count
- Each character result displays:
  - Character image
  - Name
  - The number of episodes they appeared in
- This is achieved using a custom `CharacterCard` component.

### 5. Query Highlighting in Results
- The search query entered by the user is **highlighted in green** within the result names. For example, searching for "Ric" will highlight "Ric" in the character names, making it easier to locate matches.

### 6. Adding and Removing Favorites
- Users can **add or remove** characters, episodes, and locations from their favorites list. This functionality includes:
  - Visual indicators to show the favorited state.
  - Smooth toggling between favorited and non-favorited states.

### 7. Custom Loading Indicator
- A **custom loading indicator** was implemented, following the Rick and Morty theme, to enhance the user experience during API data fetching.

### 8. Exception Handling and Error States
- If there’s an issue fetching data from the API, a **themed error screen** is displayed, informing the user about the error in a visually consistent manner.

### 9. APK Build Output
- The project has been built as an APK and can be found in the project files under `universal.apk`. This APK is ready for installation and testing on Android devices.

---
## Most importantly:

The architecture of the code you write should be clean and readable.
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
│   │   ├── AppNavigator.tsx          # Main navigation logic using Expo Router
│   │   └── routes.tsx                # Defines routes and screen navigation
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
│   │
│   ├── App.tsx                       # Root component where everything is combined
│   └── index.ts                      # Entry point for the application
│
├── assets                            # Assets like images, fonts, etc.
│   ├── images
│   ├── fonts
│   └── splash
│
├── node_modules                      # Node.js modules installed via npm
│
├── package.json                      # Project metadata and dependencies
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind configuration for NativeWind
└── app.json                          # Expo project configuration
```

## Technologies:
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


