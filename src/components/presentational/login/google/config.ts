// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBPcsMrQkeoSX5wTT0WxmqsxLX5AEjrlQ8',
  authDomain: 'vbook-b1701.firebaseapp.com',
  projectId: 'vbook-b1701',
  storageBucket: 'vbook-b1701.appspot.com',
  messagingSenderId: '946448024007',
  appId: '1:946448024007:web:10853122b5ae31a8ea99e2',
  measurementId: 'G-H65G0C8BD6'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
console.log('Firebase initialized');
// const analytics = getAnalytics(firebaseApp);
