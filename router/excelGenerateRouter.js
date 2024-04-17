const generateExcelController = require('../controller/excelGenerateController');
const router = require("express").Router();

router.post("/generateExcel",generateExcelController.GenerateExcel);

module.exports = router;