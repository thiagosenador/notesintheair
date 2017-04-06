(function () {

    const noteTxt = document.getElementById('noteTxt');
    const latTxt = document.getElementById('latTxt');
    const lngTxt = document.getElementById('lngTxt');
    const createNoteForm = document.getElementById('createNoteForm');

    createNoteForm.addEventListener('submit', e => {
        e.preventDefault();

        firebase.auth().currentUser.getToken(true).then(function (idToken) {
            var data = {};
            data['note'] = noteTxt.value;
            data['lat'] = latTxt.value;
            data['lng'] = lngTxt.value;
            data['user'] = firebase.auth().currentUser.uid;

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json);
                }
            }

            xhr.open(createNoteForm.method, createNoteForm.action, true);
            xhr.setRequestHeader('Authorization', idToken);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));

        }).catch(function (error) {
            console.log('Error... ' + error);
        });
    });
}());