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

// Create a document for your account in collection
router.get('/document/create', function (req,res, next) {
    Collection
        .createDocument('test')
        .then((response) => {
            console.log('success');
            res.send(response);
        })
        .catch((error) => {
            console.log('error');
            res.send(error);
        });
})

module.exports = router;