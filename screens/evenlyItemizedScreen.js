import React, {useState, useRef, useContext} from 'react';
import Header from './header';
import { db } from '../config/firebase';
import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';
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
 
// const totalPrice =  7550

function evenlyItemizedScreen({navigation, route}) {
    const {img, container, text, button, textInput} = styles;
    const {user} = useContext(AuthenticatedUserContext);
    const { id } = route.params;
    console.log(id)
    const chargerId = user.uid;

    const [chargeesObj, setChargeesObj] = useState([]);
    const getMostRecent = async () => {
      // Make the initial query
      const query = await db
      .collection('receipts')
      .doc(id)
      .get();

    
      const data = query.data();
      console.log(data)

      totalPrice = data.items.find(({description}) => description === 'Total');
      console.log(totalPrice)
      let ppCharge =  splitFunctionality()
      
      const chargees = new Array(numPeople).fill({name: 'chargee', amountOwed: ppCharge});
      console.log('what is the chargee object', chargees);
      setChargeesObj(chargees)

      
    }
    let totalPrice
    console.log('What is chargeesObj in state', chargeesObj)
    // const updateChargees = async () => {
    //   getMostRecent()
    //   await db
    //   .collection('receipts')
    //   .doc(id)
    //   .update({chargeesField: chargeesObj});
    //   // console.log('is chargees added', newData.data());

    // }
    const splitFunctionality = () => {
      numPeople.current = tempPeople;
      let split = totalPrice.price / numPeople.current;
      return split;
    }

    //setting the initial state 
    const numPeople = useRef(0)
    const [tempPeople, setTempPeople] = useState(0);
    
    //this is the split function
    
    //function to set the temp number to the number of people
    const tempNumber = people => {
      setTempPeople(people); 
    }
  
    const clickHandler = () => {
        //need to add additional functionality later
    }
    //the evenly button takes numPeople set in state and calls the splitFunctionaly function
    const evenlyButton = () =>{
      
        return (
        <Button color='#000029' onPress={() => getMostRecent()}  mode='contained'>
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
            <TextInput style={textInput} placeholder="enter number" onChangeText={tempNumber}></TextInput>
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
    button: {
      marginBottom: 12,
      paddingVertical: 16,
      paddingHorizontal: 40,
      justifyContent: 'space-between',
      flexDirection: 'row',
      color: '#000029',
      marginBottom: 150
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'Lato_400Regular',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex:1, 
    },
    img: {
      flex: 1,
      justifyContent: 'center'
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
    }  
  })