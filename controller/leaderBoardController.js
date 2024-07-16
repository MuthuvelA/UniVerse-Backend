const leaderBoardService = require('../service/leaderBoardService');

var formatedLeetcode = [];
var formatedcodechef = [];
var formatedcodeforces = [];

const formateLeetcode = async(data)=>{
    data.forEach(element => {
        formatedLeetcode.push({username:element.name,rating:parseInt(element.codingDetails[0].contest.leetcodeRating)});
    });
}
const formateCodechef = async(data)=>{
    data.forEach(element => {
        formatedcodechef.push({username:element.name,rating:parseInt(element.codingDetails[1].contest.codechefCurrentRating)});
    });
}
const formateCodeforces = async(data)=>{
    data.forEach(element => {
        formatedcodeforces.push({username:element.name,rating:parseInt(element.codingDetails[2].contest.codeforcesRating)});
    });
}
exports.leaderBoard = async(req,res)=>{
    try {
        formatedLeetcode = [];
        formatedcodechef = [];
        formatedcodeforces = [];
        const leaderBoardData = await leaderBoardService.getLeaderBodardByRating();
        await formateCodechef(leaderBoardData.codechef);
        await formateLeetcode(leaderBoardData.leetcode);
        await formateCodeforces(leaderBoardData.codeforces);
        res.status(200).json({status:true,leetcode:formatedLeetcode,codeforces:formatedcodeforces,codechef:formatedcodechef});
    } catch (error) {
        res.status(404).json({status:false,message:error.message});
    }
}