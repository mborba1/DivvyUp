import React, {useState} from 'react';
import Header from './header';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
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
  import {TextInput, Button} from 'react-native-paper';
  const dummyReceipt = {
    id: 1,
    items: [
      {
        id: 1,
        description: 'sushi roll',
        price: '700'
      },
      {
        id: 2,
        description: 'cheesecake',
        price: '3400'
      },
      {
        id: 3,
        description: 'hamburger',
        price: '1200'
      },
      {
        id: 4,
        description: 'carbonara',
        price: '2250'
      },
    ]
  }
const totalPrice =  7550
function evenlyItemizedScreen() {
    const {img, container, text, button, textInput} = styles;
    //settjing the initial state 
    const [numPeople, setNumPeople] = useState();
    console.log(totalPrice)
    //this was taken from Jo's code not sure if needed?
    const {total} = dummyReceipt;
    //Jo's code here
    const onEvenSplit = (num, totalPrice) => {
        const splitAmount = Number((totalPrice / num));
        console.log(splitAmount)
        return splitAmount;
      }
    //setting the the number of people 
    const clickHandler = () => {
        setNumPeople(numPeople)
    }
    //the evenly button takes numPeople set in state and calls the onEvenSplit function
    const evenlyButton = (numPeople) =>{
      console.log(numPeople)
        return (
        <Button color='#000029' onPress={(numPeople) => onEvenSplit(numPeople, totalPrice)}  mode='contained'>
          <Text>Evenly</Text>
        </Button>
        
        )
    }
    //this button has no function yet
    const itemizedButton = () =>{
        return(
        <Button color='#000029' onPress={clickHandler}  mode='contained'>
          <Text>Itemized</Text>
        </Button>
        )
    }
    return (
        <View style={container}>
        <ImageBackground
          style={img}
          source={require('../assets/divvyup-background.jpg')}
          resizeMode="cover">
         <Header />
            <View style={text}>
              <Text style={text}>Number of People:</Text>
            </View>
            <TextInput style={textInput} placeholder="enter number" onChangeText={evenlyButton}></TextInput>
            <View style={button} > 
                {evenlyButton()}
                {itemizedButton()}        
            </View>
        </ImageBackground>
      </View>
    );5
}

export default evenlyItemizedScreen;


const styles = StyleSheet.create({
    container: {
      flex:1, 
    },
    img: {
      flex: 1,
      justifyContent: 'center'
    },
    button: {
        marginBottom: 12,
        paddingVertical: 16,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        color: '#000029',
        marginBottom: 150
      },
    text: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'Lato_400Regular',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    textInput:{
        marginBottom: 10,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'Lato_400Regular',
      alignItems: 'center',
      justifyContent: 'center'
    },
  })