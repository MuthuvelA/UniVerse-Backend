const mongo = require('mongoose');
const db = require('../config/db');

const { Schema } = mongo;

const userSchema = new Schema({
    name:{
      type:String
    },
    rollno:{
      type:String,
      required:true,
      unique:true
    },
    password:{
        type:String,
        required:true,
    }
});


const loginModel = db.model('loginstudentdbs',userSchema);

module.exports = loginModel;