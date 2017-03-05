require('buffer');
data = require('./data.js');
var HttpHelper = require('./HttpHelper.js');
var TableProperties = require('./TableProperties.js');

var crypto = require('crypto');

var httpRequest;
// var Buffer = require('buffer');

var primaryKey = 'hwY5vAlNl1XWSr9xPCbaRHWVLPPccHtEPTCwuTzd7hOrEGqJ5V20DdLchHq2SeOncZq8MpuXstuBMnrITdXTGQ==';

var dbId = 'MeetingScheduleDB';
var collId = 'AccountsCollection';
var resourceType = 'docs';

var createDocumentUri = 'https://meetingscheduler.documents.azure.com:443/dbs/' +
    dbId + '/colls/' + collId + '/' + resourceType;




global.onload = function () {
    global.document.getElementById("ajaxButton").onclick = function () {
        httpRequest = HttpHelper.createHttpRequest();
        TableProperties.makeRequest(httpRequest, 'POST', 'www.google.com');
    };
};


function getAuthorizationTokenUsingMasterKey(verb, resourceType, resourceLink, date, masterKey) {
    var key = new Buffer(masterKey, "base64");

    var text = (verb || "").toLowerCase() + "\n" +
        (resourceType || "").toLowerCase() + "\n" +
        (resourceLink || "") + "\n" +
        date.toLowerCase() + "\n" +
        "" + "\n";

    var body = new Buffer(text, "utf8");
    var signature = crypto.createHmac("sha256", key).update(body).digest("base64");

    var MasterToken = "master";

    var TokenVersion = "1.0";

    return encodeURIComponent("type=" + MasterToken + "&ver=" + TokenVersion + "&sig=" + signature);
}

function makeRequest(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url, true);


    // Construct hash signature
    var verb = 'POST';
    var resourceLink = 'dbs/' + dbId + '/colls/' + collId + '/' + resourceType;
    var date = new Date();

    // console.log('1: ' + date.getUTCDate());

    date = date.toUTCString();
    // alert(date.toUTCString());
    // console.log('2: ' + date);

    var authToken = getAuthorizationTokenUsingMasterKey(verb, resourceType, resourceLink, date, primaryKey);

    // var stringToSign = verb.toLowerCase() + "\n" +
    //   resourceType.toLowerCase() + "\n" + resourceLink + "\n" + date.toLowerCase() + "\n" + "" + "\n";

    var stringToSign = (verb || "").toLowerCase() + "\n" +
        (resourceType || "").toLowerCase() + "\n" +
        (resourceLink || "") + "\n" +
        date.toLowerCase() + "\n" +
        "" + "\n";

    console.log('stringToSign:\n' + stringToSign);

    var bufferKey = new Buffer(primaryKey, "base64");
    var body = new Buffer(stringToSign, "utf8");
    var signature = crypto.createHmac("sha256", bufferKey).update(body).digest("base64");


    var masterToken = "master";
    var tokenVersion = "1.0";

    console.log(authToken);


    var authString = encodeURIComponent("type=" + masterToken + "&ver=" + tokenVersion + "&sig=" + authToken);

    // console.log(authString);

    // Set the request headers
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.setRequestHeader('x-ms-documentdb-is-upsert', true);
    httpRequest.setRequestHeader('Authorization', authToken);
    httpRequest.setRequestHeader('x-ms-consistency-level', 'Session');
    httpRequest.setRequestHeader('x-ms-documentdb-partitionkey', ['testCase1']);
    httpRequest.setRequestHeader('x-ms-version', '2016-07-11');
    httpRequest.setRequestHeader('x-ms-date', date);

    console.log('data is:' + data.data);
    httpRequest.send(data.data);
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {

            var response = JSON.parse(httpRequest.responseText);
            alert(response.computedString);
        } else {
            alert('There was a problem with the request.');
        }
    }
}