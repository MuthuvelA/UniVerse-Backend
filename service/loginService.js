const loginModel = require('../model/loginModel');

const test = require('../controller/codingProfileController');
const {validateProfile} = require('../service/codingProfileService');

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