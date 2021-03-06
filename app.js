var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var fs = require("fs");
var passport= require('passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
//안녕
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
app.use(express.static('public'));

require('./config/passport')(passport);
var flash = require('connect-flash');
app.use(flash());

mongoose.connect('mongodb://admin1:admin1@ds123664.mlab.com:23664/gsmwebapp',{ useNewUrlParser: true })
mongoose.Promise = global.Promise; 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connnected to mongod server");
});

var index = require('./router/index');
app.use('/', index);

var api = require('./router/api');
app.use('/api', api);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000");
});