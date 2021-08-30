import {StatusBar} from 'expo-status-bar';
import Header from './header';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {InputField, ErrorMessage} from '../components';
import {Button} from 'react-native-paper';

import {auth} from '../config/firebase';
import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';

//2 input fields and a button for this screen
export default function Login({navigation}) {
  const {
    img,
    text,
    button,
    container,
    title,
    touchableOpacityContainerForBottom,
    contentContainer,
  } = styles;
  //input fields where user will enter email and password
  //values of each input field is stored inside state variables using useState hook
  //initial values of each state variable is an empty string and then updated with "set" functions with the values inside input fields
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  //3 other state variables defined
  const [passwordVisibility, setPasswordVisibility] = useState(true); //show or hide password on input field
  const [rightIcon, setRightIcon] = useState('eye'); //to set a default icon for password visability functionality
  const [loginError, setLoginError] = useState(''); //to store any incoming error when logging in from firebase
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

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
        <Header />
        <StatusBar style="dark-content" />
        <Text style={title}>Enter Login Details</Text>
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
        <Button style={button} mode="contained" onPress={onLogin}>
          Log In
        </Button>
        <TouchableOpacity
          style={touchableOpacityContainerForBottom}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={text}>Go to Sign Up Page</Text>
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
    fontSize: 24,
    fontFamily: 'Lato_400Regular',
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
