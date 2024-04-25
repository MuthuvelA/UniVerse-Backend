const post = require('../model/postModel');


class postService{
    static async getpost(dept){
        try {
            const deptPost = await post.find({postType:{$in:[dept,""]}});
            return deptPost;
        } catch (error) {
            throw error
        }
    }

    static async addPost(postValue){
        try {
            const newPost = new post(postValue);
            return await newPost.save();
        } catch (error) {
            throw error
        }
    }
}

module.exports = postService;