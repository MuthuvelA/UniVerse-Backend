const mongo = require('mongoose');
const db = require('../config/db');

const { Schema } = mongo;

const studentDetailModel = new Schema({
    name: {
        type: String,
        required: true
    },
    rollno:{
        type:String,
        required:true,
        unique:true
    },
    currentyear:{
        type:String,
        required:true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    parentName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    leetCode: {
        type: String,
        required: true,
        unique: true
    },
    codeChef:{
        type: String,
        required: true,
        unique: true
    },
    codeforces: {
        type: String,
        required: true,
        unique: true
    },
    aadhaarCardNumber: {
        type: String,
        required: true,
        unique: true
    },
    aadhaarCardLink: {
        type: String,
        required: true,
    },
    panCardNumber: {
        type: String,
        unique: true
    },
    panCardLink: {
        type: String,
        required: true,
    },
    drivingLicenseNumber: {
        type: String,
        unique:true
    },
    drivingLicenseLink: {
        type: String,
    },
    voterIdNumber: {
        type: String,
        unique: true
    },
    voterIdLink:  {
        type: String,
    },
    passportNumber: {
        type: String,
        unique: true
    },
    passportLink: {
        type:String,
    },
    bankAccountNumber: {
        type: String,
        unique: true
    },
    bankAccountLink: {
        type:String
    }
});

module.exports=db.model('studentdetaildbs',studentDetailModel);