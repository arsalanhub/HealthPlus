// download-receipt: person_name, person_phone, person_dob, doctor_name, doctor_distance, doctor_special, slot

// Firebase Settings
function PageChange() {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      location.replace("../main.html");
    } else {
      document.getElementById("UserName").innerHTML =
        "Hello, " + user.displayName;
      var path = "users/" + user.photoURL + "/formData";
      // firebase
      //   .database()
      //   .ref(path)
      //   .on("value", function (snapshot) {
      //     data = snapshot.val();
      //     document.getElementById("personName").innerHTML =
      //       "Person Name: " + data.Name;
      //     document.getElementById("personDOB").innerHTML =
      //       "Person DOB: " + data.Birthday;
      //     document.getElementById("personContact").innerHTML =
      //       "Phone Number: " + data.Contact;
      //   });
    }
  });
}

setTimeout(() => {
  PageChange();
}, 0);

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

firebase
  .database()
  .ref("doctors/")
  .on("value", function (snapshot) {
    var container = document.getElementById("doctorCard");
    container.innerHTML = ``;

    snapshot.forEach(function (childSnapshot) {
      let s = [];
      for (let i = 0; i < childSnapshot.val().Availability.length; i++) {
        let value = childSnapshot.val().Availability[i][1];
        let slot_time = childSnapshot.val().Availability[i][0];

        if (value == true) {
          let button = document.createElement("button");
          let char = "a";
          button.classList.add(
            "btn",
            "btn-outline-success",
            char + `${childSnapshot.val().Contact_Number.toString()}`
          );
          button.innerHTML = slot_time;

          let list = document.createElement("li");
          list.append(button);

          s[i] = list.innerHTML;

          // console.log(s[i]);
        } else {
          let button = document.createElement("button");
          let char = "a";
          button.classList.add(
            "btn",
            "btn-outline-danger",
            char + `${childSnapshot.val().Contact_Number.toString()}`
          );
          button.disabled = true;
          button.innerHTML = slot_time;

          let list = document.createElement("li");
          list.append(button);

          s[i] = list.innerHTML;
        }
      }

      container.innerHTML +=
        `
      <div class="col-lg-4" id="cards">
      <div class="card-container">
                <h3>${childSnapshot.val().Name}</h3>
                <h5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt"
                        viewBox="0 0 16 16">
                        <path
                            d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg> ${childSnapshot.val().dist} KM</h5>
                <p>${childSnapshot.val().Specialization}</p>
                <div class="slots">
                    <h6>Slots</h6>
                    <ul>` +
        "<li>" +
        s[0] +
        "</li>" +
        "<li>" +
        s[1] +
        "</li>" +
        "<li>" +
        s[2] +
        "</li>" +
        "<li>" +
        s[3] +
        "</li>" +
        "<li>" +
        s[4] +
        "</li>" +
        "<li>" +
        s[5] +
        "</li>" +
        `</ul>
                </div>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone"
                        viewBox="0 0 16 16">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg> ${childSnapshot.val().Contact_Number} 
                </p>
            </div>
            </div>
        `;
    });

    snapshot.forEach(function (childSnapshot) {
      var path = "doctors/";
      let doc_btn = document.querySelectorAll(
        ".a" + `${childSnapshot.val().Contact_Number}`
      );
      for (let i = 0; i < doc_btn.length; i++) {
        let name = childSnapshot.val().Name;
        let slot = childSnapshot.val().Availability[i][0];
        doc_btn[i].onclick = function () {
          path += childSnapshot.val().Contact_Number;
          console.log("Path = ", path);
          let pos;
          if (slot === "8:00") pos = 0;
          else if (slot === "10:00") pos = 1;
          else if (slot === "14:00") pos = 2;
          else if (slot === "17:00") pos = 3;
          else if (slot === "21:00") pos = 4;
          else if (slot === "23:00") pos = 5;

          let dummy = new Array();
          for (let i = 0; i < childSnapshot.val().Availability.length; i++) {
            dummy[i] = new Array();
            if (pos === i) {
              console.log("YES", pos, childSnapshot.val().Availability[pos][1]);
              dummy[i][0] = childSnapshot.val().Availability[i][0];
              dummy[i][1] = false;
            } else {
              dummy[i][0] = childSnapshot.val().Availability[i][0];
              dummy[i][1] = childSnapshot.val().Availability[i][1];
            }
          }

          console.log("Doctor Name: " + childSnapshot.val().Name);
          console.log("Specialization: " + childSnapshot.val().Specialization);
          console.log(
            "Appointment Time: " + childSnapshot.val().Availability[pos][0]
          );

          // console.log("pos", pos)
          // console.log(childSnapshot.val().Availability);
          firebase
            .database()
            .ref(path)
            .update({
              Contact_Number: childSnapshot.val().Contact_Number,
              Name: childSnapshot.val().Name,
              Specialization: childSnapshot.val().Specialization,
              dist: childSnapshot.val().dist,
              lat: childSnapshot.val().lat,
              lon: childSnapshot.val().lon,
              Availability: dummy,
            })
            .then(() => {
              //location.replace("../Doctor Card/doctor.html");
            });

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, "0");
          var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          var yyyy = today.getFullYear();

          today = dd + "/" + mm + "/" + yyyy;
          var ele1 = document.getElementById("Alert1");
          ele1.classList.add("alert", "alert-dark");
          ele1.innerHTML = "Slot Booked Successfully!";

          var ele2 = document.getElementById("Alert2");
          ele2.classList.add("alert", "alert-dark");
          ele2.innerHTML = "Doctor selected: " + childSnapshot.val().Name;

          var ele3 = document.getElementById("Alert3");
          ele3.classList.add("alert", "alert-dark");
          ele3.innerHTML = "Date and time selected: " + today + " " + slot;

          var ele4 = document.getElementById("Alert4");
          ele4.classList.add("alert", "alert-dark");
          ele4.innerHTML = "Doctor's distance: " + childSnapshot.val().dist;

          var ele5 = document.getElementById("Alert5");
          ele5.classList.add("alert", "alert-dark");
          ele5.innerHTML =
            "Doctor's specialization: " + childSnapshot.val().Specialization;

          var UID = document.getElementById("UID");
          UID.classList.add("alert", "alert-dark");
          UID.innerHTML = "Your UID is: " + Date.now();

          alert("Please check receipt above");
          alert(
            "Will Logout in 10 second so make sure to take screenshot of receipt"
          );
          setInterval(() => {
            logout();
          }, 10000);
        };
      }
    });
  });

function getLocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your web browser");
  } else {
    console.log("Locating");
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

var cords = [];
function success(position) {
  let sourceLat = position.coords.latitude;
  let sourceLon = position.coords.longitude;
}

console.log(cords[0], cords[1]);

function error(position) {
  console.log("Not found");
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
