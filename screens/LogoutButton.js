import React, { useState} from 'react';
import {
  Alert,
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import { auth } from '../config/firebase';

export default function LogoutButton (props) {
  const logOut = () => {
    try {
      console.log('inside try block what is auth', auth);

      auth.signOut();
      console.log('Ive logged out');
      console.log('what is currentUser object?', auth.currentUser);

      auth.onAuthStateChanged(user => {
        if (!user) {
          Alert.alert("You've logged out!");
        } else {
          Alert.alert("You're still logged in!");
        }
      });

    } catch (error) {
      console.log(error.toString(error));
    }
  }
  return (
    <View style={styles.screen}>
      <Button 
        title="Log Out"
        onPress={logOut}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});