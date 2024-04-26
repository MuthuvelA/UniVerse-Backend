const router = require('express').Router();
const addPostController  = require('../controller/postController');

router.post('/addPost',addPostController.addpost);

module.exports = router;