(function () {
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const loginMenu = document.getElementById('loginMenu');
    const logoutMenu = document.getElementById('logoutMenu');

    const userMenu = document.getElementById('userMenu');
    const loginBar = document.getElementById('loginBar');

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            loginBar.style.display = 'none';
            loginBar.style.display = 'none';

            userMenu.style.display = 'block';
            userMenu.style.display = 'block';
        } else {
            loginBar.style.display = 'block';
            loginBar.style.display = 'block';

            userMenu.style.display = 'none';
            userMenu.style.display = 'none';
        }
    });

    logoutLink.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    logoutMenu.addEventListener('click', e => {
        firebase.auth().signOut();
    });
}());