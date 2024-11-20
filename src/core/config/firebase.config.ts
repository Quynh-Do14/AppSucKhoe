// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA1xiioz7jxHZEqEOD_H43fc8MdRGapOsU',
  authDomain: 'appsuckhoe-3bfd4.firebaseapp.com',
  projectId: 'appsuckhoe-3bfd4',
  storageBucket: 'appsuckhoe-3bfd4.appspot.com',
  messagingSenderId: '156767076381',
  appId: '1:156767076381:android:38d5c8afb44b20079f86f4',
  // measurementId: 'G-Y5J843MBP9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const storage = getStorage(app);
export const functions = getFunctions(app);
