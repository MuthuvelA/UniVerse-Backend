const postService = require('../service/postService');

async function formatePost(post){
    var dept;
    if(parseInt(post.username[0])===0){
         dept = `${post.username[2]+post.username[3]}E`;
    }else dept = "";
    return {
        title:post.title,
        filter:post.filter,
        content:post.content,
        postType:dept

    }
}

exports.addpost = async(req,res)=>{
    try {
        const formatedPost = await formatePost(req.body);
        console.log("Add post : ",formatedPost);
        await postService.addPost(formatedPost);
        res.status(200).json({status:true,message:"added sucessfully..!"});
        
    } catch (error) {
        res.status(404).json({status:false,message:error.message});
    }
}