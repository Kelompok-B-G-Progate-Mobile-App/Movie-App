/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './src/navigations/BottomTabNavigation';

export default function App():JSX.Element {
  return (
  <NavigationContainer>
    <BottomTabNavigation/>
  </NavigationContainer>
  );
}