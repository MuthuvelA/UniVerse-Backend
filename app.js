const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const userRouter = require('./router/userrouter');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/',userRouter);

module.exports = app;