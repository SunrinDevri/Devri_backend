import mongoose from 'mongoose';
import rndString from "randomstring";

var name = require('../package.json');
var db = mongoose.connect('mongodb://localhost/'+name.name);
mongoose.Promise = global.Promise;

var UsersSchema = mongoose.Schema({
  id: {type: String},
  passwd: {type: String},
  nick_name: {type: String},
  days: {type: Number},
  favor: {type: Number},
  health: {type: Number},
  dev_availity: {type: Number},
});


require('./err')(UsersSchema, rndString);

var Users = mongoose.model("users", UsersSchema);

exports.Users = Users;

export default db;
