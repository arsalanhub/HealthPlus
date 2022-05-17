console.log("final file linked");

function PageChange() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        location.replace("../index.html");
      } else {
        //document.getElementById("UserName").innerHTML = "Hello, " + user.displayName 
        var path = "users/" + user.photoURL + "/formData";
        firebase
          .database()
          .ref(path)
          .on("value", function (snapshot) {
            data = snapshot.val();
            console.log("Person Name: " + data.Name)
            // document.getElementById("personDOB").innerHTML =
            //   "Person DOB: " + data.Birthday;
            // document.getElementById("personContact").innerHTML =
            //   "Phone Number: " + data.Contact;
          });
      }
    });
  }
  
  setTimeout(() => {
    PageChange();
  }, 0);
