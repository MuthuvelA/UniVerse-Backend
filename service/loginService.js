const loginModel = require('../model/loginModel');
const test = require('../controller/codingProfileController');
const {validateProfile} = require('../service/codingProfileService');

class loginService {
    static async userLogin(Rollno,Password) {
        try {
            let user;
            user = await loginModel.findOne({ rollno: Rollno, password:Password });
            await test.addLeetcode();
            await test.addCodechef("kamaleshbala");
            await test.addCodeforces("Kamalesh_bala");
            await validateProfile.checkLeetcode("Muthuvel__A");
            return user;
        } catch (err) {
            throw err;
        }
    }   
}

module.exports = loginService;