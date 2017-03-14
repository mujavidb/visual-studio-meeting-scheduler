var config = require('../config');

var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;

var documentClient = require('documentdb').DocumentClient;
var client = new documentClient(config.endpoint, {
    "masterKey": config.primaryKey
});

var Meeting = require('../Classes/Meeting');

exports.createMeeting = function (accountId, hostId, meetingId, meetingName, query, hostAvailability, attendeesArray, meetingLocation) {

    var documentUrl = `${collectionUrl}/docs/${accountId}`

    // First get all your meetings.
    var queryString = "SELECT\
                        *\
                       FROM AccountsCollectio" +
        "n c\
                       WHERE c.id = @accountId"

    // Form query object.
    var query = {
        "query": queryString,
        "parameters": [{
            "name": "@hostId",
            "value": hostId
        }, {
            "name": "@accountId",
            "value": accountId
        }]
    };
     
    return new Promise((resolve, reject) => {
        // console.log("returning Promise for createMeeting function"); First get whole
        // document.

        // client.executeStoredProcedure()
        client
            .queryDocuments(collectionUrl, query)
            .toArray((error, results) => {
                // console.log("Starting documentQuery");
                if (error) {
                    reject(error);
                } else {
                    // Now we push a new meeting to the meetings array and update document.
                    var meeting = new Meeting(hostId, meetingName);

                    // First step is to generate a unique meetingID, after that do the rest
                    meeting
                        .generateMeetingId()
                        .then((result) => {
                            var updatedDocument = results;

                            // Finish building the data inside the Meetings object
                            hostAvailability.forEach(function (date) {
                                meeting.addHostAvailability(date.dateStart, date.dateEnd);
                            });

                            attendeesArray.forEach(function (attendee) {
                                meeting.addAttendee(attendee.id, attendee.name)
                            });

                            meeting.addLocation(meetingLocation);

                            // Now we have created the meeting object, under meeting.data, we can push it to
                            // the document and replace the whole document.
                            if (results.length == 1) {
                                updatedDocument[0]
                                    .meetings
                                    .push(meeting.data);
                            }

                            console.log(updatedDocument);

                            client.replaceDocument(documentUrl, updatedDocument[0], (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result);
                                }
                            });
                        });

                }
            });
    });
}


exports.getMeeting = function (accountId, meetingId) {

    var queryString = 
    "SELECT\
    m AS meeting\
    FROM\
    AccountsCollection c\
    JOIN m IN c.meetings\
    WHERE\
    m.meetingId = @meetingId "; 

    var query = {
        "query": queryString,
        "parameters": [{
            "name": "@meetingId",
            "value": meetingId
        }]
    };
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrl, query)
            .toArray((error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
    });
};

exports.getMeetings = function (accountId, userId) {
    var documentUrl = `${collectionUrl}/docs/${accountId}`;

    return new Promise((resolve, reject) => {
        client.executeStoredProcedure(`${collectionUrl}/sprocs/getMeetings`, [accountId, userId],
            function (error, response) {
                console.log("execute");
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }

            });

    });

};

exports.addAttendees = function (accountId, meetingId, attendees) {
    // execute the stored procedure
    return new Promise((resolve, reject) => {
        client.executeStoredProcedure(`${collectionUrl}/sprocs/addAttendees`, [accountId, meetingId, attendees],
            function (error, response) {
                console.log("execute");
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }

            });

    });

}