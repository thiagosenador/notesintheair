(function () {
    const fileBtn = document.getElementById("file");
    const showPictureDiv = document.getElementById("showPictureDiv");

    fileBtn.addEventListener('change', e => {
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
                    ctx.drawImage(showPictureDiv, 0, 0, imageWidth, imageHeight);
                }
                image.src = showPictureDiv.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    var createNoteForm = document.createNoteForm;
    createNoteForm.addEventListener('submit', e => {
        e.preventDefault();

        var fileUpload = createNoteForm.elements.file.files[0];
        var noteContent = createNoteForm.elements.note.value;

        if (!noteContent && !fileUpload) {
            alert('Please put a note!');
            return;
        }

        if (fileUpload) {
            var formData = new FormData();
            formData.append("key", "thiagos-${filename}");
            formData.append("bucket", "notes_media");
            formData.append("Content-Type", "image");
            formData.append("GoogleAccessId", "upload-storage@notesintheair-160023.iam.gserviceaccount.com");
            formData.append("acl", "bucket-owner-read");
            formData.append("policy", "eyJleHBpcmF0aW9uIjogIjIwMjAtMDYtMTZUMTE6MTE6MTFaIiwKICJjb25kaXRpb25zIjogWwogIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiIF0sCiAgeyJhY2wiOiAiYnVja2V0LW93bmVyLXJlYWQiIH0sCiAgeyJidWNrZXQiOiAibm90ZXNfbWVkaWEifSwKICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiaW1hZ2UiIF0sCiAgXQp9");
            formData.append("signature", "ID+VfEZTwFfCYI/6qyyv3JXm3326lXc/UMMfNQwkzkWlfcMjbvDEEX+70yhJsJYNzuS4vBVLm8uj9jtaBopYo2oGjDkmKpL/BTpyHz+TqtGCiiwfhs/ce6yxSnj+ltB+HRaHaCGx5c4er5aON+rWohZ9KexmB0Vl4OCEbQ7FvKDT1qL72dq3nUt6vyuFZk00NVX1F9niK24N9mpgp6oKwRvk68XZ98SfiKzKb3xVtetYZQ8+nn0tPQ3b2YLsuvUB6s5HmjzZhKbMMqon+AGxb3OnTEG+gt/GsBoBAeH6QauKlLsrlaBmdxEbRfDl+BcGOGby2pFKxVBeEHoAkT/0+w==");
            formData.append('file', fileUpload);

            var rest = new XMLHttpRequest();
            rest.open('POST', 'http://notes_media.storage.googleapis.com', true);
            rest.send(formData);
        }

        createNoteForm.submit();
    });
}());