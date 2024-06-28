import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MovieDetail from "../screens/MovieDetail";
import Favorite from "../screens/Favorite";

const Stack = createNativeStackNavigator();

function FavoriteStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="FavoriteScreen">
      <Stack.Screen
        name="FavoriteScreen"
        component={Favorite}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

export default FavoriteStackNavigation;
