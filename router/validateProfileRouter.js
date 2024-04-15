const router = require('express').Router();
const validateCodingPlatform = require("../controller/validateCodingPrifileController");

router.post('/validateLeetcode',validateCodingPlatform.validateLeetcode);
router.post('/validateCodechef',validateCodingPlatform.validateCodechef);
router.post('/validateCodeforces',validateCodingPlatform.validateCodeforces);

module.exports = router;