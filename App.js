//GOOGLE AUTH TUTORIAL---------------------------------
//moved Anj's home screen into HomeStack.js in navigation

import React from 'react';
import Routes from './navigation/index';

export default function App() {
  return <Routes />;
}



// // NOTE TO SELF--ORIGINAL CODE: DO NOT TOUCH UNTIL EVERYTHING'S REFACTORED---------------------------------
// // AN Note: Using React Navigation to navigate through our app.
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import React from 'react';
// import Receipt from './screens/receipt.js';
// import Home from './screens/home.js';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Receipt" component={Receipt} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;