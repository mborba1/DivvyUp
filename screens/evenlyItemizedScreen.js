import React, {useState, useRef, useContext} from 'react';
import Header from './header';
import {db} from '../config/firebase';
import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';
import {TextInput, Button} from 'react-native-paper';

function evenlyItemizedScreen({route, navigation}) {
  const {img, container, text, button, textInput} = styles;
  const {user} = useContext(AuthenticatedUserContext);
  const {id} = route.params;

  const chargerId = user.uid;
  const getMostRecent = async () => {
    // Make the initial query
    const query = await db.collection('receipts').doc(id).get();

    const data = query.data();

    totalPrice = data.items.find(
      ({description}) =>
        description === 'total' ||
        description === 'TOTAL' ||
        description === 'Total',
    );
    let ppCharge = splitFunctionality();

    const chargees = new Array(Number(numPeople.current)).fill({
      name: 'chargee',
      amountOwed: ppCharge,
    });
    navigation.navigate('AmountOwed', {chargeesProp: chargees, id: id});
  };

  let totalPrice;

  const splitFunctionality = () => {
    numPeople.current = tempPeople;
    let split = totalPrice.price / numPeople.current;
    return split;
  };

  //setting the initial state
  const numPeople = useRef(0);
  const [tempPeople, setTempPeople] = useState(0);

  //function to set the temp number to the number of people
  const tempNumber = people => {
    setTempPeople(people);
  };

  const moveToAllocationScreen = async () => {
    //need to add additional functionality later
    const query = await db.collection('receipts').doc(id).get();
    const receiptDetail = query.data();
    numPeople.current = tempPeople;
    navigation.navigate('ItemizedSplit', {
      numPeople: numPeople.current,
      receiptDetail: receiptDetail,
    });
  };
  //the evenly button takes numPeople set in state and calls the splitFunctionaly function
  const evenlyButton = () => {
    return (
      <Button color="#000029" onPress={getMostRecent} mode="contained">
        <Text>Evenly</Text>
      </Button>
    );
  };
  //this button has no function yet
  const itemizedButton = () => {
    return (
      <Button color="#000029" onPress={moveToAllocationScreen} mode="contained">
        <Text>Itemized</Text>
      </Button>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <ImageBackground
          style={img}
          source={require('../assets/divvyup-background.jpg')}
          resizeMode="cover">
          <Header />
          <View style={text}>
            <Text style={text}>Number of People:</Text>
          </View>
          <TextInput
            style={textInput}
            placeholder="enter number"
            onChangeText={tempNumber}
            keyboardType="number-pad"></TextInput>
          <View style={button}>
            {evenlyButton()}
            {itemizedButton()}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
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
    marginBottom: 150,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
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
  textInput: {
    marginBottom: 10,
  },
});
