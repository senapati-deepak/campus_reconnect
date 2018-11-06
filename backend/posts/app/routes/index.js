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

    postModel.find({})
            .populate({ path: 'user', select: 'name' })
            .exec(function(err, docs) {
                if(err) throw err;
                console.log("the posts: ", docs);
                res.render('posts', {posts: docs});
            });
});



module.exports = router;