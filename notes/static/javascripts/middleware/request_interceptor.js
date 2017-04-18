(function (open) {
    XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
        this.addEventListener('readystatechange', function () {
            if (this.readyState == 4) {
            }
        }, false);
        open.call(this, method, url, async, user, pass);
        this.setRequestHeader('Authorization', window.localStorage.getItem('security_token'))
        this.setRequestHeader('Content-type', 'application/json');
    };
})(XMLHttpRequest.prototype.open);