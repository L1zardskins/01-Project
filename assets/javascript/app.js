//firebase


var config = {
    apiKey: "AIzaSyC1Vh8DGZDc3j6Sv7QT8bMtsko-uKCU63M",
    authDomain: "make-a-date-58d62.firebaseapp.com",
    databaseURL: "https://make-a-date-58d62.firebaseio.com",
    projectId: "make-a-date-58d62",
    storageBucket: "make-a-date-58d62.appspot.com",
    messagingSenderId: "935239127539"
};
firebase.initializeApp(config);

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function () {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
    });
    // [END sendemailverification]
}
function sendPasswordReset() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
                //document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function () {
    initApp();
};
//end firebase

$(document).ready(function () {

    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
        accordion: false
    });


    $('select').formSelect();


    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        autoClose: true,
        format: "mm/dd/yy"
    });


});

// iShowTime API

function movieResponse() {

    var iShowTimeApiKey = "U0AkE0yt6yBUiOOb8s9CiGEgK574ZMKD";
    var Latlng = "40.5650,-111.8390";
    var radius = "5";
    var time_from = "2018-06-07T00:00:00-06:00";
    var time_to = "2018-06-07T23:59:00-06:00";

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://api.internationalshowtimes.com/v4/showtimes?location=40.5650,-111.8390&distance=100&time_from=2018-06-07T19:30:00-06:00&time_to=2018-06-08T19:30:00-06:00&apikey=U0AkE0yt6yBUiOOb8s9CiGEgK574ZMKD",
    //     "method": "GET",
    //     "headers": {
    //         "Cache-Control": "no-cache",
    //         "Postman-Token": "335b76b8-5a61-47b9-92b2-d1797b067cfc"
    //     }
    // }

    // $.ajax(settings).done(function (response) {
    //     console.log(response);

    // });

    $.ajax({
        url: `https://api.internationalshowtimes.com/v4/showtimes?location=${Latlng}&distance=${radius}&time_from=${time_from}&time_to=${time_to}`,
        method: "GET",
        headers: {
            "X-API-Key": iShowTimeApiKey
        },
    }).then(function (movieResponse) {

        var showtimeArray = (movieResponse.showtimes);
        var allMovieTitlesArr = [];
        var movieTitle = "";
        var uniqueMovieTitlesArr = [];

        for (var i = 0; i < showtimeArray.length; i++) {

            console.log(showtimeArray[i].cinema_movie_title);
            movieTitle = (showtimeArray[i].cinema_movie_title);

            allMovieTitlesArr.push(movieTitle);

        }

        console.log(allMovieTitlesArr);

        $.each(allMovieTitlesArr, function (i, el) {
            if ($.inArray(el, uniqueMovieTitlesArr) === -1) uniqueMovieTitlesArr.push(el);
        });

        console.log(uniqueMovieTitlesArr);

    });


}
movieResponse();





//Show/Hide date stuff!
function selectDateParam() {
    var section = "#" + $(this).data("name");
    var state = $(section).css("visibility")
    //console.log(section);
    if (state === "visible") {
        //console.log(state);
        $(section).css("visibility", "hidden")
    } else {
        //console.log(state);
        $(section).css("visibility", "visible")
    };
};

$(document).on("click", "#btn", selectDateParam);

