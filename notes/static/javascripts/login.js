(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA4ZcvShNm5WU93q2hlxwp_73gefQaSY6c",
        authDomain: "notesintheair-160023.firebaseapp.com",
        databaseURL: "https://notesintheair-160023.firebaseio.com",
        storageBucket: "notesintheair-160023.appspot.com"
    };

    firebase.initializeApp(config);

    // Get elements from login form
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnLogout = document.getElementById('btnLogout');
    const btnLoginGoogle = document.getElementById('btnLoginGoogle');

    // Add login event
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        // Sign in
        const promisse = auth.signInWithEmailAndPassword(email, pass);
        promisse.catch(e => console.log(e.message));
    });

    // Add sign up event
    btnSignup.addEventListener('click', e => {

        // TODO: CHECK FOR REAL EMAIL
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        // Sign in
        const promisse = auth.createUserWithEmailAndPassword(email, pass);
        promisse.catch(e => console.log(e.message));
    });

    // Add sign out event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add login with google event
    btnLoginGoogle.addEventListener('click', e => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
        }
    });
}());