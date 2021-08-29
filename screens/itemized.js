// AN Note: Import React from React.
import React, {useContext, useState} from 'react';
// Importing items from react native to be used in my screen.
import {StyleSheet, Text, View, ScrollView} from 'react-native';
// Importing my receipt parser function to use when someone navigates to this page.
import {receiptParser} from '../utilities/receiptParser';
// Importing react native paper elements to be used for styling.
import {DataTable, Button} from 'react-native-paper';
// Importing firebase per Jazmin's code on sending back the finalized receipt.
import firebase from '../config/firebase';
// Initiating firestore?  Ask Jazmin for clarity/should we do this in a separate file/move to config?
const firestore = firebase.firestore();
// Per Jazz, importing authenticated user and authenticated user context.
import {auth} from '../config/firebase';
import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';

const Itemized = ({route, navigation}) => {
  const {container, bottom} = styles;
  const {receiptData} = route.params;
  // This is my parsed receipt.
  let parsedData = receiptParser(receiptData.responses);
  // Per Jazz, setting user object.
  const {user} = useContext(AuthenticatedUserContext)
    ? useContext(AuthenticatedUserContext)
    : 'NO USER!';
  // Here I'm using useState, changing the names of my items to the same naming convention as Jazz.
  const [receipt, setReceipt] = useState(parsedData);

  // console.log(receipt);
  const [receiptId, setReceiptId] = useState('');

  //   This will display the items on the screen if receiptdata was properly parsed.
  const displayItemized = () => {
    if (receiptData === null) {
      return null;
    } else {
      return (
        <View>
          {parsedData.map((itemObject, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{itemObject.words.join(' ')}</DataTable.Cell>
              <DataTable.Cell numeric>{itemObject.price}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </View>
      );
    }
  };

   // TEMP amountOwed button to see screen, will remove after
   const amountButton = () => {
    return (
      <Button onPress={() => navigation.navigate('AmountOwed', {id: receiptId})} mode="contained">
        <Text>Amount Owed</Text>
      </Button>
    );
  };

  // AN's Accept Button
  const acceptButton = () => {
    return (
      <Button onPress={() => acceptButtonFunctionality()} mode="contained">
        <Text>Accept</Text>
      </Button>
    );
  };
  // AN's Edit Button
  const editButton = () => {
    return (
      <Button onPress={() => editButtonFunctionality()} mode="contained">
        <Text>Edit</Text>
      </Button>
    );
  };

  // Integrating Jazz's function to send the receipt back to the firestore.
  const submitReceipt = async () => {
    const submittedReceipt = await firestore
    .collection('receipts')
    .add({
      ...receipt,
      charger: `${user.uid}`,
      createdAt : firebase.firestore.FieldValue.serverTimestamp()
    });
    // return firestore
    //   .collection('receipts')
    //   .add({receipt: {...receipt, charger: `${user.uid}`}});
    setReceiptId(submittedReceipt.id);
    console.log(receiptId);
  }

  //   AN's function to massage parsed receipt data in a form that Jazz is expecting.  However, I have no business name.
  //   After parsedReceipt is massaged into a form Jazz is expecting, send it to db.
  const convertDataToCleanObjectAndSubmitToFirestore = () => {
    let cleanReceipt = {};
    let items = [];
    parsedData.forEach(itemObject => {
      let obj = {};
      let description = itemObject.words.join(' ');
      obj.description = description;
      obj.price = itemObject.price;
      items.push(obj);
    });
    cleanReceipt.items = items;
    // AN set receipt state to clean receipt.
    setReceipt(cleanReceipt);
    // Submit clean receipt to firestore with Jazz's function.
    submitReceipt();
  };

  const acceptButtonFunctionality = () => {
    convertDataToCleanObjectAndSubmitToFirestore();
    // Need to add navigation to Margareth's screen here.
  };

  const editButtonFunctionality = () => {
    // convertDataToCleanObjectAndSubmitToFirestore();
    // Need to add navigation to Jazz's edit screen here.
  };

  //   AN: This is what will be displayed on the screen.  Using react native paper because it's cute.
  return (
    <View style={container}>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Item/Meal</DataTable.Title>
            <DataTable.Title numeric>Cost</DataTable.Title>
          </DataTable.Header>
        </DataTable>
        {displayItemized()}
        <View style={bottom}>
          {acceptButton()}
          {editButton()}
          {amountButton()}
        </View>
      </ScrollView>
    </View>
  );
};

export default Itemized;

// AN Basic Styling - will be updated eventually.
const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
