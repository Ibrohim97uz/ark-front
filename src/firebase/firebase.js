import firebase from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
  apiKey: "AIzaSyALsL2s8gybs_aCnAXYj5Ibfz_mwnvI4Bg",
  authDomain: "ark-logistics.firebaseapp.com",
  databaseURL: "https://ark-logistics.firebaseio.com",
  projectId: "ark-logistics",
  storageBucket: "ark-logistics.appspot.com",
  messagingSenderId: "1032287735572",
  appId: "1:1032287735572:web:156388d7d3f071cfcb3c01",
  measurementId: "G-YCX907CN4N"
};

const devConfig = {
  apiKey: "AIzaSyALsL2s8gybs_aCnAXYj5Ibfz_mwnvI4Bg",
  authDomain: "ark-logistics.firebaseapp.com",
  databaseURL: "https://ark-logistics.firebaseio.com",
  projectId: "ark-logistics",
  storageBucket: "ark-logistics.appspot.com",
  messagingSenderId: "1032287735572",
  appId: "1:1032287735572:web:156388d7d3f071cfcb3c01",
  measurementId: "G-YCX907CN4N"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firebaseAuth = firebase.auth();

export {
  firebaseAuth,firebase
};

