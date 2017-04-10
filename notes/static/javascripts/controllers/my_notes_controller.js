(function () {

    const btnTest = document.getElementById('btnTest');

    var myResultList = {};

    btnTest.addEventListener('click', e => {
        var data = {};
        data['user'] = firebase.auth().currentUser.uid;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(myResultList);

                myResultList = JSON.parse(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('POST', '/api/v1/my_notes', true);
        xhr.setRequestHeader('Authorization', window.localStorage.getItem('security_token'));
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    });
}());