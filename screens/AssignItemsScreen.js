import React, { useState } from 'react';
import { StyleSheet, View, Modal, Text , SafeAreaView, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config/firebase';
import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';

function AssignItemsScreen({navigation, route}) {
    const [modalOpen, setModalOpen] = useState(false)
    const { chargeesProp, id } = route.params;

   

    return (
        
        <View>
            <Modal visible={modalOpen} animationType='slide'>
            <SafeAreaView>
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={24}
                        style={{...styles.modalToggle, ...styles.modalClose}}
                        onPress={() => setModalOpen(false)}
                    />
                    <Text>Hello from modal</Text>
                </View>
                </SafeAreaView>   
            </Modal>

            <MaterialIcons
               name='add'
               style={styles.modalToggle}
               size={24}
               onPress={() => setModalOpen(true)}
            />   
             <FlatList
            // keyExtractor={(item) => item.id}
            data={chargeesProp}
            renderItem={({ item }) => (
            <Text style={styles.item}>Person {item.name} owes ${(item.amountOwed).toFixed(2)}</Text>)}
          />
        </View>
       
    );
}

export default AssignItemsScreen;


const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'

    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    // modalContent: {
    //     flex: 1,
    // }
        
    
})