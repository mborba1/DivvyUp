// AN Final Itemized Screen Shown to the End User.
import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Header from './header';
import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';
import {DataTable, Button} from 'react-native-paper';

const FinalItemized = ({route, navigation}) => {
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  const {container, img, dataTable, button, dropdown} = styles;

  const {chargees, chargeeTracker} = route.params;

  // Calculate how much each chargee owes.
  const calculateTotalOwedByEachChargee = chargee => {
    let totalOwed = 0;
    Object.values(chargeeTracker).forEach(item => {
      if (chargee === item.chargee) {
        totalOwed += +item.price;
      }
    });
    return totalOwed;
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
            <DataTable.Title>Chargee</DataTable.Title>
            <DataTable.Title numeric>Amount Owed</DataTable.Title>
          </DataTable.Header>
          <View>
            {chargees.map((chargee, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{chargee}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {calculateTotalOwedByEachChargee(chargee)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </View>
        </DataTable>
        <Button style={button} mode="contained">
          Send Charges
        </Button>
      </ImageBackground>
    </View>
  );
};

export default FinalItemized;

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
  dropdown: {
    width: '80%',
  },
});
