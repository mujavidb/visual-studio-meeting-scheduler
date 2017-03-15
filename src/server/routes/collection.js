var express = require('express');
var router = express.Router();
var Collection = require('../functions/collections');
var Meetings = require('../functions/meetings');

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
// router.use('/:documentId/meeting/create', function (req, res, next) {

//     // Here will we conduct some error checking the POST body to make sure that it
//     // is correctly formed, and that it is of the expected format.
//     try {
//         // JSON.parse(req.body.meetingName);
//         // JSON.parse(req.body.attendees);
//         // JSON.parse(req.body.hostAvailability);
//         // JSON.parse(req.body.attendees); JSON.parse(req.body.hostAvailability);

//     } catch (error) {
//         res.send('Poorly-formed JSON.');
//         // res.send(error);
//     }

//     next();
// });


// GET all your meetings
router.get('/:documentId/meeting/get/:userId', function (req, res, next) {

    Meetings
        .getMeetings(req.params.documentId, req.params.userId)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        })

});

// GET hosted meetings
router.get('/:documentId/meeting/hosted/:userId', function(req, res, next) {
    Meetings
        .getHostedMeetings(req.params.documentId, req.params.userId)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        });
});

// Get an individual meeting
router.get('/:documentId/:meetingId/get', function(req, res, next) {

    Meetings
    .getMeeting(req.params.documentId, req.params.meetingId)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.send(error);
    });
});


// Add Attendees to meeting
router.post('/:documentId/:meetingId/attendees/add', function(req,res,next) {
    var accountId = req.params.documentId;
    var meetingId = req.params.meetingId;

    attendees = JSON.parse(req.body.attendees);

    console.log(attendees);

    Meetings.addAttendees(accountId, meetingId, attendees)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    })
});



router.post('/:documentId/meeting/create', function (req, res, next) {
    // console.log(testing);

    var query = "";

    

    console.log(req.body.meetingName);

    // Data from URL params
    var accountId = req.params.documentId;
    var meetingName = req.body.meetingName;

    // Data from POST body
    var attendees = req.body.attendees;
    var hostAvailability = req.body.hostAvailability;
    var hostId = req.body.hostId;

    // Need to check for correct structure of the POST body. If it is wrong then
    // send some sort of error. console.log(JSON.parse(attendees)); Data needed to
    // create a meeting Need to generate a unique meetingId.
    var meetingId;

    console.log("Calling createMeeting function");
    Meetings
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