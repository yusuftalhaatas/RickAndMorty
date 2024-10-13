import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getCharacterImages } from "../api/characterApi"; // API çağrısı
import CustomActivityIndicator from "../components/CustomActivityIndicator";

interface ImageSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  visible,
  onClose,
  onSelectImage,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Karakter resimlerini API'den çeken fonksiyon
  const fetchImages = async () => {
    try {
      const characterImages = await getCharacterImages();
      setImages(characterImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal açıldığında resimleri yükleme
  useEffect(() => {
    if (visible) {
      fetchImages();
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        {/* Modal kapatma ikonu */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-12 right-10 z-10"
        >
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* İçerik */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl font-bold mb-4">Select a Profile Photo</Text>

          {loading ? (
            <CustomActivityIndicator />
          ) : (
            <FlatList
              data={images}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectImage(item); // Seçilen resmi profile atıyoruz
                    onClose(); // Modalı kapatıyoruz
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    className="w-24 h-24 m-2 rounded-full"
                  />
                </TouchableOpacity>
              )}
              numColumns={3}
              contentContainerStyle={{ alignItems: "center" }}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageSelector;
