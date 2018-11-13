////////////////////////////////////////////////////////////////
///////////**** Routes for all the API calls ******/////////////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;


var postModel = require("../models/posts");
var userModel = require("../models/users");
var eventModel = require("../models/events");

/* Importing all the controllers. */ 


/* To test api route is working. */
router.get('/', function(req, res, next) {
  res.send('API is working');
});

router.post('/login', function(req, res, next) {
  var email = req.body.email.toLowerCase().trim();
  var password = req.body.password;
  console.log("email", email);
  console.log("password", password);

  if((email === "cetadmin@mail.com") && (password === "cet")) {
    req.session.user = "admin";
    req.session.institute = "5be9bd88a049a3ba47efa411";
    res.json({ success: true, errorMsg: "", admin: true });
  } else {
  userModel.findOne({ email: email})
                  .populate('institutes')
                  .exec(function(err, doc) {
                    if(err) throw err;
                    if(!doc) {
                      res.json({ success: false, errorMsg: "Email not registered!" });
                    } else {
                      if(doc.password !== password) {
                        res.json({ success: false, errorMsg: "Wrong Password Entered!" });
                      } else {
                        req.session.user = doc;
                        req.session.institute = doc["institutes"][0]._id;
                        delete req.session.user["password"];
                        res.json({ success: true, errorMsg: "" });
                      }
                    }
                  });
  }
});


router.post('/new-post', function(req, res, next) {
  var post = {
    body: req.body.postBody,
    user: ObjectId(req.session.user._id),
    date: new Date(),
    institute: ObjectId(req.session.institute)
  };
  var newPost = new postModel(post);
  newPost.save(function(err, postDoc) {
    if (err) throw err;
    userModel.findById(postDoc.user, function(err, userDoc) {
      userDoc.posts.push(ObjectId(postDoc._id));
      userDoc.save(function(err) {
        if(err) throw err;
        res.json(postDoc);
      });
    });
  });
});

router.post('/event-response', function(req, res, next) {
  var eid = req.body.eid;
  var aor = req.body.aor;
  if(aor === "a") {
    eventModel.findByIdAndUpdate(eid, {isApproved: true}, function(err, doc) {
      if(err) throw err;
      res.send("Event accepted successfully!"); 
    });
  } else {
    eventModel.deleteOne({_id: ObjectId(eid)}, function(err, doc) {
      if(err) throw err;
      res.send("Event deleted successfully!"); 
    });
  }
});

router.post('/create-event', function(req, res, next) {
  var data = req.body;
  data["institute"] = ObjectId(req.session.institute);
  if(req.session.user !== "admin")
    data["poster"] = req.session.user;
  var newEvent = new eventModel(data);
  newEvent.save(function(err, doc) {
    if(err) throw err;
    console.log(doc);
    res.json(doc);
  });
});


router.post('/new-like', function(req, res, next) {
  var id = req.body.id;
  postModel.findById(id, function(err, doc) {
    if(err) throw err;
    if(req.body.action === "true") { 
      doc.likes.push(ObjectId(req.session.user._id));
    } else {
      doc.likes.splice(doc.likes.indexOf(req.session.user._id), 1);
    }
    console.log("Length", req.body);
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
    doc.comments.push({user: ObjectId(req.session.user._id), comment: msg});
    console.log("HAHA", doc.comments[0]);
    doc.save(function(err, doc) {
      if(err) throw err;
      console.log(doc);
      res.send("Comments updated successfully!"); 
    });
  });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.send("Logged out successfully!");
});

router.get('/del-post/:id', function(req, res, next) {
  postModel.findByIdAndDelete(req.params.id, function(err, doc) {
    if(err) throw err;
    res.send("Post Deleted Successfull!");
  });
});

router.get('/del-comm/:pid/:cid', function(req, res, next) {
  postModel.findById(req.params.pid, function(err, doc) {
    if(err) throw err;
    for(var i = 0; i < doc.comments.length; i++) {
      console.log(req.params.pid);
      console.log(req.params.cid);
      console.log(doc.comments[i]._id);
      if(doc.comments[i]._id == req.params.cid) {
        console.log("Found");
        doc.comments.splice(i, 1);
        break;
      }
    }
    doc.save(function(err) {
      if(err) throw err;
      res.send("Successfully Deleted Comment!");
    });
  });
});


router.get("/change-workplace/:iid", function(req, res, next) {
  var iid = req.params.iid;
  req.session.institute = iid;
  res.send("workplace changed successfully!");
});



module.exports = router;