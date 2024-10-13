import { create } from "zustand/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Type for the store
interface ProfileState {
  username: string | null; // Username
  profileImage: string | null; // Profile image
  setUsername: (name: string) => void; // Save username
  setProfileImage: (imageUrl: string) => void; // Save profile image
  loadProfile: () => void; // Load profile data
}

// Function to save profile data to AsyncStorage
const saveProfileToStorage = async (
  username: string | null,
  profileImage: string | null
) => {
  try {
    const profileData = JSON.stringify({ username, profileImage });
    await AsyncStorage.setItem("userProfile", profileData);
  } catch (e) {
    console.error("Failed to save profile data:", e);
  }
};

// Function to load profile data from AsyncStorage
const getProfileFromStorage = async (): Promise<{
  username: string | null;
  profileImage: string | null;
}> => {
  try {
    const jsonValue = await AsyncStorage.getItem("userProfile");
    return jsonValue != null
      ? JSON.parse(jsonValue)
      : { username: null, profileImage: null };
  } catch (e) {
    console.error("Failed to load profile data:", e);
    return { username: null, profileImage: null };
  }
};

// Define Zustand store
export const useProfileStore = create<ProfileState>((set) => ({
  username: null,
  profileImage: null,

  // Save username
  setUsername: (name) =>
    set((state) => {
      const updatedProfile = { ...state, username: name };
      saveProfileToStorage(
        updatedProfile.username,
        updatedProfile.profileImage
      );
      return updatedProfile;
    }),

  // Save profile image
  setProfileImage: (imageUrl) =>
    set((state) => {
      const updatedProfile = { ...state, profileImage: imageUrl };
      saveProfileToStorage(
        updatedProfile.username,
        updatedProfile.profileImage
      );
      return updatedProfile;
    }),

  // Load profile data from AsyncStorage
  loadProfile: async () => {
    const storedProfile = await getProfileFromStorage(); // Load profile from AsyncStorage
    set({
      username: storedProfile.username,
      profileImage: storedProfile.profileImage,
    });
  },
}));
