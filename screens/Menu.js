import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ListMenu from "./ListMenu";
import ViewDish from "./ViewDish";

const Menu = ({app}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListMenu"
        children={()=><ListMenu app={app}/>}
          options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View"
        children={()=><ViewDish app={app}/>}
          options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Menu;
