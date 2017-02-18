'use strict';
require('buffer');
var crypto = require('crypto');
var config = require('./config.js');

// var httpHelper = require('httpHelper.js');

// var url = 'https://meetingscheduler.table.core.windows.net/?restype=service&comp=properties&timeout=10';
var url = 'https://meetingscheduler.table.core.windows.net/';

exports.makeRequest = function (httpRequest, verb, uri) {
    var authToken;
    var accountName = 'zcabkch@ucl.ac.uk';
    var dateToken;
    var contentMD5 = "";
    var contentType = "";
    // var canonicalizedResource = "" + "/zcabkch@ucl.ac.uk" +
    //     encodeURIComponent('?restype=service&comp=properties&timeout=10');
    var canonicalizedResource = 'https://meetingscheduler.table.core.windows.net';


    dateToken = new Date();
    dateToken = dateToken.toUTCString();

    httpRequest.open(verb, url, true);


    console.log('made request' + config.key);

    var stringToSign = verb + "\n" +
        contentMD5 + "\n" +
        contentType + "\n" +
        dateToken + "\n" +
        canonicalizedResource;

    var utf8_stringToSign = new Buffer(stringToSign, 'utf8');
    var sha256_stringToSign = crypto.createHmac('sha256', utf8_stringToSign);



    var signature = sha256_stringToSign.digest('base64');

    // var signature = new Buffer(crypto.createHmac('sha256', new Buffer(stringToSign, 'utf8')), 'base64');

    authToken = 'SharedKey' + accountName + ':' + signature;

    httpRequest.setRequestHeader('Authorization', authToken);
    httpRequest.setRequestHeader('x-ms-date', dateToken);
    httpRequest.setRequestHeader('x-ms-version', '2016-05-31');

    httpRequest.send(encodeURIComponent('restype=service&comp=properties&timeout=10'));
};