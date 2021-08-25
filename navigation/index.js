import React from 'react';

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import RootNavigator from './RootNavigator';

/**
 * Wrap all providers here
 */

export default function Routes() {
  
  //wrapping our navigator with authenticatedUserProvider, which checks whether the user is logged in and gives access to app if user is logged in
  //HomeScreen is only available if respective user object exists aka user is logged in

  //the Provider is going to allow the screen components to access the logged-in or logged-out state of an user in the application
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

//AUTH FLOW

//To create the auth flow, we need to know whether the user object exists

//User object existence conditionally renders 2 different stack navigators 
//    <HomeStack /> or <AuthStack />
//    <HomeStack /> for when user object exists and enters into HomeScreen
//    <AuthStack /> for when user object is null and enters into LoginScreen

//Conditional stack navigators are stored in one <RootNavigator /> that different providers can wrap around--think how App.js is entry point for enter app, <RootNavigator /> is entry point for all navigation

//To share data of user object existence, we use React Context API

//Value in context is used when a component has a matching Provider

//Procer then allows the components to subscribe to context changes, and that's why we wrap it around the whole app
