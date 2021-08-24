import { StatusBar } from 'expo-status-bar';
import Header from './header';
import React, { useState } from 'react';
import { Alert, Button as RNButton, TextInput, View, StyleSheet, Text, ImageBackground} from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';

import { auth } from '../config/firebase';
import { db } from '../config/firebase';
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from '@expo-google-fonts/lato';
// import {TextInput} from 'react-native-paper';
export default function Signup ({ navigation }) {
  const {img, text, button, container} = styles;
 //input fields where user will enter email and password
  //values of each input field is stored inside state variables using useState hook
  //initial values of each state variable is an empty string and then updated with "set" functions with the values inside input fields
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  //3 other state variables defined
  const [passwordVisibility, setPasswordVisibility] = useState(true); //show or hide password on input field
  const [rightIcon, setRightIcon] = useState('eye'); //to set a default icon for password visability functionality
  const [signupError, setSignupError] = useState(''); //to store any incoming error when signing up from firebase

  // console.log('inside signup, what is props', props);
  // console.log('what is auth inside signup', auth);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (userEmail !== '' && password !== '') {
        const cred = await auth.createUserWithEmailAndPassword(userEmail, password);

        //once new user signed up, link auth uid to new instance in users collection in firestore
        db.collection('users').doc(cred.user.uid).set({
          email: cred.user.email
        });
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={img} source={require('../assets/divvyup-background.jpg')}
          resizeMode="cover">
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Create new account</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={userEmail}
        onChangeText={(userEmail) => setUserEmail(userEmail)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        onPress={onHandleSignup}
        // backgroundColor='#f57c00'
        title='Signup'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Login')}
        title='Go to Login'
        color='#fff'
      />
      </ImageBackground>
    </View>
  );


  // //sign up new user with provided firebase auth methods
  // const signUp = async (userEmail, password) => {
  //   try {
  //     // console.log("what is auth in signup", auth);
  //     //new user is automatically signed in after creation
  //     const cred = await auth.createUserWithEmailAndPassword(userEmail, password);
  //     console.log('what is cred in signup', cred);
  //     console.log('what is cred.user.uid', cred.user.uid);

  //     //once new user signed up, link auth uid to new instance in users collection in firestore
  //     db.collection('users').doc(cred.user.uid).set({
  //       email: cred.user.email
  //     });

  //     // console.log("what is auth in try", auth);
  //     // console.log('what is currentUser object', auth.currentUser);

  //     //listens for auth status changes and then runs a function
  //     auth.onAuthStateChanged(user => {
  //       Alert.alert('Welcome! ', `${userEmail}`);
  //       // console.log('onAuthStateChange user', user);
  //     });
  //     console.log('Ive signed up!');

  //     //need to figure out how to reset form
  //     // console.log('what is auth', auth)
  //   } catch (error) {
  //     console.log(error.toString(error));
  //   }
  // }

  // console.log("what is auth after signup", auth);

  // // console.log('inside signup, what is props after signup', props); 

  // return (
  //   <View style={styles.screen}>
  //     <TextInput
  //       placeholder='Email Address'
  //       onChangeText={(userEmail) => setUserEmail(userEmail)}
  //       style={styles.inputText}
  //     />
  //     <TextInput
  //       placeholder='Password'
  //       onChangeText={(password) => setPassword(password)}
  //       style={styles.inputText}
  //     />
  //     <Button
  //       title={'Sign Up'}
  //       style={styles.button}
  //       onPress={() => signUp(userEmail, password)}
  //     />
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  img: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    height: '40%',
    color: 'white',
    fontFamily: 'Lato_400Regular',
    backgroundColor: 'black',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato_400Regular',
  },
});

// const styles = StyleSheet.create({
//     screen: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   img: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   button: {
//     width: '100%',
//     height: '40%',
//     color: 'white',
//     fontFamily: 'Lato_400Regular',
//     backgroundColor: 'black',
//     fontSize: 20,
//     textAlign: 'center',
//     alignItems: 'center',
//     padding: 30,
//     borderRadius: 10,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: '600',
//     fontFamily: 'Lato_400Regular',
//     color: 'white',
//   },
//   inputText: {
//     width: 200,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     marginBottom: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     fontFamily: 'Lato_400Regular',
//   },
// });

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//   },
//   input: {
//     width: 200,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     marginBottom: 10,
//   },
// });


// // Import Google Signin
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from 'react-native-google-signin';
// import { signInWithGoogle } from '../config/firebase';
// <Button>
// <GoogleSigninButton onPress={signInWithGoogle} />
// </Button>