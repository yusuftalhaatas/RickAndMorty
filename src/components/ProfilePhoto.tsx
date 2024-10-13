import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styled } from "nativewind"; // NativeWind ile stiller

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ProfilePhotoProps {
  profileImage: string | null;
  onSelectImage: () => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  profileImage,
  onSelectImage,
}) => {
  return (
    <StyledTouchableOpacity onPress={onSelectImage}>
      {/* Profile picture with green flame effect */}
      <StyledView className="relative w-36 h-36 items-center justify-center">
        <StyledView className="absolute w-40 h-40 rounded-full border-4 border-green-400 animate-pulse" />
        <StyledView className="absolute w-44 h-44 rounded-full border-4 border-green-300 opacity-70 animate-ping" />
        <StyledView className="bg-green-500 rounded-full w-32 h-32 items-center justify-center relative border-4 border-blue-500 z-10">
          {/* Show profile picture if exists, otherwise show person icon */}
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              className="w-32 h-32 rounded-full"
            />
          ) : (
            <Icon name="person" size={64} color="white" />
          )}
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default ProfilePhoto;
