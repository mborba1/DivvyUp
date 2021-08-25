//Google auth tutorial homescreen--wait to delete after whole navigation system is set up

import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '../components';

import { auth } from '../config/firebase';

import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

//import receipt/scanner functionalities into our home screen, displayed below user info in return statement
import Receipt from './receipt';

//this screen is our main home screen
//this screen will show user's email and their UID when the user has successfully signed up or logged in
//signOut button/component allows user to log out of current account and return to login/signup screen
//Receipt/scanner component is imported into this homescreen and displayed beneath user info
export default function HomeScreen() {

  //AuthenticatedUserContext allows us to access user state so we can generate UID and email address
  //this will also allow us to access other info on user once other info is set-up
  const { user } = useContext(AuthenticatedUserContext);

  //this function is triggered once logout icon is pressed and will log out user
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