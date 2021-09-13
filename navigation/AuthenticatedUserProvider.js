import React, { useState, createContext } from 'react';

//using the React Context API, we can share data that is considered global in our React app
//when creating a context, we must pass a default value and this value is used when a component has a matching Provider
export const AuthenticatedUserContext = createContext({}); //this is the context itself being created, not what provides the context, the Provider provides the context for its children components

//The Provider allows the React components to subscribe to the context changes, and we wrap the context around all other components
//Here, our context is dependent on user auth/logged-in status
//Define user as our state variable, if user === null, no auth, so not logged in
export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  //states created here is what is being shared with other components

  // .Provider comes with the context API, and use this to wrap around components so the data can be used in those children comonents
  // value property will take in whatever data we want to provide to the children components
  // for value property, we want to provide an object that contains whatever properties we have in state
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
      {/* {in class component, children will be this.props.children} */}
    </AuthenticatedUserContext.Provider>
  );
};