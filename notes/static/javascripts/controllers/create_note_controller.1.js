(function () {

    var imageRawData = null;

    const takePicture = document.getElementById("picture");
    const showPicture = document.getElementById("showPictureDiv");

    if (imageRawData) {
        data['picture'] = imageRawData;
    }

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