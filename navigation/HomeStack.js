import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen'; //pink homescreen from tutorial
import Home from '../screens/home'; //Anj's homescreen
import Receipt from '../screens/receipt'; //Anj's receipt
import EditReceipt from '../screens/editReceipt'
import Itemized from '../screens/itemized'; //AN Itemized Screen

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Receipt" component={Receipt} />
      <Stack.Screen name="EditReceipt" component={EditReceipt} /> 
      <Stack.Screen name="Itemized" component={Itemized} />
    </Stack.Navigator>
  );
}
