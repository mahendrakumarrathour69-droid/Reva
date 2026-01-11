// import firebase from 'firebase';

// const firebaseConfig = {
//   // apiKey: 'AIzaSyB0WsBwz6XCKe6g0nkmZcYBsOq9QHyvbW8',
//   // authDomain: 'careseeker-9533b.firebaseapp.com',
//   // projectId: 'careseeker-9533b',
//   // storageBucket: 'careseeker-9533b.appspot.com',
//   // messagingSenderId: '530793332806',
//   // appId: '1:530793332806:web:a5239c0cf8cd22be2b8a47',
//   // measurementId: 'G-ZRXGQ6E3VP',
//   apiKey: "AIzaSyCN9s_EiO67y0nS8UbYb1V4_4H1MlEe2ik",
//   authDomain: "careseeker-9533b.firebaseapp.com",
//   projectId: "careseeker-9533b",
//   storageBucket: "careseeker-9533b.appspot.com",
//   messagingSenderId: "530793332806",
//   appId: "1:530793332806:web:0fa68dd1c1c508322b8a47",
//   measurementId: "G-BPFC1GXMT2"
//  };

// if (firebase?.apps?.length == 0) {
//   firebase.initializeApp(firebaseConfig);
// }
// console.log('firebase', firebase);
// export const db = firebase.firestore();
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCN9s_EiO67y0nS8UbYb1V4_4H1MlEe2ik',
  authDomain: 'careseeker-9533b.firebaseapp.com',
  projectId: 'careseeker-9533b',
  storageBucket: 'careseeker-9533b.appspot.com',
  messagingSenderId: '530793332806',
  appId: '1:530793332806:web:0fa68dd1c1c508322b8a47',
  measurementId: 'G-BPFC1GXMT2',
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export firestore instance
export const db = firestore();
