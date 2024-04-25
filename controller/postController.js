const postService = require('../service/postService');

exports.addpost = async(req,res)=>{
    try {
        await postService.addPost(req.body);
        res.status(200).json({status:true,message:"added sucessfully..!"});
        
    } catch (error) {
        res.status(404).json({status:false,message:error.message});
    }
}