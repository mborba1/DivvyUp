import {StatusBar} from 'expo-status-bar';
import Header from './header';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';

import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {InputField, ErrorMessage} from '../components';

import {auth} from '../config/firebase';

import {db} from '../config/firebase';

import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';

export default function Signup({navigation}) {
  const {
    img,
    text,
    button,
    container,
    title,
    touchableOpacityContainerForBottom,
  } = styles;
  //input fields where user will enter email and password
  //values of each input field is stored inside state variables using useState hook
  //initial values of each state variable is an empty string and then updated with "set" functions with the values inside input fields
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  //3 other state variables defined
  const [passwordVisibility, setPasswordVisibility] = useState(true); //show or hide password on input field
  const [rightIcon, setRightIcon] = useState('eye'); //to set a default eye icon for password visability functionality
  const [signupError, setSignupError] = useState(''); //to store any incoming error when signing up from firebase

  //toggle function to to see password in inputText form
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  //onHandleSignup asynchronously handles whether to sign up an user based on their email and password values, can't be empty
  //values are then passed into createUserWithEmailAndPassword function provided by firebase auth
  //firebase returns built in error message if user already exists
  //firebase auth generates its own UID for each new user, and we use the credential (or user object) from recently created user to find its UID
  //firebase auth unique UID is then used as ID number to generate new doc(instance) in users collection (db model)-->see firestore
  const onHandleSignup = async () => {
    try {
      if (userEmail !== '' && password !== '') {
        let credential = await auth.createUserWithEmailAndPassword(
          userEmail,
          password,
        );
      }
      //once new user signed up, link auth uid to new instance in users collection in firestore
      db.collection('users').doc(credential.user.uid).set({
        email: credential.user.email,
      });
    } catch (error) {
      setSignupError(error.message);
    }
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
  }
  return (
    <View style={container}>
      <ImageBackground
        style={img}
        source={require('../assets/divvyup-background.jpg')}
        resizeMode="cover">
        <StatusBar style="dark-content" />
        <Header />
        <Text style={title}>Create New Account</Text>
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20,
          }}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20,
          }}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          value={password}
          onChangeText={text => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        {signupError ? (
          <ErrorMessage error={signupError} visible={true} />
        ) : null}
        <Button style={button} mode="contained" onPress={onHandleSignup}>
          Sign Up
        </Button>
        <TouchableOpacity
          style={touchableOpacityContainerForBottom}
          onPress={() => navigation.navigate('Login')}>
          <Text style={text}>Return To Login Page</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Lato_400Regular',
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 24,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    fontFamily: 'Lato_400Regular',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    color: 'white',
    alignSelf: 'center',
  },
  touchableOpacityContainerForBottom: {
    marginTop: 30,
    marginBottom: '65%',
  },
});
