// AN Note: Receipt Refactor to Functional Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// Install expo-image-picker and import into file.
import * as ImagePicker from 'expo-image-picker';
// Install expo-camera and import into file.
import {Camera} from 'expo-camera';
// This basically gives a unique identifier to each item.
import uuid from 'uuid';
// This is importing my firebase.
import firebase from '../config/firebase';
// This is importing my environment/keys to use.
import Environment from '../config/environment';
// This is importing my divvyup header.
import Header from './header';
// This is importing homescreen component which is basically the result of logging in a user.
// It has the user email displayed and an option to logout.
import HomeScreen from './HomeScreen';
// As per usual, I'm importing the agreed upon font.
import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';
// Import Button from React Native Paper.
import {Button} from 'react-native-paper';

const Receipt = ({navigation}) => {
  // Use fonts so we can use our font.
  // As of now, I'm not styling anything on this page with our font.
  // But we can if we want to later.
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });
  // State Hooks for image, uploading, and googleResponse.
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [googleResponse, setGoogleResponse] = useState(null);
  // Deconstructing stylesheet.
  const {
    container,
    img,
    button,
    processReceiptButton,
    viewReceiptDetail,
    scrollViewContainer,
  } = styles;
  // Instead of ComponentDidMount, I will use useEffect for CameraPermissions.
  useEffect(() => {
    // Here I'm requesting permission to use the camera of the user.
    Camera.requestCameraPermissionsAsync();
    // Here I'm requesting permission to use camera.
    ImagePicker.requestCameraPermissionsAsync();
    // Here I'm requesting permission to take a picture from the user's camera roll.
    // I'm inputting false as a parameter because I don't need write-only permissions.
    ImagePicker.requestMediaLibraryPermissionsAsync(false);
  }, []);
  // Rendering the Overlay - basically this is formatting stuff.
  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };
  // This is rendering the image.
  const _maybeRenderImage = () => {
    // Deconstructing image and google response from this.state.
    // However, if there is no image, do nothing.
    if (!image) {
      return;
    }
    // If there is one, then style it and render.
    return (
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        {/* This is a button that kicks off the function that submits the image to the google api */}
        <Button
          mode="contained"
          style={processReceiptButton}
          onPress={() => submitToGoogle()}>
          Process Receipt
        </Button>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: {width: 4, height: 4},
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{uri: image}} style={{width: 250, height: 250}} />
        </View>
      </View>
    );
  };

  const _maybeRenderViewItemizedDisplay = () => {
    if (googleResponse === null) {
      return null;
    }
    return (
      <View>
        <Button
          mode="contained"
          style={viewReceiptDetail}
          onPress={() =>
            navigation.navigate('Itemized', {
              receiptData: googleResponse,
            })
          }>
          View Receipt Detail
        </Button>
      </View>
    );
  };

  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    _handleImagePicked(pickerResult);
  };

  const _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    _handleImagePicked(pickerResult);
  };

  const _handleImagePicked = async pickerResult => {
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      setUploading(false);
    }
  };
  // So here's the important bit, this is where you talk to google.
  // You get charged by feature you use from google.
  const submitToGoogle = async () => {
    try {
      setUploading(true);
      let body = JSON.stringify({
        requests: [
          {
            features: [
              // { type: 'LABEL_DETECTION', maxResults: 10 },
              // {type: 'LANDMARK_DETECTION', maxResults: 5},
              // { type: 'FACE_DETECTION', maxResults: 5 },
              // { type: 'LOGO_DETECTION', maxResults: 5 },
              {type: 'TEXT_DETECTION', maxResults: 5},
              {type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5},
              // { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
              // { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              // { type: 'CROP_HINTS', maxResults: 5 },
              // { type: 'WEB_DETECTION', maxResults: 5 }
            ],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      // Here you fetch a response from google.
      // You're body contains the image info in the format google vision API needs.
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();
      setGoogleResponse(responseJson);
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  }

  // This is what displays on our screen initially.
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
      {/* Creating our Background */}
      <ImageBackground
        style={img}
        source={require('../assets/divvyup-flower-background.jpeg')}
        resizeMode="cover">
        {/* Adding our Header */}
        <Header />
        {/* Displaying our user and ability to logout */}
        <HomeScreen />
        <ScrollView contentContainerStyle={scrollViewContainer}>
          <Button style={button} mode="contained" onPress={() => _pickImage()}>
            Select Receipt From Camera Roll
          </Button>
          <Button style={button} mode="contained" onPress={() => _takePhoto()}>
            Take A Photo Of Receipt
          </Button>
          {_maybeRenderImage()}
          {_maybeRenderUploadingOverlay()}
          {_maybeRenderViewItemizedDisplay()}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginBottom: '5%',
    backgroundColor: 'rgb(227, 100, 20)',
    alignSelf: 'stretch',
  },
  scrollViewContainer: {
    height: '65%',
    alignItems: 'center',
  },
  processReceiptButton: {
    marginBottom: '5%',
    backgroundColor: 'rgb(20, 116, 111)',
  },
  viewReceiptDetail: {
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: 'rgb(20, 116, 111)',
  },
});
