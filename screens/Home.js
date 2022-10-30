import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';

const Home = () => {

  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  
  console.log(fontsLoaded);

  if(!fontsLoaded){
    return <Text>Loading...</Text>
  }

  return (
    <LinearGradient colors={["#00C9FF", "#92FE9D"]} style={styles.container}>
      <Text style={styles.logo}>PaperFree</Text>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "900",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: "Lobster_400Regular",
  },
});

export default Home;
