import mongoose from 'mongoose';
import rndString from "randomstring";

var name = require('../package.json');
var db = mongoose.connect('mongodb://localhost/'+name.name);
mongoose.Promise = global.Promise;

var UsersSchema = mongoose.Schema({
  pin: {type: String},
  code: {type: String},
  favorait: {
    movie:{
      kind: {type: String}
    },
    music:{
      kind: {type: String}
    },
    attractions:{
      kind: {type: String}
    },
    book:{
      kind: {type: String}
    },
    news:{
      kind: {type: String}
    }
  },
  habitat: {type: String},
  english:{
    kind: {type: String}
  }
});

var boxofficeSchema = mongoose.Schema({
  date: String,
  boxofficeType: String,
  showRange: String,
  dailyBoxOfficeList: [{
    rank: String,
    rankInten: String,
    rankOldAndNew: String,
    movieNm: String,
    openDt: String,
    salesAcc: String,
    audiCnt: String,
    audiInten: String,
    audiChange: String,
    audiAcc: String,
    scrnCnt: String,
    showCnt: String
  }]
});

var MusicsSchema = mongoose.Schema({
  Artist: String,
  Title: String,
  Genre: String
});

var ToursSchema = mongoose.Schema({
  Region: String,
  Name: String,
  CATEGORY: String,
  COMMENT: String,
  GPS: [String]
});

var WordsSchema = mongoose.Schema({
  WORD: String,
  MEAN: String
});

require('./err')(UsersSchema,boxofficeSchema,rndString);

var Users = mongoose.model("users", UsersSchema);
var boxoffices = mongoose.model("boxoffices", boxofficeSchema);
var Tours = mongoose.model("tours", ToursSchema);
var Words = mongoose.model("woreds", WordsSchema);

exports.Users = Users;
exports.boxoffices = boxoffices;
exports.Tours = Tours;
exports.Words = Words;

export default db;
