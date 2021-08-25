import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';  //pink homescreen from tutorial
import Home from '../screens/home';  //Anj's homescreen
import Receipt from '../screens/receipt'; //Anj's receipt

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='false'>
      {/* <Stack.Screen name='Home' component={HomeScreen} /> */}
      <Stack.Screen name="Receipt" component={Receipt} />
    </Stack.Navigator>
  );
}