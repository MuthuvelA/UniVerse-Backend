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
            console.log("waste");
            res.status(404).json({status:false,message:"Username Not found"});
        }
    } catch (error) {
        res.status(404).json({status:false,message:error.message});
    }
}


exports.validateCodechef = async(req,res)=>{
    const {username,rollNo} = req.body;
    try {
        if(await validateProfile.checkcodeChef(username)){
             res.status(200).json({status:true,message:"username found"});
        }
        else res.status(404).json({status:false,message:"Username Not found"});
    } catch (error) {
        res.status(404).json({status:false,message:error.message});
    }
}

exports.validateCodeforces  =async(req,res)=>{
    const {username,rollNo}  =req.body;
    try {
        if(await validateProfile.checkCodeforces(username)){
            res.status(200).json({status:true,message:"username found"});
    }
        else res.status(404).json({Status:false,message:"Username Not found"}); 
    } catch (error) {
        res.status(404).json({status:false,message:error.message});
    }
}