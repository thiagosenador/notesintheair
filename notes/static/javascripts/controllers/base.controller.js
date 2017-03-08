'use strict';

angular.module('notes', [])
    .factory('FirebaseAuth', function () {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyA4ZcvShNm5WU93q2hlxwp_73gefQaSY6c",
            authDomain: "notesintheair-160023.firebaseapp.com",
            databaseURL: "https://notesintheair-160023.firebaseio.com",
            storageBucket: "notesintheair-160023.appspot.com"
        }

        firebase.initializeApp(config);

        return firebase;
    });