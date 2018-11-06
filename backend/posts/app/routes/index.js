////////////////////////////////////////////////////////////////
///////////**** Routes for all the EJS Views/Pages ******///////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();

var postModel = require("../models/posts");
var userModel = require("../models/users");



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
/* GET posts page. */
router.get('/posts', function(req, res, next) {

    if(req.session.user) {
        postModel.find({})
                .populate({ path: 'user', select: 'name' })
                .populate({ path: 'comments.user', select: 'name' })
                .exec(function(err, docs) {
                    if(err) throw err;
                    console.log("the posts: ", docs);
                    res.render('posts', { posts: docs, user: req.session.user });
                });
    } else {
        res.redirect("/login");
    }
});

router.get('/login', function(req, res, next) {
    res.render('login');
});



module.exports = router;