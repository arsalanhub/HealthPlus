/////////////////////////////////////////////////////////////////////////////////////////////////
// Firebase part Starts here
// function PageChange() {

// }

//PageChange();

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.replace("../index.html");
  } else {
    document.getElementById("UserName").innerText =
      "Hello, " + user.displayName;
    // console.log(user.displayName);
  }
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      console.log("User Logged Out!");
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

function submitData() {
  const user = auth.currentUser;
  var ID = Date.now();
  // var path = "users/" + user.photoURL + "/formData/" + ID;
  var path = "users/" + user.photoURL + "/formData";
  console.log("YES");
  let Name = document.getElementById("inputName").value;
  let Birthday = document.getElementById("birthday").value;
  let Contact = document.getElementById("contact").value;
  firebase
    .database()
    .ref(path)
    .set({
      Name: Name,
      Birthday: Birthday,
      Contact: Contact,
    })
    .then(() => {
      location.replace("../Doctor Card/doctor.html");
    })
    .error(() => {
      alert("Error Occured");
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// Location part starts here
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  let sourceLat = position.coords.latitude;
  let sourceLon = position.coords.longitude;

  document.getElementById("placeLat").value = sourceLat;
  document.getElementById("placeLon").value = sourceLon;

  let acc = position.coords.accuracy;

  let destLat = 28.6332;
  let destLon = 77.4456;
  acc = acc / 1000;

  let distance = calc(sourceLat, sourceLon, destLat, destLon, acc);
  console.log(distance);
}

function calc(sourceLat, sourceLon, destLat, destLon, acc) {
  const R = 6371e3; // metres
  const sourceLatRad = (sourceLat * Math.PI) / 180; // φ, λ in radians
  const destLatRad = (destLat * Math.PI) / 180;
  const sourceLonRad = ((destLat - sourceLat) * Math.PI) / 180;
  const destLonRad = ((destLon - sourceLon) * Math.PI) / 180;

  const sinVal1 = Math.sin(sourceLonRad / 2) * Math.sin(sourceLonRad / 2);
  const cosVal1 = Math.cos(sourceLatRad) * Math.cos(destLatRad);
  const sinVal2 = Math.sin(destLonRad / 2) * Math.sin(destLonRad / 2);

  const a = sinVal1 + cosVal1 * sinVal2;
  const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const c = (R * b) / 1000; // in metres
  return Math.floor(c - acc);
}

// var user = firebase.auth().currentUser;

// if (user) {
//   // User is signed in.
//   if (user != null) {
//     name = user.displayName;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
//   }
//   console.log(user);
// } else {
//   // No user is signed in.
// }
