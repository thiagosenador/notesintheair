(function () {

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnLoginGoogle = document.getElementById('btnLoginGoogle');

    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();

        // Sign in
        const promisse = auth.signInWithEmailAndPassword(email, password);
        promisse.catch(e => console.log(e.message));
    });

    btnSignup.addEventListener('click', e => {
        // TODO: CHECK FOR REAL EMAIL
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();

        // Sign up
        const promisse = auth.createUserWithEmailAndPassword(email, password);
        promisse.catch(e => console.log(e.message));
    });

    btnLoginGoogle.addEventListener('click', e => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            firebase.auth().currentUser.getToken(true).then(function (idToken) {
                window.localStorage.setItem('security_token', idToken);
                window.location = '/home';
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            console.log('not logged in');
        }
    });
}());