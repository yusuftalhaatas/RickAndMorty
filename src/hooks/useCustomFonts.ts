import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    "GetSchwifty-Regular": require("../assets/fonts/GetSchwifty-Regular.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setIsReady(true); // Fontlar yüklendiğinde durumu güncelle
    }
  }, [fontsLoaded]);

  return isReady;
};
