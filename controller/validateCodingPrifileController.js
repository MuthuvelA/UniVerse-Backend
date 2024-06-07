const { validateProfile } = require("../service/codingProfileService")
const studentDetail = require('../service/studentDetailService')

exports.validateLeetcode = async(req,res)=>{
    try {
        const {username,rollNo} = req.body;
        var result = await validateProfile.checkLeetcode(username);
        console.log("result : " ,result);
        if(result===true){
            console.log("true");
            res.status(200).json({status:true,message:"username found and updated"});
        }else{
            console.log("false");
            res.status(400).json({status:false,message:"Username Not found"});
        }
    } catch (error) {
        console.log("false");
        res.status(400).json({status:false,message:error.message});
    }
}


exports.validateCodechef = async(req,res)=>{
    const {username,rollNo} = req.body;
    try {
        if(await validateProfile.checkcodeChef(username)){
            console.log("true");
             res.status(200).json({status:true,message:"username found"});
        }
        else{
             console.log("else");
             res.status(400).json({status:false,message:"Username Not found"});
            }
    } catch (error) {
        console.log("false");
        res.status(400).json({status:false,message:error.message});
    }
}

exports.validateCodeforces  =async(req,res)=>{
    const {username,rollNo}  =req.body;
    try {
        if(await validateProfile.checkCodeforces(username)){
            console.log("true");
            res.status(200).json({status:true,message:"username found"});
    }
        else res.status(400).json({status:false,message:"Username Not found"}); 
    } catch (error) {
        console.log("false");
        res.status(400).json({status:false,message:error.message});
    }
}