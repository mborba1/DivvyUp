import React, { useContext, useEffect, useState } from 'react';

//React Native Navigation will not work in Expo managed workflow apps https://docs.expo.dev/guides/routing-and-navigation/#alternatives
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import { auth } from '../config/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';


//firebase auth provides a listener called onAuthStateChanged that listens for changes to an user's logged-in state
//it subscribes to an user's current authenticated state and receives an event whenever that state changes
//this listener to be located at the top of our navigator
export default function RootNavigator() {

  //useContext to get/set current value of user
  //useContext hook will trigger re-render whenever the value of user changes from the AuthenticatedUserContext
  const { user, setUser } = useContext(AuthenticatedUserContext);

  //state when an user's authenticated state is being checked
  const [isLoading, setIsLoading] = useState(true);

  //onAuthStateChanged listener will trigger insde useEffect hook 
  //returns an unsubscriber function that allows the app to stop listening for events whenever the hook is no longer in use
  useEffect(() => {

    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  //if user status is being checked, isLoading is true, and it will render activityIndicator (spinner)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  //wrap whole app in NavigationContainer, which manages our navigation tree and contains the navigation state
  //must wrap all navigators structure and render at root of our app, BUT in our case, we still need to wrap user state around this because user must be logged in first before accessing
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}