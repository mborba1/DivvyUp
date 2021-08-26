import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useEffect,
  useState,
} from 'react-native';
import {receiptParser} from '../utilities/receiptParser';
import {DataTable, Button} from 'react-native-paper';

//0.a. Import: firebase for saving receipt to store collection:
import firebase from '../config/firebase'
const firestore = firebase.firestore();
//0.b: Import: authenticated user to make associate/reference to receipt: 
import { auth } from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const Itemized = ({route, navigation}) => {
  const {container, bottom} = styles;
  const {receiptData} = route.params;
  let stringifiedReceiptData = JSON.stringify(receiptData.responses);
  let parsedData = receiptParser(receiptData.responses);
  let string = JSON.stringify(parsedData);

//1.a. Initialize current user (context)
  const { user } = useContext(AuthenticatedUserContext) 
//1.b. Initialize state to pass to next component ->   

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

  //   const createReceiptObjectForDB = () => {
  //     let receiptObject = {};
  //     parsedData.forEach(itemObject => {
  //       let key = itemObject[words].join(' ');
  //       receiptObject[key] = itemObject.price;
  //     });
  //     console.log(receiptObject);
  //   };

  //SUBMIT RECEIPT OBJECT TO STORE + ADD ASSOCIATION 
  //RECEIPT SHOULD HAVE: owner/receipts or charger/chargees references 
  function submitReceiptToStore(){
    console.log('USER IN SUBMIT:', user, parsedData)
    // return (
    //     firestore.collection('receipts')
    //     .add({receipt: {...parsedData, owner: `${user.uid}`}})
    // )        
   }


  const acceptButton = () => {
    return (
      <Button 
        mode="contained"
        onPress={submitReceiptToStore}
      >
        <Text>Accept</Text>
      </Button>
    );
  };

  const editButton = () => {
    return (
      <Button 
        mode="contained"
        onPress={()=> {this.props.navigation.navigate('EditReceipt')}}
      >
        <Text>Edit</Text>
      </Button>
    );
  }

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
        </View>
      </ScrollView>
    </View>
  );
};

export default Itemized;

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
