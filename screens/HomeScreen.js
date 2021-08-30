//Google auth tutorial homescreen

import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {IconButton} from '../components';

import {auth} from '../config/firebase';

import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';

import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';

//this screen will be integrated with our camera/googlevision receipt component.
//this screen will show user's email and their UID when the user has successfully signed up or logged in
//signOut button/component allows user to log out of current account and return to login/signup screen
//Receipt/scanner component is imported into this homescreen and displayed beneath user info
export default function HomeScreen() {
  //AuthenticatedUserContext allows us to access user state so we can generate UID and email address
  //this will also allow us to access other info on user once other info is set-up
  const {user} = useContext(AuthenticatedUserContext);

  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  const {text, container, emailAndLogoutPosition, logout} = styles;
  const {email} = user;

  //this function is triggered once logout icon is pressed and will log out user
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
  }
  return (
    <View style={container}>
      <StatusBar style="dark-content" />
      <View style={emailAndLogoutPosition}>
        <Text style={text}>
          User: {email}
          <Text>
            {'  '}
            <IconButton
              name="logout"
              size={16}
              color="#fff"
              onPress={handleSignOut}
            />
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emailAndLogoutPosition: {
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Lato_400Regular',
    alignSelf: 'center',
  },
});
