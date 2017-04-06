(function () {

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnLoginGoogle = document.getElementById('btnLoginGoogle');
    const btnLogout = document.getElementById('btnLogout');

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

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
        }
    });
}());