var express = require('express');
var router = express.Router();
var Collection = require('../functions/collections');

// Create collection
router.get('/create', function (req, res, next) {

    Collection
        .getCollection()
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        })
        // res.send('collection');
})

// Create a document for your account in collection use this when an account
// doesn't currently exist for TS account. change this to post when we want to
// handle authentication <-----!!!!!!!!!!!!!!!!!!
router.get('/document/create/:documentId', function (req, res, next) {

    Collection
        .createDocument(req.params.documentId)
        .then((response) => {
            console.log('successfully created: ' + req.params.documentId);
            res.send(response);
        })
        .catch((error) => {
            console.log('error');
            res.send(error);
        });
})

router.get('/:documentId/meeting/create/:meetingId', function (req, res, next) {
    console.log('we creating shit');

    var query = "";

    Collection
    .createMeeting('test', query)
    .then((response) => {
        console.log('ok');
        res.send(response);
    })
    .catch((error) => {
        // console.log(error);
        res.send(error);
    });
});

module.exports = router;