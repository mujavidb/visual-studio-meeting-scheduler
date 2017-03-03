var documentClient = require('documentdb').DocumentClient;
var config = require('../config');
var url = require('url');

var client = new documentClient(config.endpoint, {"masterKey": config.primaryKey});

var HttpStatusCodes = {
    NOTFOUND: 404
};
var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;

// Classes
var Meeting = require('../Classes/Meeting');

exports.getCollection = function () {
    console.log('Getting collection:\n${config.collection.id}\n');

    return new Promise((resolve, reject) => {
        client.readCollection(collectionUrl, (error, result) => {
            if (error.code == HttpStatusCodes.NOTFOUND) {
                client.createCollection(databaseUrl, config.collection, {
                    offerThroughput: 400
                }, (error, created) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(created);
                    }
                })
            } else {
                reject(error);
            }
        });
    });
}

exports.createMeeting = function (accountId, hostId, meetingId, meetingName, query, hostAvailability, attendeesArray) {

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
        "parameters": [
            {
                "name": "@hostId",
                "value": hostId
            }, {
                "name": "@accountId",
                "value": accountId
            }
        ]
    };

    return new Promise((resolve, reject) => {
        console.log("returning Promise for createMeeting function");
        // First get whole document.
        client
            .queryDocuments(collectionUrl, query)
            .toArray((error, results) => {
                console.log("Starting documentQuery");
                if (error) {
                    reject(error);
                } else {
                    // Now we push a new meeting to the meetings array and update document.
                    var meeting = new Meeting(hostId, meetingId, meetingName);
                    var updatedDocument = results;
                    console.log("WHAHTHWT");
                    console.log(results);

                    hostAvailability.forEach(function (date) {
                        meeting.addHostAvailability(date.dateStart, date.dateEnd);
                    });

                    attendeesArray.forEach(function (attendee) {
                        meeting.addAttendee(attendee.id, attendee.name)
                    });

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
                }

                // resolve(results);
            });

        // resolve(asdas);
    });

}

exports.createDocument = function (accountId) {
    console.log('Creating Document for accountId: ' + accountId);

    var documentUrl = `${collectionUrl}/docs/${accountId}`
    console.log(documentUrl);

    var data = {
        "id": accountId,
        "meetings": [
            {
                "hostId": "1234",
                "meetingId": "4321",
                "meetingName": "Birthday!",
                "hostAvailability": [
                    {
                        "dateStart": "01/12/2017",
                        "dateEnd": "00:00"
                    }, {
                        "dateStart": "01/12/2017",
                        "dateEnd": "00:00"
                    }
                ],
                "finalDate": "some date object here",
                "attendees": [
                    {
                        "id": "asqwe12d",
                        "response": 1,
                        "name": "Kelvin",
                        "availableTimes": [
                            {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }, {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }
                        ]
                    }, {
                        "id": "asqwe12d",
                        "response": 1,
                        "name": "Kelvin",
                        "availableTimes": [
                            {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }, {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }
                        ]
                    }
                ]
            }, {
                "hostId": "4321",
                "meetingId": "4321",
                "meetingName": "Birthday!",
                "hostAvailability": [
                    {
                        "dateStart": "01/12/2017",
                        "dateEnd": "00:00"
                    }, {
                        "dateStart": "01/12/2017",
                        "dateEnd": "00:00"
                    }
                ],
                "finalDate": "some date object here",
                "attendees": [
                    {
                        "id": "asqwe12d",
                        "response": 1,
                        "name": "Kelvin",
                        "availableTimes": [
                            {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }, {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }
                        ]
                    }, {
                        "id": "asqwe12d",
                        "response": 1,
                        "name": "Kelvin",
                        "availableTimes": [
                            {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }, {
                                "dateStart": "01/12/2017",
                                "dateEnd": "00:00"
                            }
                        ]
                    }
                ]
            }
        ]

    }

    return new Promise((resolve, reject) => {
        client.readDocument(documentUrl, (error, result) => {
            // console.log(error + '\n' + result)
            if (error) {

                if (error.code == HttpStatusCodes.NOTFOUND) {

                    client.createDocument(collectionUrl, data, (error, result) => {

                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }

                    });
                } else {

                    reject(error);

                }
            } else {

                resolve(result);

            }

        })
    });
}