var documentClient = require('documentdb').DocumentClient;
var config = require('../config');
var url = require('url');

var client = new documentClient(config.endpoint, {"masterKey": config.primaryKey});

var HttpStatusCodes = {
    NOTFOUND: 404
};
var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;

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

exports.createDocument = function (accountId) {
    console.log('Creating Document for accountId: ' + accountId);

    var documentUrl = `${collectionUrl}/docs/${accountId}`
    console.log(documentUrl);

    var data = {
        "id": "huhu1",
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