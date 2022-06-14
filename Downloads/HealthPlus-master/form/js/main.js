///////////////////////////////////////////////////////////////////
(function ($) {
  "use strict";
  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
})(jQuery);
///////////////////////////////////////////////////////////////////

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.replace("../main.html");
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
      location.replace("../Doctor/doctor.html");
    })
    .error(() => {
      alert("Error Occured");
    });
}
