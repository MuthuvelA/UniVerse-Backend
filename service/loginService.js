const loginModel = require('../model/loginModel');

class loginService {
    static async userLogin(Rollno,Password) {
        try {
            let user;
            user = await loginModel.findOne({ rollno: Rollno, password:Password });
            return user;
        } catch (err) {
            throw err;
        }
    }   
}

module.exports = loginService;