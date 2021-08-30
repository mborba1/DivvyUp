import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  ViewStyle,
  TouchableOpacity
} from 'react-native';
import Button from '../components/Button'
import { TextInputMask } from 'react-native-masked-text'
import { auth } from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import firebase from '../config/firebase'
const firestore = firebase.firestore();


export default EditReceipt = ({ route }) => {
  const {img, text, button, container} = styles;
  const { user } = useContext(AuthenticatedUserContext) 
  const [receipt, setReceipt] = useState(route.params.receipt)

  function submitReceipt(){
   return (
       firestore.collection('receipts')
       .add({receipt: {...receipt, charger: `${user.uid}`}})
   )        
  }

  function updateItemPrice(item, newPrice){
    const items = receipt.items
    item.price = newPrice
    setReceipt({...receipt, items: items, charger: `${user.uid}`})
  }
  
  function listItems(){
      return (
          <View  style={styles.list} >
            <FlatList
              ListHeaderComponent={()=><Text style={styles.textHeader} >ITEM</Text>}
              ItemSeparatorComponent={() =><View style={styles.separator} />}
              data={receipt.items}
              renderItem={({item}) => { 
                return (
                  <View
                  style={styles.listItem} 
                  key={item.key}>
                      <Text style={styles.text}>{item.description}</Text>
                  </View>
                )}}           
            />
            <FlatList
             ListHeaderComponent={()=><Text style={styles.textHeader}>PRICE</Text>}
             ItemSeparatorComponent={() =><View style={styles.separator} />}
              data={receipt.items}
              renderItem={({item}) => { 
                return (
                  <View
                  style={styles.listItem} 
                  key={item.key}>
                      <TextInputMask
                      style={styles.textInput} 
                      type={'money'}
                      options={{
                        separator: '.',
                        delimiter: ',',
                        unit: null
                      }}
                      value={item.price}
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
        <View style={styles.container}>
          <ImageBackground
            style={img}
            source={require('../assets/divvyup-background.jpg')}
            resizeMode="cover">
              <View style={styles.container}>
                  {listItems()}
                  <Button style={styles.button} title="Submit" onPress={submitReceipt}/>
              </View> 
          </ImageBackground>
        </View>
    );
  }
};


const styles = StyleSheet.create({

  img: {
    flex: 1,
    justifyContent: 'space-around'
  },
  container: {
    flex: 1, 
    flexDirection: 'column'
  },  
  list: {
    marginTop: 60,
    flexDirection: 'row',
    padding: 25
  },
  listItem: {
    padding: 10,
    height: 50,
    justifyContent: 'flex-end'
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    color: 'white',
    padding: 5,
  },
  textHeader: {
    fontSize: 27,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    color: 'white',
    padding: 5,
    marginBottom: 5,
  },
  textInput: {
    paddingHorizontal: 2,
    textAlign: 'center',
    marginHorizontal: 10, 
    width: 60, 
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  button: {
    width: '10',
    height: '40',
    color: 'white',
    fontFamily: 'Lato_400Regular',
    fontSize: 2,
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    borderRadius: 10,
  }, 
  separator: {
    height: 1, 
    width: "100%",
    backgroundColor: "#CEDCCE",
  }
});
