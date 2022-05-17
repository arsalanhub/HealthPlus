console.log("Firebase linked successfully");

const firebaseConfig = {
  apiKey: "AIzaSyBvv6YOqX-0Yg67yp9xvENZo-lwnDyV_aU",
  authDomain: "hammerheads-67240.firebaseapp.com",
  projectId: "hammerheads-67240",
  storageBucket: "hammerheads-67240.appspot.com",
  databaseURL: "https://hammerheads-67240-default-rtdb.firebaseio.com",
  messagingSenderId: "333078386336",
  appId: "1:333078386336:web:fa470e8d826b9091a85bc5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
