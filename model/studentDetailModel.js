const mongo = require('mongoose');
const db = require('../config/db');

const { Schema } = mongo;

const studentDetailModel = new Schema({
    name: {
        type: String,
    },
    department:{
        type:String
    },
    section:{
        type:String
    },
    rollNo:{
        type:String,
        required:true,
        unique:true
    },
    currentYear:{
        type:String,
        default:""
    },
    emailAddress: {
        type: String,
        default:""
    },
    phoneNumber: {
        type: String,
        default:""
    },
    dateOfBirth: {
        type: Date,
        default:""
    },
    address: {
        type: String,
        default:""
    },
    fatherName: {
        type: String,
        default:""
    },
    motherName: {
        type: String,
        default:""
    },
    bloodGroup: {
        type: String,
        default:""
    },
    leetcode: {
        type: String,
        default:""
    },
    codechef:{
        type: String,
        default:""
    },
    codeforces: {
        type: String,
        default:""
    },
    aadhaarCardNumber: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    aadhaarCardLink: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    panCardNumber: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    panCardLink: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    drivingLicenseNumber: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    drivingLicenseLink: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    voterIdNumber: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    voterIdLink:  {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    passportNumber: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    passportLink: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    bankAccountNumber: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    },
    bankAccountLink: {
        // iv:{
        //     type:String,
        //     default:""
        // },
        // encryptedValue:{
        //     type:String,
        //     default:""
        // }
        type:String
    } ,
    codingDetails:{
        type:Array
    },
    invalidUserName:{
        type:Array,
        default:[]
    }
});

module.exports=db.model('studentdetaildbs',studentDetailModel);