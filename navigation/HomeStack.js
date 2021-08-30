import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen'; //JW Welcome and Logout to User
import Receipt from '../screens/receipt'; //AN Camera Google Vision Component
import EditReceipt from '../screens/editReceipt'; //Jazz Edit Component
import Itemized from '../screens/itemized'; //AN Itemized Screen
import AmountOwedScreen from '../screens/AmountOwedScreen';
import evenlyItemizedScreen from '../screens/evenlyItemizedScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Receipt" component={Receipt} />
      <Stack.Screen name="EditReceipt" component={EditReceipt} />
      <Stack.Screen name="Itemized" component={Itemized} />
      <Stack.Screen name='AmountOwed' component={AmountOwedScreen} />
      <Stack.Screen name="SplitReceipt" component={evenlyItemizedScreen} />
    </Stack.Navigator>
  );
}