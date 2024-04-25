const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const userRouter = require('./router/userrouter');
const validateCodingPlatformRouter = require('./router/validateProfileRouter');
const generateExcelRouter = require('./router/excelGenerateRouter');
const postRouter = require('./router/postRouter');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/',userRouter);
app.use('/',postRouter);
app.use('/',validateCodingPlatformRouter);
app.use('/',generateExcelRouter);

module.exports = app;