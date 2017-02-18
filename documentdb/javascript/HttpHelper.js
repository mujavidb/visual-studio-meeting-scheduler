/*jslint devel: true */


exports.createHttpRequest = function () {
    'use strict';
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    var alertContents = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

                var response = JSON.parse(httpRequest.responseText);
                alert(response.computedString);
            } else {
                alert('There was a problem with the request.');
            }
        }
    };

    httpRequest.onreadystatechange = alertContents;

    console.log('HTTP request created');
    return httpRequest;
};
