const db = require('../config/db');
const mongo = require('mongoose');

const {Schema} = mongo;

const postSchema = new Schema({
    username:{
        type:String,
        default:""
    },
    title:{
        type:String,
        default:""
    },
    content:{
        type:String,
        default:""
    },
    filter:{
        type:String,
        default:""
    },
    postDate:{
        type:String,
        default:(new Date().toISOString())
    },
    link:{
        type:String,
        default:""
    },
    createdAt:{
        type: Date, 
        default: Date.now
    },
    sessionExpiresAt:{
        type:Date,
        expires: 60,
        default:Date.now
    }
});


module.exports = db.model("posts",postSchema);