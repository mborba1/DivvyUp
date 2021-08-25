import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button as RNButton, TextInput, View, StyleSheet, Text } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';

import { auth } from '../config/firebase';
import { db } from '../config/firebase';

export default function Signup ({ navigation }) {

 //input fields where user will enter email and password
  //values of each input field is stored inside state variables using useState hook
  //initial values of each state variable is an empty string and then updated with "set" functions with the values inside input fields
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  //3 other state variables defined
  const [passwordVisibility, setPasswordVisibility] = useState(true); //show or hide password on input field
  const [rightIcon, setRightIcon] = useState('eye'); //to set a default eye icon for password visability functionality
  const [signupError, setSignupError] = useState(''); //to store any incoming error when signing up from firebase

  // console.log('inside signup, what is props', props);
  // console.log('what is auth inside signup', auth);

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
        const credential = await auth.createUserWithEmailAndPassword(userEmail, password);

        //once new user signed up, link auth uid to new instance in users collection in firestore
        db.collection('users').doc(credential.user.uid).set({
          email: credential.user.email
        });
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
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
        onChangeText={(text) => setUserEmail(text)}
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
        backgroundColor='#f57c00'
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
    backgroundColor: '#e93b81',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  }
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