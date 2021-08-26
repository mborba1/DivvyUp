import React from 'react';
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

const Itemized = ({route, navigation}) => {
  const {container, bottom} = styles;
  const {receiptData} = route.params;
  let stringifiedReceiptData = JSON.stringify(receiptData.responses);
  let parsedData = receiptParser(receiptData.responses);
  let string = JSON.stringify(parsedData);

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

  const acceptButton = () => {
    return (
      <Button mode="contained">
        <Text>Accept</Text>
      </Button>
    );
  };

  const editButton = () => {
    return (
      <Button mode="contained">
        <Text>Edit</Text>
      </Button>
    );
  };

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
