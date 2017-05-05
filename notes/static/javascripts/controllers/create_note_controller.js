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
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    });

    takePicture.addEventListener('change', e => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;

        var files = e.target.files;
        var file;

        if (files && files.length > 0) {
            file = files[0];

            var reader = new FileReader();
            reader.onloadend = function (e) {
                var image = new Image();
                image.onload = function () {
                    var imageWidth = this.width;
                    var imageHeight = this.height;

                    if (imageWidth > imageHeight) {
                        if (imageWidth > MAX_WIDTH) {
                            imageHeight *= MAX_WIDTH / imageWidth;
                            imageWidth = MAX_WIDTH;
                        }
                    } else {
                        if (imageHeight > MAX_HEIGHT) {
                            imageWidth *= MAX_HEIGHT / imageHeight;
                            imageHeight = MAX_HEIGHT;
                        }
                    }

                    var canvas = document.createElement('canvas');
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(showPicture, 0, 0, imageWidth, imageHeight);

                    imageRawData = canvas.toDataURL('image/jpeg', 1.0);
                }
                image.src = showPicture.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}());