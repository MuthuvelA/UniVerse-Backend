const postService = require('../service/postService');


async function formateEndDate(endDate){
    try {
        var splitDate = endDate.split('-');
        var formatedEnd = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
        const endDate1 = new Date(formatedEnd);
        let endDateMillisecond = endDate1.getTime();
        let diff = endDateMillisecond;
        diff+=86400000;
        return diff;
    } catch (error) {
        throw error;
    }
}
async function formatePost(post){
    var dept;
    const endDateMillisecond = await formateEndDate(post.endDate.split(' ')[0]);
    if(parseInt(post.username[0])===0){
         dept = `${post.username[2]+post.username[3]}E`;
    }else dept = "*";
    return {
        username:post.username,
        title:post.title,
        filter:dept,
        content:post.content,
        link:post.link,
        sessionExpiresAt:endDateMillisecond
    }
}

exports.addpost = async(req,res)=>{
    try {
        const formatedPost = await formatePost(req.body);
        await postService.addPost(formatedPost);
        res.status(200).json({status:true,message:"added sucessfully..!"});
    } catch (error) {
        console.log(error.message);
        res.status(404).json({status:false,message:error.message});
    }
}