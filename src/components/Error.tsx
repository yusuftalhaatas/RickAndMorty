import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { useCustomFonts } from "../hooks/useCustomFonts"; // Hook to load custom fonts

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ErrorProps {
  message?: string; // Optional error message, default message will be used if not provided
  onRetry?: () => void; // Function for the retry button
}

const Error: React.FC<ErrorProps> = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  const fontsLoaded = useCustomFonts(); // Check if fonts are loaded

  if (!fontsLoaded) {
    return (
      <StyledView className="items-center justify-center my-4">
        {/* Fallback text if fonts are not loaded */}
        <StyledText className="text-2xl text-red-600 font-bold mt-4 text-center">
          {message}
        </StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="items-center my-4 justify-center">
      {/* Error image */}
      <Image
        source={require("../assets/rickandmorty-error.png")}
        style={{ width: 400, height: 400 }} // Image size
        resizeMode="contain" // Scale the image to fit the size
      />
      {/* Error message */}
      <StyledText
        className="text-4xl text-red-600 font-bold mt-4 text-center"
        style={{ fontFamily: "GetSchwifty-Regular" }} // Use custom font
      >
        {message}
      </StyledText>

      {/* Retry button, if onRetry function is provided */}
      {onRetry && (
        <StyledTouchableOpacity
          onPress={onRetry}
          className="bg-red-600 p-3 mt-6 rounded-lg"
        >
          <StyledText className="text-white text-lg">Retry</StyledText>
        </StyledTouchableOpacity>
      )}
    </StyledView>
  );
};

export default Error;
