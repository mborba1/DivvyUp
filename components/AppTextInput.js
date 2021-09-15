import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



function AppTextInput({ icon, ...otherProps}) {
    return (
        <View style={styles.container}>
            {icon && (<MaterialCommunityIcons 
            name={icon} 
            size={20} 
            color={'#6e6969'} 
            style={styles.icon}
            />
            )}
            <TextInput 
            placeholderTextColor={'#6e6969'}
            style={styles.textInput} 
            {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f4f4',
        borderRadius: 25,
        flexDirection: "row",
        width: '100%',
        padding: 15,
        marginVertical: 10,
        
    },
    icon:{
        marginRight: 10,

    },
    textInput: {
        color: '#0c0c0c',
        fontSize: 18
    }
   
})
export default AppTextInput;