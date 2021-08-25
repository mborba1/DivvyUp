import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button as RNButton, TextInput, View, StyleSheet, Text } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';

import { auth } from '../config/firebase';
import { signInWithGoogle } from '../config/firebase';

  //2 input fields and a button for this screen
export default function Login ({ navigation }) {

  //input fields where user will enter email and password
  //values of each input field is stored inside state variables using useState hook
  //initial values of each state variable is an empty string and then updated with "set" functions with the values inside input fields
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  //3 other state variables defined
  const [passwordVisibility, setPasswordVisibility] = useState(true); //show or hide password on input field
  const [rightIcon, setRightIcon] = useState('eye'); //to set a default icon for password visability functionality
  const [loginError, setLoginError] = useState(''); //to store any incoming error when logging in from firebase

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  //onLogin asynchronously handles whether to log in user based on their email and password values, can't be empty
  //values are then passed into signInWithEmailAndPassword function provided by firebase auth
  const onLogin = async () => {
    try {
      if (userEmail !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(userEmail, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  //  //log in existing user with provided firebase auth methods
  // const signIn = (userEmail, password) => {
  //   try {
  //     auth.signInWithEmailAndPassword(userEmail, password);
  //     auth.onAuthStateChanged(user => {
  //       Alert.alert('Credentials', `${userEmail} + ${password}`);
  //       console.log('login onAuthStateChange user', user);
  //     });
  //     console.log('Ive logged in!');
  //   } catch (error) {
  //     console.log(error.toString(error));
  //   }
  // }

  console.log("what is auth after logging in", auth);

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Login</Text>
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
        onChangeText={text => setUserEmail(text)}
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
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button
        onPress={onLogin}
        backgroundColor='#f57c00'
        title='Login'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Signup')}
        title='Go to Signup'
        color='#fff'
      />
    </View>
  );

  // return (
  //   <View style={styles.screen}>
  //     <TextInput
  //       placeholder='Email Address'
  //       value={userEmail}
  //       onChangeText={(userEmail) => setUserEmail(userEmail)}
  //       style={styles.inputText}
  //     />
  //     <TextInput
  //       placeholder='Password'
  //       value={password}
  //       onChangeText={(password) => setPassword(password)}
  //       style={styles.inputText}
  //     />
  //     <Button
  //       title={'Login'}
  //       style={styles.button}
  //       onPress={() => signIn(userEmail, password)}
  //     />
  //     {/* <Button 
  //       style={styles.button}
  //       title='Signup'>
  //       New to our app? Click here to sign up!
  //     </Button> */}
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
//   screen: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// img: {
//   flex: 1,
//   justifyContent: 'center',
// },
// container: {
//   flex: 1,
// },
// button: {
//   width: '100%',
//   height: '40%',
//   color: 'white',
//   fontFamily: 'Lato_400Regular',
//   backgroundColor: 'black',
//   fontSize: 20,
//   textAlign: 'center',
//   alignItems: 'center',
//   padding: 30,
//   borderRadius: 10,
// },
// text: {
//   fontSize: 18,
//   fontWeight: '600',
//   fontFamily: 'Lato_400Regular',
//   color: 'white',
// },
// inputText: {
//   width: 200,
//   height: 44,
//   padding: 10,
//   borderWidth: 1,
//   borderColor: 'black',
//   marginBottom: 10,
// },
// buttonText: {
//   fontSize: 18,
//   fontWeight: '600',
//   fontFamily: 'Lato_400Regular',
// },
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