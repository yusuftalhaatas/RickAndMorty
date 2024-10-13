import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { useCustomFonts } from "../hooks/useCustomFonts"; // Özel fontları yükleyen hook

const StyledView = styled(View);
const StyledText = styled(Text);

const NotFound = () => {
  const fontsLoaded = useCustomFonts(); // Fontların yüklendiğini kontrol ediyoruz

  if (!fontsLoaded) {
    return null; // Eğer fontlar yüklenmediyse boş dönüyoruz
  }

  return (
    <StyledView className="items-center my-4">
      <Image
        source={require("../assets/not-found.gif")} // Relative path to the GIF
        style={{ width: 250, height: 250 }}
      />
      <StyledText
        className="text-4xl text-red-600 font-bold mt-4"
        style={{ fontFamily: "GetSchwifty-Regular" }}
      >
        Not Found
      </StyledText>
    </StyledView>
  );
};

export default NotFound;
