// AN Note:  This is the code I edited from the tutorial.
// This is a messy file and I need to separate out components/convert to modal screens.
import React, { useContext } from 'react'; //J: added use context
// Import a bunch of stuff from React Native.
import {
  ActivityIndicator,
  Button,
  Clipboard,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
} from 'react-native';
// I needed to install expo-image-picker (not included in the tutorial).
import * as ImagePicker from 'expo-image-picker';
// I needed to install expo-camera (not included in the tutorial).
import {Camera} from 'expo-camera';
// I was fine using uuid, the tutorial uses nanoid.
// This basically gives a unique identifier to each item.
import uuid from 'uuid';
// This is importing my firebase.
import firebase from '../config/firebase';
// This is importing my environment/keys to use.
import Environment from '../config/environment';
import Header from './header';
import HomeScreen from './HomeScreen';

// The tutorial is using class components, but is this best?
// Aka should we be using hooks?
export default class Receipt extends React.Component {
  // The tutorial is setting state to be an object with image, uploading, and googleResponse keys.
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
  };

  // When component mounts, make sure to get access to camera and pics.
  async componentDidMount() {
    // This is code from the tutorial that was out of date.
    // We should be using Camera and Image Picker here instead so I updated that.
    // Actually, maybe I'll still need these lines of code....will play with them.
    // await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // await Permissions.askAsync(Permissions.CAMERA);
    // Here I'm requesting permission to use the camera of the user.
    await Camera.requestCameraPermissionsAsync();
    // Here I'm requesting permission to use cameral.
    await ImagePicker.requestCameraPermissionsAsync();
    // Here I'm requesting permission to take a picture from the user's camera roll.
    // I'm inputting false as a parameter because I don't need write-only permissions.
    await ImagePicker.requestMediaLibraryPermissionsAsync(false);
  }

  // This is rendering my screen.
  render() {
    // Deconstructing image from this.state.
    let {image} = this.state;
    const {container, img} = styles;
    return (
      <View style={container}>
        <ImageBackground
          style={img}
          source={require('../assets/divvyup-background.jpg')}
          resizeMode="cover">
          <Header />
          <HomeScreen />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {/* When you hit pick image from camera roll, on press kick off pick image function */}
            <View style={styles.helpContainer}>
              <Button
                onPress={this._pickImage}
                title="Pick an image from camera roll"
              />
              {/* When you hit take a photo, access camera and take image, but I can't get this to work yet.  Need to figure out how to get the app on my phone to test with my camera */}
              <Button onPress={this._takePhoto} title="Take a photo" />
              {this.state.googleResponse && (
                <FlatList
                  data={this.state.googleResponse.responses[0].labelAnnotations}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={({item}) => <Text>Item: {item.description}</Text>}
                />
              )}
              {this.state.googleResponse && (
                <Button
                style={{marginBottom: 10}}
                title="SHOW RECEIPT"
                onPress={()=> {this.props.navigation.navigate('ConfirmReceipt')}}
              />
              )}
              {this._maybeRenderImage()}
              {this._maybeRenderUploadingOverlay()}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
  // I currently don't know that this is organizing.
  organize = array => {
    return array.map(function (item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };
  // Rendering the Overlay - basically this is formatting stuff.
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
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
  _maybeRenderImage = () => {
    // Deconstructing image and google response from this.state.
    let {image, googleResponse} = this.state;
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
          style={{marginBottom: 10}}
          onPress={() => this.submitToGoogle()}
          title="Analyze!"
        />

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
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{paddingVertical: 10, paddingHorizontal: 10}}
        />

        <Text>Raw JSON:</Text>
        {/* If a google response is received, display it on the screen */}
        {/* Also if you click on the image with your mouse, you can copy it to your clipboard */}
        {googleResponse && (
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{paddingVertical: 10, paddingHorizontal: 10}}>
            {JSON.stringify(googleResponse.responses)}
            {console.log('Raw JSON output:', JSON.stringify(googleResponse.responses))}
          </Text>
        )}
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = item => {
    <Text>response: {JSON.stringify(item)}</Text>;
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: 'Check it out',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({uploading: true});

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({image: uploadUrl});
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({uploading: false});
    }
  };
  // So here's the important bit, this is where you talk to google.
  // You get charged by feature you use from google.
  // So I'm only using landmark detection, text, and document text detection.
  // I'm keeping landmark so I can demonstrate how this works to my team.
  submitToGoogle = async () => {
    try {
      this.setState({uploading: true});
      let {image} = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              // { type: 'LABEL_DETECTION', maxResults: 10 },
              {type: 'LANDMARK_DETECTION', maxResults: 5},
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
      // It looks like you don't need to convert to base 64 here?
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
      console.log('submitToGoogle responseJson:', responseJson);
      this.setState({
        googleResponse: responseJson,
        uploading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
// I think this is where you are storing the image into firebase.
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
// Styling for the screen.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});
