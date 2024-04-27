const loginController = require('../controller/loginController');
const studentDetailController=require('../controller/studentDetailController')
const codingProfileController=require('../controller/codingProfileController')
const router = require('express').Router();


router.post('/login', loginController.login);
router.post('/updatestudentdetail',studentDetailController.updateStudentDetailByRollno);
router.post('/getstudentbyrollno',studentDetailController.getStudentDetailByRollno);
router.post('/getstudentbyyear',studentDetailController.getStudentDetailByYear);
router.post('/initUser',studentDetailController.initUserController);
router.post('/getleetcode/',codingProfileController.getLeetcodeProfile);
router.post('/getcodechef/',codingProfileController.getCodechefProfile);
router.post('/getcodeforce/',codingProfileController.getCodeforcesProfile);
module.exports = router;