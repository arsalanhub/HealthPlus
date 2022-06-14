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

// document.getElementById("form").addEventListener("submit", (event) => {
//   event.preventDefault();
// });

// firebase.auth().onAuthStateChanged((user) => {
//   if (!user) {
//     location.replace("../index.html");
//   } else {
//     document.getElementById("UserName").innerText =
//       "Hello, " + user.displayName;
//     console.log(user.displayName);
//   }
// });

// function logout() {
//   firebase
//     .auth()
//     .signOut()
//     .then(function () {
//       // Sign-out successful.
//       console.log("User Logged Out!");
//     })
//     .catch(function (error) {
//       // An error happened.
//       console.log(error);
//     });
// }

