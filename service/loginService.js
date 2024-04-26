const db = require('../config/db');

class loginService {
    static async userLogin(name,Password,col) {
        try {
            const collection = db.collection(col);
            console.log("collection : ",col);
            const user = await collection.findOne({ username: name, password:Password});
            console.log("User ",user);
            return user;
        } catch (err) {
            throw err;
        }
    }   
}

module.exports = loginService;