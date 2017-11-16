import express from 'express';
import logger from 'morgan';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import path from 'path';
import randomstring from 'randomstring';
import fs from 'fs';
import unirest from 'unirest';
import request from 'async-request';
import moment from 'moment-timezone';

//external module setting
let seoul_time = moment().tz("Asia/Seoul").subtract(1, 'days');

let debug = require('debug')('dicon:server');

let app = express();
let router = express.Router();

//module setting
import {Users, boxoffices} from './mongo';
let passport = require('./passport')(Users);

//function
require('./func');

var port = process.env.PORT || 3080;

//set engin
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router setting
var index = require('./routes/index')(express.Router(), Users);
var calendar = require('./routes/calendar')(express.Router());
var users = require('./routes/users')(express.Router(), Users);
var auth = require('./routes/auth')(express.Router(), Users, passport);
var news = require('./routes/news')(express.Router(), Users, request);
var movie = require('./routes/movie')(express.Router(), boxoffices, request, seoul_time);
var setting = require('./routes/movie')(express.Router(), Users);

//router setting
app.use('/calendar', calendar);
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/news', news);
app.use('/movie', movie);
app.use('/setting', setting);


//create server
app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

//error handle
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0)  return port;
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen')
    throw error;


    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  console.log(addr);

  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
