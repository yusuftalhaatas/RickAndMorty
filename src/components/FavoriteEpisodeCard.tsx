import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // NativeWind ile stiller

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface FavoriteEpisodeCardProps {
  episode: { id: number; name: string; episode: string };
  onPress: () => void;
}

const FavoriteEpisodeCard: React.FC<FavoriteEpisodeCardProps> = ({
  episode,
  onPress,
}) => {
  return (
    <StyledTouchableOpacity className="mr-4 items-center" onPress={onPress}>
      <StyledText className="text-center font-semibold text-green-400">
        {episode.name}
      </StyledText>
      <StyledText className="text-center text-gray-400">
        {episode.episode}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default FavoriteEpisodeCard;
