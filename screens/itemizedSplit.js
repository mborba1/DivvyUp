// AN Itemized Split Attempt
import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Header from './header';
import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';
import {DataTable, Button} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

const ItemizedSplit = ({route, navigation}) => {
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });
  // Destructuring Styling
  const {container, img, dataTable, button} = styles;

  // Pulling number of people and final receipt (pulled from firestore) from previous page.
  const {numPeople, receiptDetail} = route.params;

  // Creating an array of chargees.
  let chargees = [];
  for (let i = 1; i <= numPeople; i++) {
    chargees.push(`Chargee ${i}`);
  }

  // Object to track which item belongs to which chargee.
  // Note: On Select, chargees will be assigned to items.
  // On Submit, final chargeeTracker will be sent to the next page for math functionality and display to end user.
  const chargeeTracker = {};
  receiptDetail.items.forEach((item, itemIndex) => {
    chargeeTracker[itemIndex] = {
      description: item.description,
      chargee: null,
      price: item.price,
    };
  });

  const onSubmit = () => {
    navigation.navigate('FinalItemized', {
      chargeeTracker: chargeeTracker,
      chargees: chargees,
    });
  };

  return (
    <View style={container}>
      <ImageBackground
        style={img}
        source={require('../assets/divvyup-flower-background.jpeg')}
        resizeMode="cover">
        <Header />
        <DataTable style={dataTable}>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title numeric>Cost</DataTable.Title>
            <DataTable.Title numeric>Allocation</DataTable.Title>
          </DataTable.Header>
          <View>
            {receiptDetail.items.map((itemObject, itemIdx) => (
              <DataTable.Row key={itemIdx}>
                <DataTable.Cell>{itemObject.description}</DataTable.Cell>
                <DataTable.Cell numeric>{itemObject.price}</DataTable.Cell>
                <DataTable.Cell>
                  <View>
                    <SelectDropdown
                      data={chargees}
                      onSelect={(selectedItem, index) => {
                        chargeeTracker[itemIdx].chargee = selectedItem;
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // Text represented after item is selected
                        // If data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // Text represented for each item in dropdown
                        // If data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </View>
        </DataTable>
        <Button onPress={() => onSubmit()} style={button} mode="contained">
          Submit
        </Button>
      </ImageBackground>
    </View>
  );
};

export default ItemizedSplit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  dataTable: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: '70%',
    marginBottom: '2%',
  },
  button: {
    marginBottom: '15%',
    backgroundColor: 'rgb(227, 100, 20)',
  },
});
