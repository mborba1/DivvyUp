import React, { Component, useState } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';



import { auth } from '../config/firebase';
import { signInWithGoogle } from '../config/firebase';

export default function Login (props) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

   //log in existing user with provided firebase auth methods
  const signIn = (userEmail, password) => {
    try {
      auth.signInWithEmailAndPassword(userEmail, password);
      auth.onAuthStateChanged(user => {
        Alert.alert('Credentials', `${userEmail} + ${password}`);
        console.log('login onAuthStateChange user', user);
      });
      console.log('Ive logged in!');
    } catch (error) {
      console.log(error.toString(error));
    }
  }

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder='Email Address'
        value={userEmail}
        onChangeText={(userEmail) => setUserEmail(userEmail)}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <Button
        title={'Login'}
        style={styles.input}
        onPress={() => signIn(userEmail, password)}
      />
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

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       userEmail: '',
//       password: '',
//     };

// 		this.SignIn.bind(this);
//   }
  
// 	SignIn = (userEmail, password) => {

//     try {
//       auth.signInWithEmailAndPassword(userEmail, password);
//       auth.onAuthStateChanged(user => {
// 				Alert.alert('Credentials', `${userEmail} + ${password}`);
//       })
// } catch (error) {
//       console.log(error.toString(error));
//     }
//   };

//   render() {
// 		const { userEmail, password } = this.state;
// 		const { SignIn } = this;
//     return (
//       <View style={styles.container}>
//         <TextInput
//           value={userEmail}
//           onChangeText={(userEmail) => this.setState({ userEmail })}
//           placeholder={'Email Address'}
//           style={styles.input}
//         />
//         <TextInput
//           value={password}
//           onChangeText={(password) => this.setState({ password })}
//           placeholder={'Password'}
//           secureTextEntry={true}
//           style={styles.input}
//         />
        
//         <Button
//           title={'Login'}
//           style={styles.input}
//           onPress={() => SignIn(userEmail, password)}
//         />
//       </View>
//     );
//   }
// }