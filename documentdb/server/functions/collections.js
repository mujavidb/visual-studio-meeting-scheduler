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

exports.createMeeting = function (meetingName, query) {

    // var documentUrl = `${collectionUrl}/docs/${accountId}`; var documentUrl =
    // `${collectionUrl}/docs/tester`; "query": "SELECT * FROM meetings m WHERE
    // m.hostId = @hostId",
    
    var queryString = "SELECT\
                        m as meetings\
                       FROM AccountsCollection c\
                       JOIN m IN c.meetings\
                       WHERE c.id = @accountId AND m.hostId = @hostId";
// queryString =  "SELECT c.id AS accountId, m AS meetings FROM AccountsCollection c JOIN m IN c.meetings WHERE  c.id = @accountId m.hostId = 1234";

    var query1 = {
        "query": queryString,
        "parameters": [
            {
                "name": "@hostId",
                "value": "1234"
            },
            {
                "name": "@accountId",
                "value": 'test1'
            }
        ]
    };

    // console.log(documentUrl);

    return new Promise((resolve, reject) => {

        client
            .queryDocuments(collectionUrl, query1)
            .toArray((error, results) => {

                // if (error) 
                //     reject(error)
                // else {
                //     for (var queryResult of results) {
                //         let resultString = JSON.stringify(queryResult);
                //         console.log(`\tQuery returned ${resultString}`);
                //     }
                //     console.log();
                //     resolve(results);
                // }
                resolve(results);
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
            },
            {
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