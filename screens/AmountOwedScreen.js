import React, { useContext, useState } from 'react'
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  FlatList,
  Button
} from 'react-native'
import { Feather } from '@expo/vector-icons';

import Header from './header';

import { db } from '../config/firebase';
import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';

const AmountOwedScreen = ({ navigation, route }) => {
  const {user} = useContext(AuthenticatedUserContext)

  // console.log(route);
  const { id } = route.params;
  console.log(id);

  const [chargeesObj, setChargeesObj] = useState([]);
  
  const chargerId = user.uid;
  // console.log('what is chargerId', chargerId)

  const numPpl  = 4;
  let ppCharge;

  const getMostRecent = async () => {
    // Make the initial query
    const query = await db
    .collection('receipts')
    .doc(id)
    .get();

    const data = query.data();
    console.log('what is query data', data)

    const total = data.items.find(({description}) => description === 'TOTAL');
    ppCharge = (Number(total.price) / numPpl);
    console.log('what is per person charge', ppCharge);
    
    const chargees = new Array(numPpl).fill({'chargee': ppCharge});
    console.log('what is the chargee object', chargees);
    // console.log(data.charger);
    // console.log(data.createdAt);
    // console.log(data.items);
    console.log('what is chargeesObj in state', chargeesObj);
    //only setting the chargees right now, but will not be set until this function is complete
    setChargeesObj(chargees);
    // console.log('chargeesObj', chargeesObj);
  }

  // getMostRecent();

  console.log("what is chargeeObj in screen", chargeesObj);

  const updateChargees = async () => {
    await db
    .collection('receipts')
    .doc(id)
    .update({chargeesField: chargeesObj});
    // console.log('is chargees added', newData.data());
  }
  

  // updateChargees();

  const [amounts, setAmounts] = useState([
    {id: '1', price: '700'},
    {id: '2', price: '3400'},
    {id: '3', price: '1200'},
    {id: '4', price: '2250'},
    {id: '5', price: '1350'},
    {id: '6', price: '2280'},
  ]);

  return (
    <View style={styles.container}>

    <ImageBackground
      style={styles.img}
      source={require('../assets/divvyup-background.jpg')}
      resizeMode="cover">
        <View style={styles.header}>
        <Header />
        <Button title="add Chargees" onPress={() => getMostRecent()}/>
        <Button title="Add chargeesObj to receipt" onPress={() => updateChargees()}/>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={amounts}
          renderItem={({ item }) => (
          <Text style={styles.item}>Person {item.id} owes ${(item.price)/100}</Text>)}
        />
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <Feather name="home" size={40} color="rgb(243, 239, 236)" />
          </View>
        </View>
    </ImageBackground>
  </View>
  );
}

export default AmountOwedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    height: 60,
    paddingTop: 112,
    padding: 38,
  },
  item:{
    width: 322,
    height: 29,
    backgroundColor: '#f8f7f6',
    overflow: 'visible',
    marginTop: 16,
    marginLeft: 34,
    marginRight: 34,
  },
  iconContainer: {
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 50,
  },
  footer: {
    width: 390,
    height: 151,
    backgroundColor: '#2d3142',
    overflow: 'hidden',
    borderRadius: 34,
  }, 
})