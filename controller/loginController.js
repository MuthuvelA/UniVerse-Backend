const loginService = require('../service/loginService');
const postService = require("../service/postService");

exports.login = async (req, res) => {
    try {
        const { username, password ,type} = req.body;
        var collection = "loginstudentdbs";
        console.log(type);
        if(type==="Teacher")  collection = "loginstaffdbs";
        if(type==="admin") collection = "loginadmindbs";
        console.log("login : ",username,password);
        const user = await loginService.userLogin(username, password,collection);
        if (user) {
            const allPost = await postService.getpost("CCE");
            res.json({ status: true, message: "Login successful",post:allPost});
        } else {
            res.status(401).json({ status: false, message: "Invalid credentials"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: "Server error" });
    }
};