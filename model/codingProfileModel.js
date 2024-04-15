const db = require('../config/db');
const mongo = require('mongoose');

const {Schema} = mongo;

const codingProfileModel = new Schema({
    rollNo:{
        type:String,
        required:true,
        unique:true
    },
    details:{
        platform:{
            type:String,
        },
        contest:{
            noContest:{
                type:Number,
                default:0,
            },
            rating:{
                type:Number,
                default:0
            },
            ranking:{
                type:Number,
                default:0
            }
        },
        problemSolved:{
            total:{
                type:Number,
                default:0
            },
            easy:{
                type:Number,
                default:0
            },
            medium:{
                type:Number,
                default:0
            },
            hard:{
                type:Number,
                default:0
            }
        }
    }
});

module.exports = db.model("codingProfiles",codingProfileModel);