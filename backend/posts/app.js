var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./app/routes/index');
var api = require('./app/routes/api');
var session 	= require('express-session');
var ioServer 	= require('./app/socket')(app);


var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  path: '/',
  secret: 'very secret',
  saveUninitialized: false,
  resave:false
}));
app.use(express.static(path.join(__dirname, 'public')));


//app.use(session);

app.use('/', index);
app.use('/api', api);


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/campus' , { useMongoClient: true })

var db = mongoose.connection;
db.once('open', function () {
  console.log("Connection to MongoDB succesful...");
}).on('error', function (error) {
  console.log("MongoDB connection error: ", error);
});


app.use(function(req, res, next) {
    res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});

app.listen(port,function(){
  console.log("Server running at port "+ port);
});