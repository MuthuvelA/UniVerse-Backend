const db = require('../config/db');
const userDetails = require('../model/studentDetailModel');

class loginService {
    static async userLogin(name,Password,col) {
        try {
            const collection = db.collection(col);
            const user = await collection.findOne({ username: name, password:Password});
            return user;
        } catch (err) {
            throw err;
        }
    }  
    
    static async getUserDetail(rollNo){
        try {
            const data = await userDetails.findOne({rollNo});
            return data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = loginService;