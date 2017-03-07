'use strict';

var app = angular.module('notes', ['firebase']);

app.controller('LoginCtrl', function ($scope) {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA4ZcvShNm5WU93q2hlxwp_73gefQaSY6c",
        authDomain: "notesintheair-160023.firebaseapp.com",
        databaseURL: "https://notesintheair-160023.firebaseio.com",
        storageBucket: "notesintheair-160023.appspot.com"
    }

    firebase.initializeApp(config);

    $scope.login = function () {
        const email = $scope.email;
        const password = $scope.password;
        const auth = firebase.auth();

        // Sign in
        const promisse = auth.signInWithEmailAndPassword(email, pass);
        promisse.catch(e => console.log(e.message));
    }

    $scope.signUp = function () {
        // TODO: CHECK FOR REAL EMAIL
        const email = $scope.email;
        const password = $scope.password;
        const auth = firebase.auth();

        // Sign in
        const promisse = auth.createUserWithEmailAndPassword(email, password);
        promisse.catch(e => console.log(e.message));
    }

    $scope.loginGoogle = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    $scope.logout = function () {
        firebase.auth().signOut();
    }

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
        }
    });
})