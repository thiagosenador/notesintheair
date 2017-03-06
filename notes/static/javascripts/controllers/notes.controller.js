'use strict';

var app = angular.module('notes', []);

app.controller('NotesCtrl', function ($http, $scope) {
    $scope.createNote = function () {
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
})