const db = require('../config/db');

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
}

module.exports = loginService;