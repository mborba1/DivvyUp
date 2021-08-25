import React from 'react';
import { Button as RNButton, StyleSheet, Text, View } from 'react-native';

import { Button, InputField, IconButton, ErrorMessage } from '../components';

const dummyReceipt = {
  id: 1,
  items: [
    {
      id: 1,
      description: 'sushi roll',
      price: '700'
    },
    {
      id: 2,
      description: 'cheesecake',
      price: '3400'
    },
    {
      id: 3,
      description: 'hamburger',
      price: '1200'
    },
    {
      id: 4,
      description: 'carbonara',
      price: '2250'
    },
  ]
}

const evenSplit = () => {


  return (
    <View>
      <Text>Split Evently</Text>
    </View>
  )
}

export default evenSplit;

