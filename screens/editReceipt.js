import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, FlatList} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {auth} from '../config/firebase';
import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';
import firebase from '../config/firebase';
const firestore = firebase.firestore();
import Header from './header';
import {Button} from 'react-native-paper';

export default EditReceipt = ({route, navigation}) => {
  const {
    img,
    text,
    button,
    container,
    textHeader,
    list,
    listItem,
    separator,
    textInput,
  } = styles;
  const {user} = useContext(AuthenticatedUserContext);
  const [receipt, setReceipt] = useState(route.params.receipt);

  async function submitReceipt() {
    const edittedReceipt = await firestore
      .collection('receipts')
      .add({
        ...receipt, 
        charger: `${user.uid}`,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    navigation.navigate('SplitReceipt', {id: edittedReceipt.id})
  }

  function updateItemPrice(item, newPrice) {
    const items = receipt.items;
    item.price = newPrice;
    setReceipt({...receipt, items: items, charger: `${user.uid}`});
  }

  function listItems() {
    return (
      <View>
        <View style={list}>
          <FlatList
            ListHeaderComponent={() => <Text style={textHeader}>ITEM</Text>}
            ItemSeparatorComponent={() => <View style={separator} />}
            data={receipt.items}
            renderItem={({item, index}) => {
              return (
                <View style={listItem} key={`${index}item`}>
                  <Text style={text}>{item.description}</Text>
                </View>
              );
            }}
          />
          <FlatList
            ListHeaderComponent={() => <Text style={textHeader}>COST</Text>}
            ItemSeparatorComponent={() => <View style={separator} />}
            data={receipt.items}
            renderItem={({item, index}) => {
              return (
                <View style={listItem} key={`${index}cost`}>
                  <TextInputMask
                    style={textInput}
                    type={'money'}
                    options={{
                      separator: '.',
                      delimiter: ',',
                      unit: null,
                    }}
                    value={item.price}
                    onChangeText={newPrice => updateItemPrice(item, newPrice)}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }

  if (!receipt) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={container}>
        <ImageBackground
          style={img}
          source={require('../assets/divvyup-background.jpg')}
          resizeMode="cover">
          <Header />
          <View style={styles.constainerForListAndSubmit}>
            {listItems()}
            <Button style={button} onPress={submitReceipt} mode="contained">
              Submit
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    marginTop: 60,
    flexDirection: 'row',
    padding: 25,
  },
  listItem: {
    padding: 10,
    height: 50,
    justifyContent: 'flex-end',
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
    color: 'white',
    backgroundColor: 'black',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CEDCCE',
  },
  constainerForListAndSubmit: {
    height: '85%',
  },
});
