'use strict';

angular.module('notes')
    .controller('LoginCtrl', function ($scope, FirebaseAuth) {
        $scope.login = function () {
            const email = $scope.email;
            const password = $scope.password;
            const auth = FirebaseAuth.auth();

            // Sign in
            const promisse = auth.signInWithEmailAndPassword(email, pass);
            promisse.catch(e => console.log(e.message));
        }

        $scope.signUp = function () {
            // TODO: CHECK FOR REAL EMAIL
            const email = $scope.email;
            const password = $scope.password;
            const auth = FirebaseAuth.auth();

            // Sign in
            const promisse = auth.createUserWithEmailAndPassword(email, password);
            promisse.catch(e => console.log(e.message));
        }

        $scope.loginGoogle = function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            FirebaseAuth.auth().signInWithRedirect(provider);
        }

        $scope.logout = function () {
            FirebaseAuth.auth().signOut();
        }

        // Add a realtime listener
        FirebaseAuth.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(firebaseUser);
            } else {
                console.log('not logged in');
            }
        });
    });