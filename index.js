const app = require("./app");
const db = require('./config/db');
const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
});