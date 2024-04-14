const loginModel = require('../model/loginModel');

class loginService {
    static async userLogin(rollno,password) {
        try {
            let user;
            user = await loginModel.findOne({ rollno: rollno, password:password });
            return user;
        } catch (err) {
            throw err;
        }
    }   
}

module.exports = userService;