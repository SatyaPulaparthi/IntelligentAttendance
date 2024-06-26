var createError = require('http-errors');
var express = require('express');
var faceapi = require('face-api.js')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var { Canvas, Image } = require('canvas')
var fileUpload = require('express-fileupload')
faceapi.env.monkeyPatch({Canvas, Image})
var cors = require('cors')



var indexRouter = require('./routes/index');

var app = express();
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true
  })
)

async function loadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + '/models')
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + '/models')
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + '/models')
}
loadModels()

mongoose.connect('mongodb://localhost:27017/attendance')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
