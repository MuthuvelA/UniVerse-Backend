const app = require("./app");
const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
});