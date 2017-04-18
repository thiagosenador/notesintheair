(function () {

    var imageRawData = null;

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

        if (imageRawData) {
            data['picture'] = imageRawData;
        }

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const toastMessage = document.getElementById('toast_message');

                var data = { message: 'your note was posted successfully!!!' };
                toastMessage.MaterialSnackbar.showSnackbar(data);
            }
        }

        xhr.open(createNoteForm.method, createNoteForm.action, true);
        xhr.send(JSON.stringify(data));
    });

    takePicture.addEventListener('change', e => {
        var files = e.target.files;
        var file;

        if (files && files.length > 0) {
            file = files[0];

            fileReader = new FileReader();
            fileReader.onload = function (event) {
                imageRawData = showPicture.src = event.target.result;
            };
            fileReader.readAsDataURL(file);
        }
    });
}());