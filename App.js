// //CURRENTLY INTEGRATING GOOGLE AUTH CONTEXT/SCREENS
// // AN Note: Using React Navigation to navigate through our app.
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import React from 'react';
// import Receipt from './screens/receipt.js';
// import Home from './screens/home.js';
// import HomeScreen from './screens/HomeScreen.js';

// import { AuthenticatedUserProvider } from './navigation/AuthenticatedUserProvider.js';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <AuthenticatedUserProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="HomeScreen" component={HomeScreen} />
//           {/* <Stack.Screen name="Home" component={Home} /> */}
//           <Stack.Screen name="Receipt" component={Receipt} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthenticatedUserProvider>
//   );
// };

// export default App;


//GOOGLE AUTH TUTORIAL---------------------------------

import React from 'react';

import Routes from './navigation/index';

export default function App() {
  return <Routes />;
}



// // NOTE TO SELF--ORIGINAL CODE: DO NOT TOUCH---------------------------------
// // AN Note: Using React Navigation to navigate through our app.
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import React from 'react';
// import Receipt from './screens/receipt.js';
// import Home from './screens/home.js';
// import HomeScreen from './screens/HomeScreen.js';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//         {/* <Stack.Screen name="Home" component={Home} /> */}
//         <Stack.Screen name="Receipt" component={Receipt} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;