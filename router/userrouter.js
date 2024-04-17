const loginController = require('../controller/loginController');
const studentDetailController=require('../controller/studentDetailController')
const router = require('express').Router();


router.post('/login', loginController.login);
router.post('/addstudentdetail',studentDetailController.createStudentDetail);
router.post('/updatestudentdetail',studentDetailController.updateStudentDetailByRollno);
router.post('/getstudentbyrollno',studentDetailController.getStudentDetailByRollno);
router.post('/getstudentbyyear',studentDetailController.getStudentDetailByYear);
router.post('/initUser',studentDetailController.initUserController);

module.exports = router;