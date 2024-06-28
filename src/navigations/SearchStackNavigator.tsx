import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CategorySearch from '../screens/CategorySearchResult';
import CategorySearchResult from '../screens/CategorySearchResult';
import Search from '../screens/Search';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

function SearchStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CategorySearch" component={CategorySearch} />
      <Stack.Screen
        name="CategorySearchResult"
        component={CategorySearchResult}
        options={{
          headerShown: true,
          headerTitle: 'Category Search Result',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

export default SearchStackNavigation;
