import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from '@expo-google-fonts/lato';

const Header = () => {
  let {header, text} = styles;
  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

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
    height: 60,
    padding: 15,
    flex: 1,
  },
  text: {
    fontSize: 65,
    fontFamily: 'Lato_300Light',
    textAlign: 'center',
    color: 'white',
  },
});
