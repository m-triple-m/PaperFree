import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Card, IconButton } from "react-native-paper";

const Home = () => {
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  const menuCate = [
    {
      title: "Fast Food",
      image: "https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=675%2Cmetadata=none%2Conerror=redirect%2Cq=85%2Cwidth=1200/wp-content/uploads/national-fast-food-day.jpg",
    },
    {
      title: "Main Course",
      image: "https://www.stockimagefactory.com/StockImageFactory.com-photo-ID(0000138344)indian-lunch-dinner-main-course-food-in-group.jpg",
    },
    {
      title: "Dessert",
      image: "https://images.squarespace-cdn.com/content/v1/518ea9e4e4b0eb1ecff22776/1477501506828-IBRKO456RZZ3DD3DHA7E/image-asset.jpeg",
    },
    {
      title: "Drinks",
      image: "https://www.ballantines.com/wp-content/uploads/2020/11/ballantines-drinks-finest-cola.jpg",
    },
  ];

  console.log(fontsLoaded);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        // barStyle={'light'}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Paper Free</Text> */}

      {/* <IconButton icon="cart" /> */}
      {/* </View> */}
      <LinearGradient style={styles.body} colors={["#00C9FF", "#92FE9D"]}>
        <ImageBackground
          source={{ uri: "https://wallpaperaccess.com/full/767033.jpg" }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
          style={styles.heroCard}
        >
          <View
            style={{
              backgroundColor: "#00000075",
              flex: 1,
              borderRadius: 20,
              justifyContent: "center",
            }}
          >
            <Text style={styles.heroText}>PaperFree</Text>
            <Text style={styles.heroDesc}>Paperless Food Ordering</Text>
          </View>
        </ImageBackground>

        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            marginVertical: 20,
            fontWeight: "bold",
          }}
        >
          Search Menu
        </Text>
          <View style={{paddingHorizontal: 30}}>
        {menuCate.map((cate, index) => (
          <ImageBackground
          key={index}
            source={{ uri: cate.image }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 10 }}
            style={styles.cateCard}
          >
            <View
              style={{
                backgroundColor: "#00000075",
                flex: 1,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.cateText}>{cate.title}</Text>
            </View>
          </ImageBackground>
        ))}
        </View>

        {/* <Text style={styles.categoryText}>Famous</Text> */}
        {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Image
            style={{ width: "45%", height: 150, borderRadius: 20 }}
            source={{ uri: "https://wallpaperaccess.com/full/767033.jpg" }}
          />
          <Image
            style={{ width: "45%", height: 150, borderRadius: 20 }}
            source={{ uri: "https://wallpaperaccess.com/full/767033.jpg" }}
          />
        </View> */}
      </LinearGradient>
      {/* <Text style={styles.logo}>PaperFree</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 10,
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
  header: {
    backgroundColor: "white",
    padding: 15,
  },
  headerTitle: {
    fontSize: 30,
  },
  heroCard: {
    height: 200,
    // flex: 1,
    // justifyContent: "center",
  },
  cateCard : {
    marginBottom : 20,
    height: 100,
  },
  heroText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  cateText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  heroDesc: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default Home;
