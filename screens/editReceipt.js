import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  ListItem,
  FlatList,
  TextInput
} from 'react-native';

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

//0. Import firebase for receipt collection: 
 import firebase from '../config/firebase'
 const firestore = firebase.firestore();
//1: Import authenticated user 
import { auth } from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';


//COMPONENT:
export default EditReceipt = ({ route }) => {
 
  const {img, text, button, container} = styles;
  //2.Set user object. Set state (however, receipt in local state here will be the PARSED receipt) 
  const { user } = useContext(AuthenticatedUserContext) 
  //const [receipt, setReceipt] = useState({businessName: 'PIZZERIA', items:[{price: 15, description: 'pizza', quantity: 1},{price: 20, description: 'pasta',quantity: 1},{price: 12, description: 'wine',quantity: 2}]})
  const parsedData = route.params

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

  function submitReceipt(){
   return (
       firestore.collection('receipts')
       .add({receipt: {...receipt, charger: `${user.uid}`}})
   )        
  }

  function listItems(){
    // console.log('PARAM PASSED: ', parsedData)
      return (
          <View  style={{alignItems: 'center'}} >
            <Text>USER: {user.uid}</Text>
            <Text>PARAMS:</Text>
              {/* <FlatList
              data={receipt.items}
              renderItem={({item}) => { 
                return (
                  <View
                  style={{ flexDirection: 'row',  justifyContents: 'space-evenly'}} 
                  key={item.key}>
                      <Text style={{ margin: 5, fontSize: 24}} >{item.description}</Text>
                      <Text style={{ margin: 5, fontSize: 24}}>{item.price}</Text>
                      <TextInput style={{ margin: 5, fontSize: 24, backgroundColor: '#fff', justifyContents: 'space-evenly'}} placeholder='PRICE'/>
                  </View>
                )}}          
              /> */}
          </View>
    )}

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
            <View style={text}>
                {listItems()}
            </View>    
        </ImageBackground>
        <Button title="Submit" onPress={submitReceipt}/>
      </View>
    );
  }
};

// {
//   <Button
//   style={{marginBottom: 10}}
//   title="SHOW RECEIPT"
//   onPress={()=> {this.props.navigation.navigate('ConfirmReceipt')}}
// />
// }


const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'center',
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
    padding: 30,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
  },
});
