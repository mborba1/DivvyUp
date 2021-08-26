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

//0. Import firebase for receipt collection: 
 import firebase from '../config/firebase'
 const firestore = firebase.firestore();
//1: Import authenticated user 
import { auth } from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';


//COMPONENT:
export default EditReceipt = ({ route }) => {
 
  const {img, text, button, container} = styles;
  const { user } = useContext(AuthenticatedUserContext) 
  const [receipt, setReceipt] = useState(route.params.receipt)
  // const receipt = route.params

  function submitReceipt(){
   return (
       firestore.collection('receipts')
       .add({receipt: {...receipt, charger: `${user.uid}`}})
   )        
  }

  function updateItemPrice(item, newPrice){
    const items = receipt.items
    const index = items.indexOf(item)
    item.price = newPrice
    console.log(items.indexOf(item), newPrice, item)
   // setReceipt({...receipt, items: item[index] })
    // console.log(receipt)
  }
  

  function listItems(){
      return (
          <View  style={{alignItems: 'flex-start'}} >
              <View style={{ flexDirection: 'row',  justifyContents: 'space-around'}}>
                      <Text style={{ margin: 5}} >ITEM</Text>
                      <Text style={{ margin: 5}} >PRICE</Text>
                  </View>
              <FlatList
              data={receipt.items}
              renderItem={({item}) => { 
                return (
                  <View
                  style={{ flexDirection: 'row'}} 
                  key={item.key}>
                      <Text style={{ margin: 5}} >{item.description}</Text>
                      <TextInput 
                      style={{ margin: 5, width:45, backgroundColor: '#fff'}} 
                      keyboardType='numeric'
                      defaultValue={item.price}
                      onChangeText={newPrice => updateItemPrice(item, newPrice)}/>
                  </View>
                )}}          
              />
          </View>
    )}

  if (!receipt) {
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
