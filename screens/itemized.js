import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {receiptParser} from '../utilities/receiptParser';

const Itemized = () => {
  const {img, container, text} = styles;
  return (
    <View style={container}>
      <ImageBackground
        style={img}
        source={require('../assets/divvyup-background.jpg')}
        resizeMode="cover">
        <Text style={text}>Test</Text>
      </ImageBackground>
    </View>
  );
};

export default Itemized;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  button: {
    width: '100%',
    height: '40%',
    color: 'white',
    backgroundColor: 'black',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
  },
});
