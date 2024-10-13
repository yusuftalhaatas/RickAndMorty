import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind"; // NativeWind ile stiller
import ProfilePhoto from "../components/ProfilePhoto";
import FavoriteCharacterCard from "../components/FavoriteCharacterCard";
import FavoriteEpisodeCard from "../components/FavoriteEpisodeCard";
import FavoriteLocationCard from "../components/FavoriteLocationCard";
import CustomActivityIndicator from "../components/CustomActivityIndicator"; // CustomActivityIndicator import
import { FlashList } from "@shopify/flash-list"; // FlashList import
import { useProfileStore } from "../store/profileStore";
import { useFavoriteCharactersStore } from "../store/favoriteCharacterStore";
import { useFavoriteEpisodesStore } from "../store/favoriteEpisodeStore";
import { useFavoriteLocationsStore } from "../store/favoriteLocationStore";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Navigation hook
import { RootStackParamList } from "../types/navigation"; // Navigation types
import Icon from "react-native-vector-icons/Ionicons";
import ImageSelector from "../modals/ImageSelector"; // Modal import

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Navigation hook
  const { username, profileImage, setUsername, setProfileImage, loadProfile } =
    useProfileStore();
  const [editingUsername, setEditingUsername] = useState<boolean>(!username);
  const [newUsername, setNewUsername] = useState<string>(username || "");
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState(true);

  const { favoriteCharacters } = useFavoriteCharactersStore();
  const { favoriteEpisodes } = useFavoriteEpisodesStore();
  const { favoriteLocations } = useFavoriteLocationsStore();

  useEffect(() => {
    loadProfile();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [loadProfile]);

  const handleSaveUsername = () => {
    setEditingUsername(false);
    setUsername(newUsername);
  };

  if (isLoading) {
    return (
      <StyledSafeAreaView className="flex-1 justify-center items-center bg-gray-900">
        <CustomActivityIndicator />
        <StyledText className="text-white mt-2">Loading profile...</StyledText>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="flex-1 items-center justify-center p-4 bg-gray-900">
      <ProfilePhoto
        profileImage={profileImage}
        onSelectImage={() => setModalVisible(true)} // Modal'ı açmak için
      />

      {/* Username and Editing */}
      <StyledView className="mt-6 w-full flex-row items-center justify-center">
        {editingUsername ? (
          <StyledView className="flex-row items-center justify-between border border-green-400 rounded-lg w-[70%]">
            <StyledTextInput
              placeholder="Enter your username"
              value={newUsername}
              onChangeText={setNewUsername}
              className="p-2 flex-1 text-center bg-gray-800 text-white"
            />
            {/* Save button */}
            <TouchableOpacity onPress={handleSaveUsername}>
              <Icon
                name="checkmark"
                size={24}
                color="green"
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
          </StyledView>
        ) : (
          <TouchableOpacity onPress={() => setEditingUsername(true)}>
            <StyledText
              className="text-4xl font-bold text-green-400 mt-2"
              style={{ fontFamily: "GetSchwifty-Regular" }}
            >
              {username || "Enter your username"}
            </StyledText>
          </TouchableOpacity>
        )}
      </StyledView>

      {/* Favorite Characters */}
      <StyledView className="mt-8 w-full">
        <StyledText className="text-lg font-semibold mb-2 text-yellow-400">
          Favorite Characters
        </StyledText>
        {favoriteCharacters.length > 0 ? (
          <FlashList
            data={favoriteCharacters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: character }) => (
              <FavoriteCharacterCard
                character={character}
                onPress={() =>
                  navigation.navigate("CharacterDetail", { character })
                }
              />
            )}
            horizontal
            estimatedItemSize={100}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <StyledText className="text-gray-500 text-center">
            No favorite characters found.
          </StyledText>
        )}
      </StyledView>

      {/* Favorite Episodes */}
      <StyledView className="mt-8 w-full">
        <StyledText className="text-lg font-semibold mb-2 text-yellow-400">
          Favorite Episodes
        </StyledText>
        {favoriteEpisodes.length > 0 ? (
          <FlashList
            data={favoriteEpisodes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: episode }) => (
              <FavoriteEpisodeCard
                episode={episode}
                onPress={() =>
                  navigation.navigate("EpisodeDetail", { episode })
                }
              />
            )}
            horizontal
            estimatedItemSize={100}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <StyledText className="text-gray-500 text-center">
            No favorite episodes found.
          </StyledText>
        )}
      </StyledView>

      {/* Favorite Locations */}
      <StyledView className="mt-8 w-full">
        <StyledText className="text-lg font-semibold mb-2 text-yellow-400">
          Favorite Locations
        </StyledText>
        {favoriteLocations.length > 0 ? (
          <FlashList
            data={favoriteLocations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: location }) => (
              <FavoriteLocationCard
                location={location}
                onPress={() =>
                  navigation.navigate("LocationDetail", { location })
                }
              />
            )}
            horizontal
            estimatedItemSize={100}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <StyledText className="text-gray-500 text-center">
            No favorite locations found.
          </StyledText>
        )}
      </StyledView>

      {/* Image selector modal */}
      <ImageSelector
        visible={modalVisible} // Modal görünürlüğü
        onClose={() => setModalVisible(false)} // Modal'ı kapatma fonksiyonu
        onSelectImage={setProfileImage} // Profil resmini seçme fonksiyonu
      />
    </StyledSafeAreaView>
  );
};

export default ProfileScreen;
