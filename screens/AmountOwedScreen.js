import React, {useContext, useState} from 'react';
import {StyleSheet, ImageBackground, Text, View, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import Header from './header';
import {db} from '../config/firebase';

const AmountOwed = ({route}) => {
  const {chargeesProp, id} = route.params;

  const updateChargees = async () => {
    await db.collection('receipts').doc(id).update({chargees: chargeesProp});
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={require('../assets/divvyup-flower-background.jpeg')}
        resizeMode="cover">
        <View style={styles.header}>
          <Header />
          <Button
            style={styles.button}
            onPress={updateChargees}
            mode="contained">
            <Text>Send Charges</Text>
          </Button>
        </View>
        <View style={styles.content}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={chargeesProp}
            renderItem={({item, index}) => (
              <Text style={styles.item}>
                Person {+`${index}` + 1} owes ${item.amountOwed.toFixed(2)}
              </Text>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default AmountOwed;

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
    paddingTop: 80,
    padding: 38,
  },
  item: {
    width: 322,
    height: 29,
    backgroundColor: '#f8f7f6',
    overflow: 'visible',
    marginTop: 16,
    alignItems: 'center',
  },
  content: {
    padding: 40,
    paddingTop: 10,
    paddingBottom: 40,
    flex: 3.5,
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
  button: {
    backgroundColor: 'rgb(227, 100, 20)',
  },
});
