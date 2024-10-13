import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styled } from "nativewind"; // For using NativeWind
import { useCustomFonts } from "../hooks/useCustomFonts"; // Font hook

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: string;
}

const StyledButton = styled(TouchableOpacity);
const StyledText = styled(Text);

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  const fontsLoaded = useCustomFonts(); // Load fonts

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded
  }

  return (
    <StyledButton
      className={`bg-green-500 p-4 rounded-full shadow-lg ${style}`} // Set button style, add shadow and green tones
      onPress={onPress}
    >
      <StyledText
        className="text-gray-800 text-xl font-bold text-center" // Adjust text style
        style={{ fontFamily: "GetSchwifty-Regular" }} // Add font
      >
        {title}
      </StyledText>
    </StyledButton>
  );
};

export default CustomButton;
