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
    department:{
        type:String,
        required:true
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
    leetCode: {
        type: String,
        default:""
    },
    codeChef:{
        type: String,
        default:""
    },
    codeforces: {
        type: String,
        default:""
    },
    aadhaarCardNumber: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    aadhaarCardLink: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    panCardNumber: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    panCardLink: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    drivingLicenseNumber: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    drivingLicenseLink: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    voterIdNumber: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    voterIdLink:  {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    passportNumber: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    passportLink: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    bankAccountNumber: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    },
    bankAccountLink: {
        iv:{
            type:String,
            default:""
        },
        encryptedValue:{
            type:String,
            default:""
        }
    } ,
    codingDetails:{
        type:Array
    }
});

module.exports=db.model('studentdetaildbs',studentDetailModel);