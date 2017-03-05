// var exports = module.exports = {};

// DocumentDB stuff
var documentClient = require('documentdb').DocumentClient;
var config = require('./config');
var url = require('url');

var client = new documentClient(config.endpoint, {"masterKey":config.primaryKey});

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;



exports.getDatabase = function() {
    console.log(`Getting database:\n${config.database.id}\n`);

    return new Promise((resolve, reject) => {
        client.readDatabase(databaseUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDatabase(config.database, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
}

exports.getCollection = function() {
    console.log('Getting collection:\n${config.collection.id}\n');

    return new Promise((resolve, reject) => {
        client.readCollection(collectionUrl, (error, result) => {
            if (error.code == HttpStatusCodes.NOTFOUND) {
                client.createCollection(databaseUrl, config.collection, {offerThroughput: 400}, (error, created) => {
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


function exit(message) {
    console.log(message);
    console.log('Press any key to exit');
    // process.stdin.setRawMode(true);
    // process.stdin.resume();
    // process.stdin.on('data', process.exit.bind(process, 0));
}

// getDatabase()
// .then(() => { console.log('successful'); })
// .catch((error) => { console.log('Unsuccessful: ' + error); });


