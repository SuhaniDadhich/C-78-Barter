import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyADgf1V_hozlCpRn9YlmOzbdv8qklmkNJo",
    authDomain: "barter-app-98e9f.firebaseapp.com",
    projectId: "barter-app-98e9f",
    storageBucket: "barter-app-98e9f.appspot.com",
    messagingSenderId: "297698601815",
    appId: "1:297698601815:web:6025936af548e76119ac12"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();