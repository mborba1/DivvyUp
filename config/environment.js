// AN Note: This file is importing all my keys from my secret.js file.
import {GOOGLE_CLOUD_VISION_API_KEY, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID} from "./secret.js"
// I needed to install expo-constants and then edit the below code to get this functioning.
import Constants from 'expo-constants'
// Here we are setting a variable called environments.
// It is an object and it has a key of staging and a value of all of the keys we imported.
// I'm not sure why there is a key called production/what that is used for.
var environments = {
    staging: {
      FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID, 
      FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID,
      GOOGLE_CLOUD_VISION_API_KEY
    },
    production: {
    // Warning: This file still gets included in your native binary and  is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };


  function getReleaseChannel(){
    //   Expo Constants Manifest is for configuration options.  It tells Expo want it needs to know to run the app.
      let releaseChannel = Constants.manifest.releaseChannel;
    // Redundant code?
    // It's saying if release channel is undefined, return staging,
    // But if it equals staging, return staging?
    // Otherwise, return staging?
    // Not sure what the purpose of this is, but it's from a tutorial and it's working.
    // So I don't want to touch it.
      if(releaseChannel === undefined){
          return 'staging';
      }else if(releaseChannel === 'staging'){
          return 'staging';
      }else{
          return 'staging';
      }
  }

// So this is a function that says depending on the input, in this case "staging",
// Return the appropriate environment.
function getEnvironment(env){
    console.log('Release Channel : ', getReleaseChannel());
    return environments[env];
}

// This is saying set a variable called enviornment to getEnvironment(staging);
var Environment = getEnvironment(getReleaseChannel());

// This is exporting the environment which is all of the secret keys.
export default Environment;
