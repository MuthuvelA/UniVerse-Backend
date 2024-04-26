const db = require('../config/db');
const mongo = require('mongoose');

const {Schema} = mongo;

const staffDetailSchema = new Schema({

});

module.exports = db.model("staffDetaildbs",staffDetailSchema);