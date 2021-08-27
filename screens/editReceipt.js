import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  ScrollView,
  FlatList,
  TextInput
} from 'react-native';

 import firebase from '../config/firebase'
 const firestore = firebase.firestore();
import { auth } from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';


export default EditReceipt = ({ route }) => {
 
  const {img, text, button, container} = styles;
  const { user } = useContext(AuthenticatedUserContext) 
  const [receipt, setReceipt] = useState(route.params.receipt)

  function submitReceipt(){
   return (
       firestore.collection('receipts')
       .add({...receipt, charger: `${user.uid}`})
   )        
  }

  function updateItemPrice(item, newPrice){
    const items = receipt.items
    const index = items.indexOf(item)
    item.price = newPrice
    setReceipt({...receipt, items: items, charger: `${user.uid}`})
  }
  
  function listItems(){
      return (
          <View  style={styles.list} >
              <View style={styles.header}>
                      <Text style={styles.textHeader} >ITEMS </Text>
                      <Text style={styles.textHeader} >PRICE</Text>
              </View> 
            <FlatList
              data={receipt.items}
              renderItem={({item}) => { 
                return (
                  <View
                  style={styles.listItem} 
                  key={item.key}>
                      <Text style={styles.text}>{item.description}</Text>
                      <TextInput 
                      style={styles.textInput} 
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
              <ScrollView style={styles.container}>
                  {listItems()}
              </ScrollView> 
          </ImageBackground>
          <Button style={styles.button} title="Submit" onPress={submitReceipt}/>
        </View>
    );
  }
};




const styles = StyleSheet.create({

  img: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
  },  
  list: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end'
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    color: 'white',
    padding: 5,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    color: 'white',
    padding: 5,
  },
  textInput: {
    paddingHorizontal: 2,
    marginHorizontal: 10, 
    width: 55, 
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderRadius: 5,
  },
  button: {
    width: '50%',
    height: '40%',
    color: 'white',
    fontFamily: 'Lato_400Regular',
    backgroundColor: 'black',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    padding: 30,
    margin: 5,
    borderRadius: 10,
  }
});
