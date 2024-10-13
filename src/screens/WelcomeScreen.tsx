import React from "react";
import { Text, View, ImageBackground, SafeAreaView } from "react-native";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types/navigation"; // Import RootStackParamList type
import { NativeStackScreenProps } from "@react-navigation/native-stack"; // Import NativeStackScreenProps
import { useCustomFonts } from "../hooks/useCustomFonts"; // Hook to load custom fonts

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const fontsLoaded = useCustomFonts(); // Load fonts

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded
  }

  return (
    <ImageBackground
      source={require("../assets/welcome-bg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 50,
          paddingBottom: 30,
        }}
      >
        {/* Rick And Morty Title */}
        <Text
          style={{
            fontFamily: "GetSchwifty-Regular",
            color: "white",
            fontSize: 45,
            textAlign: "center",
            marginTop: 50,
          }}
        >
          Rick And Morty
        </Text>

        {/* Buton */}
        <View style={{ width: "80%", marginBottom: 20 }}>
          <CustomButton
            title="Get Started"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomeScreen;
