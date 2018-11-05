////////////////////////////////////////////////////////////////
///////////**** Routes for all the API calls ******/////////////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;


var postModel = require("../models/posts");
var userModel = require("../models/users");

/* Importing all the controllers. */ 


/* To test api route is working. */
router.get('/', function(req, res, next) {
  res.send('API is working');
});

router.post('/new-post', function(req, res, next) {
  var post = {
    body: req.body.postBody,
    user: ObjectId("5bdea39d406abab46426fbee"),
    date: "11/10/18"
  };
  var newPost = new postModel(post);
  newPost.save(function(err, doc) {
    if (err) throw err;
    res.json(doc);
  });
});



router.post('/new-like', function(req, res, next) {
  var id = req.body.id;
  var t = req.body.action ? 1 : -1;
  postModel.findById(id, function(err, doc) {
    if(err) throw err;
    doc.likes += t;
    doc.save(function(err, doc) {
      if(err) throw err;
      console.log(doc);
      res.send("Like updated successfully!"); 
    });
  });
});

router.post('/new-comment', function(req, res, next) {
  var id = req.body.id;
  var msg = req.body.msg;
  postModel.findById(id, function(err, doc) {
    if(err) throw err;
    doc.comments.push(msg);
    doc.save(function(err, doc) {
      if(err) throw err;
      console.log(doc);
      res.send("Comments updated successfully!"); 
    });
  });
});




module.exports = router;