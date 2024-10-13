import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // NativeWind ile stiller

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface FavoriteLocationCardProps {
  location: { id: number; name: string; dimension: string };
  onPress: () => void;
}

const FavoriteLocationCard: React.FC<FavoriteLocationCardProps> = ({
  location,
  onPress,
}) => {
  return (
    <StyledTouchableOpacity className="mr-4 items-center" onPress={onPress}>
      <StyledText className="text-center font-semibold text-green-400">
        {location.name}
      </StyledText>
      <StyledText className="text-center text-gray-400">
        {location.dimension}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default FavoriteLocationCard;
