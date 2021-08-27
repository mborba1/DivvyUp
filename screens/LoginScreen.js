import {StatusBar} from 'expo-status-bar';
import Header from './header';
import React, {useState} from 'react';
import {
  Alert,
  Button as RNButton,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {Button, InputField, ErrorMessage} from '../components';

import {auth} from '../config/firebase';
import {signInWithGoogle} from '../config/firebase';
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

//2 input fields and a button for this screen
export default function Login({navigation}) {
  const {img, text, button, container} = styles;
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

  return (
    <View style={styles.container}>
      <ImageBackground
        style={img}
        source={require('../assets/divvyup-background.jpg')}
        resizeMode="cover">
        {/* <Header /> */}
        <ScrollView
          contentContainerStyle={styles.contentContainer}></ScrollView>
        <StatusBar style="dark-content" />

        <Text style={styles.title}>Login</Text>
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
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <Button
          onPress={onLogin}
          title="Login"
          tileColor="#fff"
          titleSize={20}
          containerStyle={{
            marginBottom: 40,
          }}
        />
        <RNButton
          style={styles.buttonText}
          onPress={() => navigation.navigate('Signup')}
          title="Go to Signup"
          color="#fff"
        />
      </ImageBackground>
    </View>
  );
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
    paddingBottom: 24,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
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
  contentContainer: {
    paddingTop: 30,
  },
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
