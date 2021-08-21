// AN Note: Creating Home Page.  Maybe this can be converted to a log-in page?
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
// I imported a ton of Lato fonts to play around with.
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

const Home = ({navigation}) => {
  const {img, text, button, container} = styles;
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
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={container}>
        <ImageBackground
          style={img}
          source={require('../assets/divvyup-background.jpg')}
          resizeMode="cover">
          <View>
            <Text style={text}>DIVVY/UP</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Receipt')}>
              <Text style={button}>Access Application</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 65,
    fontFamily: 'Lato_300Light',
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: '40%',
    color: 'white',
    fontFamily: 'Lato_400Regular',
    backgroundColor: 'black',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
  },
});
