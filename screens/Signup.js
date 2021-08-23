import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  Button, 
  TextInput, 
  View, 
  StyleSheet 
} from 'react-native';

// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

import { auth } from '../config/firebase';
import { signInWithGoogle } from '../config/firebase';
import { db } from '../config/firebase';

export default function Signup (props) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

        console.log("what is auth in signup", auth);

  // console.log('inside signup, what is props', props);
  // console.log('what is auth inside signup', auth);

  //sign up new user with provided firebase auth methods
  const signUp = async (userEmail, password) => {
    try {
      // console.log("what is auth in signup", auth);
      //new user is automatically signed in after creation
      const cred = await auth.createUserWithEmailAndPassword(userEmail, password);
      console.log('what is cred in signup', cred);
      console.log('what is cred.user.uid', cred.user.uid);

      //once new user signed up, link auth uid to new instance in users collection in firestore
      db.collection('users').doc(cred.user.uid).set({
        email: cred.user.email
      });

      // console.log("what is auth in try", auth);
      // console.log('what is currentUser object', auth.currentUser);

      //listens for auth status changes and then runs a function
      auth.onAuthStateChanged(user => {
        Alert.alert('Welcome! ', `${userEmail}`);
        // console.log('onAuthStateChange user', user);
      });
      console.log('Ive signed up!');

      //need to figure out how to reset form
      // console.log('what is auth', auth)
    } catch (error) {
      console.log(error.toString(error));
    }
  }

  console.log("what is auth after signup", auth);

  // console.log('inside signup, what is props after signup', props); 

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder='Email Address'
        onChangeText={(userEmail) => setUserEmail(userEmail)}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <Button
        title={'Sign Up'}
        style={styles.input}
        onPress={() => signUp(userEmail, password)}
      />
      <Button>
        <GoogleSigninButton onPress={signInWithGoogle} />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
