import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import ListMenu from './screens/ListMenu';
import Menu from './screens/Menu';
import CurrentOrder from './screens/CurrentOrder';
import { useState } from 'react';



export default function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyCpjPJCT-bO49GkuQq982fVp3Ju0sm5prM",
    authDomain: "native-9ba01.firebaseapp.com",
    projectId: "native-9ba01",
    storageBucket: "native-9ba01.appspot.com",
    messagingSenderId: "140174126073",
    appId: "1:140174126073:web:f79e36a08b365da9572b28",
    measurementId: "G-6W3KPL713D",
  };
  const app = initializeApp(firebaseConfig);
  const Tab = createBottomTabNavigator();

  

  return (
    <View style={styles.container}>
      
      <NavigationContainer style={styles.container} >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = focused ? 25 : 20;
            if (route.name === "Profile") {
              iconName = focused ? "user-circle" : "user-circle-o";
            } else if (route.name === "ListMenu") {
              iconName = focused ? "list-alt" : "list-alt";
            } else if (route.name === "Home") {
              iconName = focused ? "address-book" : "address-book-o";
            }else if (route.name === "ListPost") {
              iconName = focused ? "post" : "post-outline";
            }
    
            // You can return any component that you like here!
            return <FontIcon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" children={()=><Home app={app}/>} />
        <Tab.Screen name="ListMenu" children={()=><ListMenu app={app}/>} options={{
          headerShown: false,
        }} />
        {/* <Tab.Screen name="Profile" component={Profile} /> */}
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
