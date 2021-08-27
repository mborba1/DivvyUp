// AN Creating Header to be imported whereever needed.
// Import React from React
import React from 'react';
// Importing items needed from React Native
import {StyleSheet, Text, View} from 'react-native';
// Importing agreed upon font
import {useFonts, Lato_300Light} from '@expo-google-fonts/lato';

// Creating a functional component for header
const Header = () => {
  let {header, text} = styles;
  let [fontsLoaded] = useFonts({
    Lato_300Light,
  });

  // If the header font isn't loaded, display text saying header loaded.
  // If fonts are loaded, display the header.
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Header Loading</Text>
      </View>
    );
  } else {
  }
  return (
    <View style={header}>
      <Text style={text}>DIVVY/UP</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 5,
    flex: 1,
  },
  text: {
    fontSize: 65,
    fontFamily: 'Lato_300Light',
    textAlign: 'center',
    color: 'white',
  },
});
