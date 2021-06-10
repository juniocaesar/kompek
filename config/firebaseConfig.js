import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_pAtQ-1DyayrxGik4zOId8D9JaH-RZss",
  authDomain: "kompek-1d117.firebaseapp.com",
  projectId: "kompek-1d117",
  storageBucket: "kompek-1d117.appspot.com",
  messagingSenderId: "957511142970",
  appId: "1:957511142970:web:1d637bd9e7a63b1b462f03",
  measurementId: "G-MJWJWB98SK"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { storage, db, auth, timestamp, firebaseConfig };
