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

// Create meeting. Note that documentId is the same as the VSTS accountId.
// Middleware
router.use('/:documentId/meeting/create/:meetingName', function (req, res, next) {

    // Here will we conduct some error checking the POST body to make sure that it
    // is correctly formed, and that it is of the expected format.
    try {
        JSON.parse(req.body.attendees);
        JSON.parse(req.body.hostAvailability);
        // JSON.parse(req.body.attendees); JSON.parse(req.body.hostAvailability);

    } catch (error) {
        res.send('Poorly-formed JSON.');
        // res.send(error);
    }

    next();
});

router.get('/:documentId/meeting/get/:userId', function (req, res, next) {

    Collection
        .getMeetings(req.params.documentId, req.params.userId)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        })

});

router.post('/:documentId/meeting/create/:meetingName', function (req, res, next) {
    // console.log(testing);

    var query = "";

    // Data from URL params
    var accountId = req.params.documentId;
    var meetingName = req.params.meetingName;

    // Data from POST body
    var attendees = JSON.parse(req.body.attendees);
    var hostAvailability = JSON.parse(req.body.hostAvailability);
    var hostId = req.body.hostId;

    // Need to check for correct structure of the POST body. If it is wrong then
    // send some sort of error. console.log(JSON.parse(attendees)); Data needed to
    // create a meeting Need to generate a unique meetingId.
    var meetingId

    console.log("Calling createMeeting function");
    Collection
        .createMeeting(accountId, hostId, meetingId, meetingName, query, hostAvailability, attendees)
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