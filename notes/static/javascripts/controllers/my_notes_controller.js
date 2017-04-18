(function () {
    console.log(local_data);


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var json = JSON.parse(xhr.responseText);

                    const content = document.getElementById('content');
                    content.innerHTML = json;
                }
            }

            var url = '/api/v1/my_notes/' + user.uid;

            xhr.open('GET', url, true);
            xhr.send();
        } else {
            window.location = '/login';
        }
    });
}());