////////////////////////////////////////////////////////////////
///////////**** Routes for all the API calls ******/////////////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();

/* Importing all the controllers. */ 

/* To test api route is working. */
router.get('/', function(req, res, next) {
  res.send('API is working');
});






module.exports = router;