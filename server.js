// A tiny node app that responds on the port numder in the file data/port.
// Note that since we rsync_exclude that folder you can have one in your
// git repository for testing in dev environments

// Use express just to demonstrate that we can install npm modules on the
// remote server. You don't have to use Express
/**
 * Module dependencies.
 */
require('newrelic');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var fs = require('fs');

// Get the port number from data/port. Watch out for trailing whitespace
// 'forever' may change the current working directory on us when we use a full path,
// so use __dirname to locate ourselves instead

var port;
try
{
    // In staging and production get the port number from stagecoach
    port = fs.readFileSync(__dirname + '/data/port', 'UTF-8').replace(/\s+$/, '');
} catch (err)
{
    // This is handy in a dev environment
    console.log("I see no data/port file, defaulting to port 3000");
    port = 3000;
}



// all environments
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/register', routes.register);

app.listen(port);