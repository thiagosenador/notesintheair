(function () {

    const noteTxt = document.getElementById('noteTxt');
    const latTxt = document.getElementById('latTxt');
    const lngTxt = document.getElementById('lngTxt');
    const createNoteForm = document.getElementById('createNoteForm');

    const takePicture = document.getElementById("takePictureBtn");
    const showPicture = document.getElementById("showPictureDiv");

    createNoteForm.addEventListener('submit', e => {
        e.preventDefault();

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
        xhr.setRequestHeader('Authorization', window.localStorage.getItem('security_token'));
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    });

    takePicture.addEventListener('change', e => {
        var files = e.target.files;
        var file;

        if (files && files.length > 0) {
            file = files[0];

            try {
                var imgURL = window.URL.createObjectURL(file);
                showPicture.src = imgURL;
                URL.revokeObjectURL(imgURL);
            }
            catch (error) {
                try {
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        showPicture.src = event.target.result;
                    };
                    fileReader.readAsDataURL(file);
                }
                catch (error) {
                    console.log("Neither createObjectURL or FileReader are supported");
                }
            }
        }
    });
}());