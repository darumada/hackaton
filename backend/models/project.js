var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('config')
  .get('development')
  .get('secret');

var ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "can't be blank"]
    },
    description: {
      type: String
    },
    image: String,
    status: String,
    cost: String,
    realizationDate: String,
    history: [],
    comments: []
  },
  { timestamps: true }
);

ProjectSchema.plugin(uniqueValidator, { message: 'is already taken.' });

mongoose.model('Project', ProjectSchema);
