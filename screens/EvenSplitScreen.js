import React from 'react';
import { Button as RNButton, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
  ],
  total: 7550,
};

//this will be queried from the inputField
const numPeople = 8;

export default function EvenSplitButton(){
  // console.log(dummyReceipt.total);

  const {total} = dummyReceipt;

  const onEvenSplit = (num, totalPrice) => {
    const splitAmount = (totalPrice / num);
    // console.log(splitAmount)
    return splitAmount;
  }

  return (
    <View>
    <TouchableOpacity onPress={() => console.log(onEvenSplit(numPeople, total))}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Evenly Split</Text>
      </View>
    </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  }
})
