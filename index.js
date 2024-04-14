const app = require("./app");
const db = require('./config/db')
const port = process.env.PORT || 3002;

app.get('/',(req,res)=>{
     res.send("sdfa");
});

app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
});