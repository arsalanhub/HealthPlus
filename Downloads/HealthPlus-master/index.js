////////////////////////////////////////////////////////////////////////////////////////////////////////
// Login / Signup Animations
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Your web app's Firebase configuration
document.getElementById("signInForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.getElementById("signUpForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

async function signUp() {
  var ID = Date.now();
  var Alert = document.getElementById("signupformAlert");
  Alert.innerHTML = "";

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let Name = document.getElementById("full_name").value;
  // let res = await auth.createUserWithEmailAndPassword(email, password);

  if (Name != "" && email != "" && password != "") {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Send verification email
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            AlertText = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Please Verify Your Email Id</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
            Alert.innerHTML += AlertText;
          })
          .catch((error) => {
            AlertText = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${error.message}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
            Alert.innerHTML += AlertText;
          });
        // Update User Profile
        user.user
          .updateProfile({
            displayName: Name,
            photoURL: ID,
          })
          .then(function () {
            // AlertText = `
            // <div class="alert alert-secondary  alert-dismissible fade show text-center mb-1" role="alert">
            //     <strong>Account Updated Successfully.</strong>
            //     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            // </div>`;
            // Alert.innerHTML += AlertText;
          })
          .catch(function (error) {
            AlertText = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>${error.message}</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
            Alert.innerHTML += AlertText;
          });
        // Update User Data
        firebase
          .database()
          .ref("users/" + ID)
          .set({
            Name: Name,
            email: email,
            Password: password,
          })
          .then(function () {})
          .catch(function (error) {});
        AlertText = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Account Created Successfully.</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
        Alert.innerHTML += AlertText;
      })
      .catch((error) => {
        AlertText = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>${error.message}</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
        Alert.innerHTML += AlertText;
      });
  } else {
    AlertText = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Enter Valid Details</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
    Alert.innerHTML += AlertText;
  }
}

function signIn() {
  var Alert = document.getElementById("loginformAlert");
  Alert.innerHTML = "";
  const email = document.getElementById("email1").value;
  const password = document.getElementById("password1").value;
  if (email != "" && password != "") {
    // document.getElementById("loginbtn").value = "Checking...";
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        logging();
      })
      .catch((error) => {
        AlertText = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>${error.message}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

        Alert.innerHTML += AlertText;
      });
  } else {
    AlertText = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Enter Valid Email & Password</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button> 
  </div>`;
    Alert.innerHTML += AlertText;
  }
}

// Logging Function
function logging() {
  var Alert = document.getElementById("loginformAlert");
  firebase.auth().onAuthStateChanged((user) => {
    if (user.email == "arsalanmohd237@gmail.com") {
      console.log("YES");
      location.replace("./form/form.html");
      // alert("Under Processing");
    } else if (user.emailVerified) {
      location.replace("./form/form.html");
    } else {
      AlertText = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Please verify email first</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
      Alert.innerHTML += AlertText;
    }
  });
}
