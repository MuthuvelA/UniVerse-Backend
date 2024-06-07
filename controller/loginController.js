const loginService = require('../service/loginService');
const postService = require("../service/postService");

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
            }else
            res.json({ status: true, message: "Login successful",post:allPost});
        } else {
            res.status(401).json({ status: false, message: "Invalid credentials"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: "Server error" });
    }
};