const mongo = require('mongoose');
const db = require('../config/db');

const { Schema } = mongo;

const userSchema = new Schema({
    rollno:{
      type:String,
      unique:true,
      required:true
    },
    password:{
        type:String,
        required:true
    }
});


const 
loginModel = db.model('loginstudentdbs',userSchema);

module.exports = loginModel;