import React, { useState, createContext } from 'react';

//using the React Context API, we can share data that is considered global in our React app
//when creating a context, we must pass a default value and this value is used when a component has a matching Provider
export const AuthenticatedUserContext = createContext({});

//The Provider allows the React components to subscribe to the context changes, and we wrap the context around all other components
//Here, our context is dependent on user auth/logged-in status
//Define user as our state variable, if user === null, no auth, so not logged in
export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};