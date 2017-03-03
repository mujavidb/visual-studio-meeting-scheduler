var config = require('../config');

var documentClient = require('documentdb').DocumentClient;
var client = new documentClient(config.endpoint, {"masterKey": config.primaryKey});

var url = require('url');

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

exports.getMeetings = function (accountId, userId) {
    var documentUrl = `${collectionUrl}/docs/${accountId}`;

    // Build query
    var queryString = "SELECT\
                        m AS meetings\
                       FROM\
    " +
            "                    AccountsCollection c\
                       JOIN m IN c.mee" +
            "tings\
                       JOIN a IN m.attendees\
                       WHER" +
            "E\
                        a.id IN (@userId)";

    // console.log(typeof userId);

    var query = {
        "query": queryString,
        "parameters": [
            {
                "name": "@userId",
                "value": userId
            }
        ]
    };

    return new Promise((resolve, reject) => {
        client
            .queryDocuments(collectionUrl, query)
            .toArray((error, results) => {
                if (error) {
                    // console.log("Something not found, not sure what");
                    reject(error);
                } else {
                    resolve(results);
                }
            });

    });
};



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