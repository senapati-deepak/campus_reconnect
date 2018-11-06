var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser = require('body-parser');

var index = require('./app/routes/index');
var api = require('./app/routes/api');
// var session 	= require('./app/session');
var ioServer 	= require('./app/socket')(app);

var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//app.use(session);

app.use('/', index);
app.use('/api', api);

app.use(function(req, res, next) {
    res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});

ioServer.listen(port);