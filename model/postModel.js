const db = require('../config/db');
const mongo = require('mongoose');

const {Schema} = mongo;

const postSchema = new Schema({
    title:{
        type:String,
        default:""
    },
    content:{
        type:String,
        default:""
    },
    postType:{
        type:String,
        default:""
    },
    postDate:{
        type:String,
        default:(new Date().toISOString())
    }
});


module.exports = db.model("posts",postSchema);