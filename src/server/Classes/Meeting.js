var Hashids = require('hashids');

var Collection = require('../functions/collections');
var config = require('../config');

var documentClient = require('documentdb').DocumentClient;
var client = new documentClient(config.endpoint, {"masterKey": config.primaryKey});

var databaseUrl = `dbs/${config.database.id}`;
// var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;

var collectionUrl = `${databaseUrl}/colls/${config.usersCollection.id}`;

var meetingsDocumentUrl = `${collectionUrl}/docs/meetings`;
var salt = 'nXqPlBBYVdP5Qhxj39PE';

class Meeting {

    constructor(hostId, meetingName) {
        // this.hostId = hostId; this.meetingId = this.generateMeetingId();
        // this.meetingName = meetingName;


        this.data = {
            "hostId": hostId,
            "meetingId": null,
            "meetingName": meetingName,
            "meetingLocation": null,
            "hostAvailability": [],
            "finalDate": null,
            "agenda": null,
            "attendees": []
        }
    }

    generateMeetingId() {

        // We need to generate unique IDs for our meeting. What we'll do is have a
        // seperate collection to store the number of meetings created. We'll then use
        // this number with hashIds package to generate an ID.
        var self = this;
        var id = "";
        return new Promise((resolve, reject) => {

            // First we get the document.
            client.readDocument(meetingsDocumentUrl, (error, result) => {
                if (error) {
                    console.log("Error in reading meetingsDocument");
                    reject(error);
                } else {
                    // Now we generate the id.
                    var hashNumber = result.count + 1;
                    var hashids = new Hashids(salt);
                    var int1 = Math.floor(Math.random * 1000);
                    var int2 = Math.floor(Math.random * 1000);

                    id = hashids.encode(12387, 823754922, hashNumber);

                    console.log("Your hash is: " + id);

                    // Now we have the id, we need to update the document.
                    result.count = hashNumber;

                    client.replaceDocument(meetingsDocumentUrl, result, (error, result) => {
                        if (error) {
                            console.log("Writing hashID failed.");
                        } else {
                            console.log("Writing hashID succeeded.");
                        }
                    });
                    console.log("self data: " + self.data);
                    self.data.meetingId = id;
                    resolve(id);
                }
            })
        });
        
    }

    addHostAvailability(dateStart, dateEnd) {
        this
            .data
            .hostAvailability
            .push({"dateStart": dateStart, "dateEnd": dateEnd});
    }

    addFinalDate(dateStart, dateEnd) {
        this
            .data
            .finalDate = {"dateStart": dateStart, "dateEnd": dateEnd};
    }

    addAttendee(id, name) {
        this
            .data
            .attendees
            .push({"id": id, "response": 0, "name": name, "availableTimes": []});
    }

    addLocation(location) {
        this
            .data
            .meetingLocation = location;
    }

    addAgenda(agenda) {
        this
            .data
            .agenda = agenda;
    }

}

module.exports = Meeting;