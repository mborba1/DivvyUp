//Google auth tutorial homescreen--wait to delete after whole navigation system is set up

import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '../components';

import { auth } from '../config/firebase';

import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

//import receipt/scanner functionalities into our home screen
import Receipt from './receipt';

//this screen will show user's email and their UID when the user has successfully signed up or logged in
export default function HomeScreen() {


  const { user } = useContext(AuthenticatedUserContext);

  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
       {/* <Receipt /> */}
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email}!</Text>
        <IconButton style={styles.logout}
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>
      <Text style={styles.text}>Your UID is: {user.uid} </Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e93b81',
    paddingTop: 50,
    // paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    // alignContent: 'center',
    paddingLeft: 70
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  },
  logout:{
    paddingRight: 100
  }
});