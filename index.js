var express = require("express"),
    fs = require('fs'),
    port = process.env.PORT || 2595;
var favicon = require('static-favicon');
var path = require('path');	
var bodyParser = require('body-parser');
var logger = require('morgan');


var app = express();
var bookings = [];

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set("view options", {
    layout: false
});

//view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(express.static(path.join(__dirname, 'public'))); //to serve CSS & JS
//app.set('views', path.join(__dirname, 'public'));
//app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public'));
// used below code to render html files


//routes
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/test', function (req, res) {
    res.render('test.html');
});

app.get('/movies', function (req, res) {
    var movies = require('./data/movies.json');
    res.json(movies);
});

app.get('/bookings', function (req, res){
	res.json(bookings);
});

app.post('/book', function (req, res){
	var data = {
		'qty': req.body.qty,
		'date': req.body.date,
		'id': req.body.movie_id,
		'name': req.body.movie_name
	};
	bookings.push(data);
	res.json(bookings);	
});
 
app.listen(port);
console.log('Express server running at http://localhost:' + port);