import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useEffect,
  useState,
} from 'react-native';
import {receiptParser} from '../utilities/receiptParser';
import {DataTable, Button} from 'react-native-paper';

const Itemized = ({route, navigation}) => {
  const {img, container, text, bottom} = styles;
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
          {parsedData.map(itemObject => (
            <DataTable.Row>
              <DataTable.Cell>{itemObject.words.join(' ')}</DataTable.Cell>
              <DataTable.Cell numeric>{itemObject.price}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </View>
      );
    }
  };

  //   const total = () => {
  //     if (parsedData) {
  //       let totalAmt = parsedData.reduce(
  //         acc,
  //         itemObject => {
  //           if (itemObject.words.includes('Total')) {
  //             return acc + itemObject.price;
  //           }
  //         },
  //         0,
  //       );
  //       return totalAmt;
  //     }
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
      {/* <ImageBackground
        style={img}
        source={require('../assets/divvyup-background.jpg')}
        resizeMode="cover"> */}
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
        <Text>{total()}</Text>
      </View>
    </View>
  );
};

export default Itemized;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
