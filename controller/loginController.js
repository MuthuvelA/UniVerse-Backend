const loginService = require('../service/loginService');
const postService = require("../service/postService");
const { getByDeptYear } = require('../service/studentDetailService');

var placed = [],nonPlaced = [],intern = [];

const formateData = async(data)=>{
    try {
        data.forEach(element => {
            if(element.isPlaced) placed.push(element);
            else if(element.isIntern) intern.push(element);
            else nonPlaced.push(element);
        });
        
    } catch (error) {
        throw error;
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password ,type} = req.body;  
        var collection = "loginstudentdbs";
        if(type==="Teacher")  collection = "loginstaffdbs";
        if(type==="Admin") collection = "loginadmindbs";
        console.log(type + "  login : ",username,password);
        const user = await loginService.userLogin(username, password,collection);
        if (user) {
            var allPost = [];
            if(type==="Student"){
                const dept = `${username[2]+username[3]}E`;
                console.log("login Dept : ",dept);
                 allPost = await postService.getpost(dept);
            }
            if(type==='Student'){
                const userDetails = await loginService.getUserDetail(username);
            res.json({ status: true, message: "Login successful",post:allPost,userDetails});
            }else{
                if(type==='Teacher'){
                    const department = `${username[2]}${username[3]}E`;
                    const section = username[4];
                    var currentYear;
                    if(username[1]==1) currentYear = 'I';
                    else if(username[1]==2) currentYear = 'II';
                    else if(username[1]==3) currentYear = "III";
                    else currentYear = "IV";
                    const students = await getByDeptYear({department,currentYear,section});
                    placed = [];
                    nonPlaced = [];
                    intern = [];
                    await formateData(students);
                    console.log("staf : ",department);
                    res.json({ status: true, message: "Login successful",students,placed,nonPlaced,intern});
                }else{
                    res.json({ status: true, message: "Login successful"});
                }   
            }
        } else {
            res.status(401).json({ status: false, message: "Invalid credentials"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: "Server error" });
    }
};