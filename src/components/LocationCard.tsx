import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // NativeWind kullanıyoruz
import Icon from "react-native-vector-icons/Ionicons"; // Icon kullanımı için Ionicons
import { LocationType } from "../types/location"; // Location tipi
import { useFavoriteLocationsStore } from "../store/favoriteLocationStore"; // Favori mekanları yöneten store
import { RootStackParamList } from "../types/navigation"; // Navigation tipi
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Navigation tipi
import { useNavigation } from "@react-navigation/native"; // Navigation hook'u

// LocationCardProps arayüzü
interface LocationCardProps {
  location: LocationType; // Mekan verisi
  searchQuery: string; // Arama sorgusu, vurgulama için
}

// Navigation tipini belirleyelim
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LocationDetail"
>;

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  searchQuery,
}) => {
  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocation } =
    useFavoriteLocationsStore();

  // Favori olup olmadığını kontrol et
  const isFavorite = favoriteLocations.some(
    (favLocation: { id: number }) => favLocation.id === location.id
  );

  const navigation = useNavigation<NavigationProp>(); // Navigation'a tip ekliyoruz

  // Favorilere ekleme/çıkarma işlemi
  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavoriteLocation(location.id); // Favoriden çıkar
    } else {
      addFavoriteLocation(location); // Favorilere ekle
    }
  }, [isFavorite, location.id, addFavoriteLocation, removeFavoriteLocation]);

  // Arama sorgusu ile eşleşen kısmı vurgulamak için
  const highlightText = (text: string, query: string) => {
    if (!query)
      return <StyledText className="text-yellow-400">{text}</StyledText>;

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1)
      return <StyledText className="text-yellow-400">{text}</StyledText>;

    // Arama terimine göre adı parçala ve vurgula
    return (
      <>
        <Text className="text-yellow-400">{text.slice(0, index)}</Text>
        <Text className="text-green-400 font-bold">
          {text.slice(index, index + query.length)}
        </Text>
        <Text className="text-yellow-400">
          {text.slice(index + query.length)}
        </Text>
      </>
    );
  };

  return (
    <StyledTouchableOpacity
      onPress={() => navigation.navigate("LocationDetail", { location })} // LocationDetail ekranına yönlendirme
      className="bg-gray-900 rounded-lg shadow-lg m-4 flex-1 relative overflow-hidden border-2 border-green-500"
    >
      {/* Mekan Bilgileri */}
      <StyledView className="p-4 bg-gray-900 rounded-lg">
        <StyledText className="text-xl font-bold">
          {/* Mekan adını vurgulama */}
          {highlightText(location.name, searchQuery)}
        </StyledText>

        {/* Mekan türü */}
        <StyledText className="text-md text-primary font-medium mt-1">
          {location.type}
        </StyledText>

        {/* Mekan boyutu */}
        <StyledText className="text-sm text-gray-400 mt-2">
          Dimension: {location.dimension}
        </StyledText>
      </StyledView>

      {/* Favorilere ekle/çıkar ikonu */}
      <TouchableOpacity
        onPress={toggleFavorite}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-full shadow-md"
      >
        <Icon
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={isFavorite ? "red" : "white"} // Favori ise kırmızı kalp
        />
      </TouchableOpacity>
    </StyledTouchableOpacity>
  );
};

export default LocationCard;
