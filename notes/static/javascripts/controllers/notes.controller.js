'use strict';

angular.module('notes')
    .controller('NotesCtrl', function ($http, $scope, FirebaseAuth) {
        $scope.createNote = function () {

            var currentUser = FirebaseAuth.auth().currentUser;

            $http({
                url: '/api/create_note',
                method: 'POST',
                params: {
                    note: $scope.note,
                    lat: $scope.lat,
                    lng: $scope.lng
                }
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
            });
        }
    });