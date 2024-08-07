const loginController = require('../controller/loginController');
const studentDetailController=require('../controller/studentDetailController')
const update  =require('../controller/updateCodingProfile');
const router = require('express').Router();


router.post('/login', loginController.login);
router.post('/getstudentdetail',studentDetailController.getAllStudentDetails);
router.post('/updateStudentDetail',studentDetailController.updateStudentDetailByRollno);
router.post('/getStudentbyRollno',studentDetailController.getStudentDetailByRollno);
router.post('/getstudentbyyear',studentDetailController.getStudentDetailByYear);
router.post('/initUser',studentDetailController.initUserController);
router.post('/updateCoding',update.updateCodingProfile);

module.exports = router;