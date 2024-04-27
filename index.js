const app = require("./app");
const db = require('./config/db');
const schedule = require('node-schedule');
const updateCodingProfile  = require('./controller/updateCodingProfile');
const port = process.env.PORT || 3002;
schedule.scheduleJob('10 14 * * *',async()=>{
    console.log("shedule start at : ",Date.now());
     await updateCodingProfile.updateCodingProfile();
     console.log("Job Canceled..!");
     schedule.cancelJob();
});
console.log("hello");
app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
});
