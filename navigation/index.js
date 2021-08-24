import React from 'react';

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import RootNavigator from './RootNavigator';

/**
 * Wrap all providers here
 */

export default function Routes() {
  
  //wrapping our navigator with authenticatedUserProvider, which checks whether the user is logged in and gives access to app if user is logged in
  //HomeScreen is only available if respective user object exists === user is logged in

  //the Provider is going to allow the screen components to access the logged-in or logged-out state of an user in the application
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}