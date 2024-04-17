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
        type: String,
        default:""
    },
    aadhaarCardLink: {
        type: String,
        default:""
    },
    panCardNumber: {
        type: String,
        unique: true,
        default:""
    },
    panCardLink: {
        type: String,
        default:""
    },
    drivingLicenseNumber: {
        type: String,
        unique: true,
        default:""
    },
    drivingLicenseLink: {
        type: String,
        default:""
    },
    voterIdNumber: {
        type: String,
        unique: true,
        default:""
    },
    voterIdLink:  {
        type: String,
    },
    passportNumber: {
        type: String,
        unique: true,
        default:""
    },
    passportLink: {
        type:String,
        default:""
    },
    bankAccountNumber: {
        type: String,
        unique: true,
        default:""
    },
    bankAccountLink: {
        type:String,
        default:""
    } ,
    codingDetails:{
        type:Array
    }
});

module.exports=db.model('studentdetaildbs',studentDetailModel);