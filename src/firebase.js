import firebase from 'firebase/app';
import 'firebase/firestore';    // added this line
// referencing configuration values from .env.development
var firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_DATABASEURL,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_APPID,
};

// Initialize Firebase with configurations from above
const firebaseApp = firebase.initializeApp(firebaseConfig);    // capture initialized app in a variable
export const db = firebaseApp.firestore();              // export the db so it can be imported into the components that need it