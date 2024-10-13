import React, { useState } from "react";
import { View, Text, FlatList, TextInput, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../components/CharacterCard"; // Karakter kartı bileşeni
import { getAllCharacters, searchCharacters } from "../api/characterApi"; // API fonksiyonları
import { styled } from "nativewind"; // Tailwind ile stil kullanımı
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import Error from "../components/Error";
import NotFound from "../components/NotFound";

// Tailwind ile stillenmiş bileşenler
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledSafeAreaView = styled(SafeAreaView);

export default function CharactersScreen() {
  const [searchQuery, setSearchQuery] = useState(""); // Arama sorgusu

  // Tüm karakterleri getiren API çağrısı
  const {
    data: allCharactersData,
    error: allCharactersError,
    isLoading: allCharactersLoading,
  } = useQuery({ queryKey: ["allCharacters"], queryFn: getAllCharacters });

  // Arama sorgusuna göre karakterleri getiren API çağrısı
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetched: isSearchFetched, // Arama işleminin tamamlanıp tamamlanmadığını kontrol etmek için
  } = useQuery({
    queryKey: ["characters", searchQuery], // Arama sorgusuna dayalı dinamik query key
    queryFn: () => searchCharacters(searchQuery), // Arama fonksiyonunu çağırıyoruz
    enabled: !!searchQuery, // Sadece arama terimi girildiğinde fetch yap
  });

  // Karakterleri gösterme mantığı (arama yapılmamışsa tüm karakterler, yapılmışsa arama sonuçları)
  const charactersToShow = searchQuery
    ? searchData?.results
    : allCharactersData?.results;

  // Yükleme durumu, sadece arama yapılırken gösterilecek
  const isSearching = searchLoading && searchQuery;

  // Global yükleme durumu (tüm karakterler yüklenirken gösterilecek)
  const isLoadingCharacters = allCharactersLoading || searchLoading;

  // API sonucunda veri yoksa, karakter bulunamadı mesajı göstermek için.
  const noResultsFound =
    searchQuery && isSearchFetched && searchData?.results?.length === 0;

  return (
    <StyledSafeAreaView className="flex-1 p-4 bg-gray-900">
      {/* Arama İkonu ve Çubuğu */}
      <StyledView className="flex-row justify-between items-center mb-4">
        <StyledText className="text-2xl font-bold text-green-500">
          Characters
        </StyledText>

        {/* Arama Çubuğu */}
        <StyledTextInput
          placeholder="Search characters..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Arama terimini günceller
          className="border border-green-500 p-2 rounded-lg flex-1 ml-2 mr-2 bg-gray-800 text-white"
        />
      </StyledView>

      {/* Yükleme Göstergesi (Global yükleme ve arama sırasında gösterilecek) */}
      {isLoadingCharacters && (
        <StyledView className="flex-1 justify-center items-center bg-gray-900">
          <CustomActivityIndicator />
          <StyledText className="text-white mt-2">Loading...</StyledText>
        </StyledView>
      )}

      {/* Hata durumu */}
      {(allCharactersError || searchError) && (
        <Error message="Failed to load characters" />
      )}

      {/* Karakterleri Listeleme */}
      {!isLoadingCharacters && charactersToShow?.length > 0 ? (
        <FlatList
          data={charactersToShow}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <CharacterCard character={item} searchQuery={searchQuery} />
          )}
          initialNumToRender={15} // İlk başta 15 öğe render et
          maxToRenderPerBatch={5} // Her batch'te 5 öğe render et
          windowSize={4} // Görüntüde tutulan pencere boyutunu ayarla
          removeClippedSubviews={true} // Ekranda olmayan öğeleri bellekten çıkar
        />
      ) : noResultsFound && !isLoadingCharacters ? (
        // Arama yapıldı fakat sonuç bulunamadıysa bu mesajı göster
        <NotFound />
      ) : null}
    </StyledSafeAreaView>
  );
}
