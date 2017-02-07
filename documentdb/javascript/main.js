var httpRequest;

var primaryKey = 'hwY5vAlNl1XWSr9xPCbaRHWVLPPccHtEPTCwuTzd7hOrEGqJ5V20DdLchHq2SeOncZq8MpuXstuBMnrITdXTGQ==';

var dbId = 'MeetingsScheduleDB';
var collId = 'AccountsCollection';


var createDocumentUri = 'https://meetingscheduler.documents.azure.com:443/dbs/' +
  dbId + '/colls/' + collId + '/docs';

document.getElementById("ajaxButton").onclick = function () {
  makeRequest('test.html');
};

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('GET', url);
  httpRequest.send();
}

function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      alert(httpRequest.responseText);
    } else {
      alert('There was a problem with the request.');
    }
  }
}