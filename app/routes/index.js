////////////////////////////////////////////////////////////////
///////////**** Routes for all the EJS Views/Pages ******///////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var ObjectId = mongoose.Types.ObjectId;

var postModel = require("../models/posts");
var userModel = require("../models/users");
var roomModel = require("../models/rooms");
var eventModel = require("../models/events");
var instituteModel = require("../models/institutes");



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
/* GET alum_locator page. */
router.get('/alum-locator', function(req, res, next) {
    if (req.session.user) {
        res.render('alum_locator', { userSession: req.session.user });
    } else {
        res.redirect("/");
    }
});
/* GET admin-page page. */
router.get('/institute/:id', function(req, res, next) {
    if (req.session.user) {
        instituteModel.findById(req.params.id)
            .exec(function(err, iDoc) {
                if (!iDoc) {
                    res.send("No Such Institute Found!");
                } else {
                    postModel.find({ institute: ObjectId(req.params.id) })
                            .exec(function(err, pdocs) {
                                if(err) throw err;
                                console.log(pdocs);
                                eventModel.find({ institute: ObjectId(req.params.id) })
                                        .populate("poster", "name")
                                        .exec(function(err, edocs) {
                                if(err) throw err;
                                console.log(edocs);
                                res.render("institute", { institute: iDoc, userSession: req.session.user, curri: req.session.institute, posts: pdocs, events: edocs });
                            });
                    });
                }
        });
    } else {
        res.redirect("/");
    }
});
/* GET events page. */
router.get('/events', function(req, res, next) {
    if(req.session.user) {
        eventModel.find({ institute: ObjectId(req.session.institute) }, function(err, docs) {
            if(err) throw err;
            console.log(docs);
            res.render('events', { events: docs, userSession: req.session.user, curri: req.session.institute });;
        });
    } else {
        res.redirect("/");
    }
});

/* GET profile page. */
router.get('/profile/:id', function(req, res, next) {
    if (req.session.user) {
        userModel.findById(req.params.id)
            .populate({ path: "posts", populate: { path: "comments.user" } })
            .exec(function(err, userDoc) {
                if (!userDoc) {
                    res.send("No Such User Found!");
                } else {
                    res.render("profile", { userProfile: userDoc, userSession: req.session.user });
                }
            });
    } else {
        res.redirect("/");
    }
});
/* GET posts page. */
router.get('/dashboard', function(req, res, next) {

    if (req.session.user) {
        postModel.find({ institute: ObjectId(req.session.institute) })
            .populate({ path: 'user' })
            .populate({ path: 'comments.user' })
            .exec(function(err, docs) {
                if (err) throw err;
                console.log("the posts: ", docs);
                res.render('dashboard', { posts: docs, userSession: req.session.user, curri: req.session.institute });
            });
    } else {
        res.redirect("/");
    }
});


router.get('/chat', function(req, res, next) {
    if (req.session.user) {
        roomModel.find({ institute: ObjectId(req.session.institute) }, { $where: "this.members.length > 2" })
            .populate("members", "name")
            .exec(function(err, rdocs) {
                if (err) throw err;
                console.log(rdocs);
                userModel.find({ institutes: ObjectId(req.session.institute), _id: { $ne: ObjectId(req.session.user._id) } })
                    .exec(function(err, udocs) {
                        if (err) throw err;
                        console.log(udocs);
                        res.render('chat_room', { rooms: rdocs, iusers: udocs, userSession: req.session.user, curri: req.session.institute });
                    });
            });
    } else {
        res.redirect("/");
    }
});



module.exports = router;