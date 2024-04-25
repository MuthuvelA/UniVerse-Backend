const mongo = require('mongoose');
const db = require('../config/db');

const { Schema } = mongo;

const staffSchema = new Schema({
    userName:{
      type:String
    },
    rollNo:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true,
    }
});


const loginModel = db.model('loginstaffdbs',staffSchema);

module.exports = loginModel;