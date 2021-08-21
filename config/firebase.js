// AN Note: This is importing everything from firebase,
import * as firebase from 'firebase';
// This imports environment (so all your secret keys).
import Environment from "./environment"

// This says that if there is not an existing firebase db/storage,
// Then initialize a new app and name it divvyup.
// I needed to add this line checking if there was an existing firebase, if not, a new one is initialized.
// if (firebase.apps.length === 0){
firebase.initializeApp({
    apiKey: Environment['FIREBASE_API_KEY'],
    authDomain: Environment['FIREBASE_AUTH_DOMAIN'],
    databaseURL: Environment['FIREBASE_DATABASE_URL'],
    projectId: Environment['FIREBASE_PROJECT_ID'],
    storageBucket: Environment['FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: Environment['FIREBASE_MESSAGING_SENDER_ID'],
    //appId: Environment['FIREBASE_APP_ID']
    });
// }else{
//     firebase.app();
// }


// This is running and exporting this entire file.
export default firebase;

//making a reference to firebase firestore
//update firestore settings, dictating how the db will be working with timestamps
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export { db };

//making a reference for firebase authentication
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);