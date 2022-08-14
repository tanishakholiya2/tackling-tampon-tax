const firebaseConfig = {
    apiKey: "AIzaSyD9A24ZeypiKY7fGqaA0sMCO9sGEhJZYro",
    authDomain: "ttt3-6fa02.firebaseapp.com",
    databaseURL: "https://ttt3-6fa02-default-rtdb.firebaseio.com",
    projectId: "ttt3-6fa02",
    storageBucket: "ttt3-6fa02.appspot.com",
    messagingSenderId: "763195936058",
    appId: "1:763195936058:web:5f17a66d44891caff8d403",
    measurementId: "G-R56VCP0D38"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    // User is signed in.
    console.log(user.email);
    document.getElementById('user').innerHTML = user.email;
    document.getElementById('sign-out').style.visibility = 'visible';
    let signOutButton = document.getElementById("sign-out");
    signOutButton.addEventListener("click", (e) => {
        e.preventDefault();
        auth.signOut();
        alert("Signed out");
    })
} else {
    // User is signed out.
    document.getElementById("signup").innerHTML = 'SIGN IN';
    document.getElementById('sign-out').style.visibility = 'hidden';
    document.getElementById('user').innerHTML = '';
}
}, function(error) {
console.log(error);
});