// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDPlcnmpa0KQSdDCNq9NANuQjnUYQn_Sjg",

  authDomain: "fir-demo-a0d89.firebaseapp.com",

  projectId: "fir-demo-a0d89",

  storageBucket: "fir-demo-a0d89.appspot.com",

  messagingSenderId: "846629918115",

  appId: "1:846629918115:web:70322e4654f8cb361eb616",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
