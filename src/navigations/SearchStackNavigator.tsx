import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CategorySearch from '../screens/CategorySearchResult';
import CategorySearchResult from '../screens/CategorySearchResult';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator()

function SearchStackNavigation(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="CategorySearch"
                component={CategorySearch}
            />
            <Stack.Screen
                name="CategorySearchResult"
                component={CategorySearchResult}
                options={{
                    headerShown: true,
                    headerTitle: 'Category Search Result',
                    headerBackTitle: 'Back',
                }}
            />
        </Stack.Navigator>
    );
}

export default SearchStackNavigation;
