import { Image } from "react-native";
import React from "react";

// CustomActivityIndicator component to display a loading indicator
const CustomActivityIndicator = () => {
  return (
    <Image
      // Source of the loading indicator GIF
      source={require("../assets/searching-indicator.gif")} // Relative path to the GIF
      // Styling for the loading indicator
      style={{ width: 200, height: 200 }}
    />
  );
};

export default CustomActivityIndicator;
