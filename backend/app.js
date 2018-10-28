var path = require('path');
var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var config = require('config').get('development');
var mongoose = require('mongoose');
var helmet = require('helmet');
var passport = require('passport');
require('./models/user');
require('./models/project');
require('./config/passport');

var api = require('./routes/api');

var app = express();

// enable cross platform request
if (app.get('env') === 'development') {
  app.use(logger('dev'));
  mongoose.set('debug', true);
} else {
  app.use(logger('common'));
  app.use(helmet());
}

app.use(cors());

mongoose.connect(config.get('db'));

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// use routing
app.use('/api', api);

app.listen(config.get('port') || 8000, () => {
  console.log(`Listening on http://localhost:${config.get('port') || 8000}`);
});
