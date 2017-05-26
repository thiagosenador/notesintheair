(function () {
    const notesHereLink = document.getElementById('notesHereLink');

    notesHereLink.addEventListener('click', e => {
        e.preventDefault();

        if (navigator.geolocation) {
            var position = navigator.geolocation.getCurrentPosition(loadCurrentPosition);
        }
    });

    function loadCurrentPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var url = `${notesHereLink.href}${lat},${lng}`;

        window.location.href = url;
    }
}());