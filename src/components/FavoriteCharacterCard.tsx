import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // NativeWind ile stiller

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface FavoriteCharacterCardProps {
  character: { id: number; name: string; image: string };
  onPress: () => void;
}

const FavoriteCharacterCard: React.FC<FavoriteCharacterCardProps> = ({
  character,
  onPress,
}) => {
  return (
    <StyledTouchableOpacity className="mr-4 items-center" onPress={onPress}>
      <Image
        source={{ uri: character.image }}
        className="w-24 h-24 rounded-full border-2 border-yellow-400"
      />
      <StyledText
        className="text-center mt-2 text-green-400"
        style={{ fontFamily: "GetSchwifty-Regular" }}
      >
        {character.name}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default FavoriteCharacterCard;
