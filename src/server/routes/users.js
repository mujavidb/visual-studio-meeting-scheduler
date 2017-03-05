var express = require('express');
var router = express.Router();
var testRequest = require('../testRequest');




/* GET users listing. */
router.get('/', function (req, res, next) {
  // var res;
  testRequest.getDatabase().then((response) => {
    console.log('successful: ' +JSON.stringify(response));
    // res = response;
    res.send(JSON.stringify(response, null, '\t'));
  }).catch((error) => {
    console.log(error);
  });

  console.log('test');
  // res.send('respond with a resource');
  // res.send(res);
});

module.exports = router;