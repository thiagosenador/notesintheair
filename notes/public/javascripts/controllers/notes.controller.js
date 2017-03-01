var app = angular.module('notes', []);

app.controller('NotesCtrl', function ($http, $scope) {
    $scope.createNote = function () {
        $http({
            url: '/api/create_note',
            method: 'POST',
            params: {
                note: $scope.note
            }
        }).success(function (data, status, header, config) {
            alert('success');
        }).error(function (data, status, header, config) {
            alert('error')
        });
    }
})