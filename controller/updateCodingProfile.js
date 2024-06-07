const studentDetails = require('../service/studentDetailService');
const codingProfileController = require('../controller/codingProfileController');


async function formateValue(leetcode,codechef,codeforces){
      return struct = [
      {
        "platform": "leetcode",
        "contest": {
          "leetcodeNoContest": leetcode.leetcodeNoContest,
          "leetcodeRating": leetcode.leetcodeRating,
          "leetcodeRanking": leetcode.leetcodeRanking
        },
        "problemSolved": {
          "leetcodeTotal": leetcode.leetcodeTotal,
          "leetcodeEasy": leetcode.leetcodeEasy,
          "leetcodeMedium": leetcode.leetcodeMedium,
          "leetcodeHard": leetcode.leetcodeHard,
        }
      },
      {
        "platform": "codechef",
        "contest": {
          "codechefCurrentRating": codechef.codechefCurrentRating,
          "codechefGlobalRanking": codechef.codechefGlobalRanking,
          "codechefStarRating" : codechef.codechefStarRating
        },
        "problemSolved": {
          "codechefTotal": codechef.codechefTotal
        }
      },
      {
        "platform": "codeforces",
        "contest": {
          "position":codeforces.position,
          "codeforcesRating": codeforces.codeforcesRating
        },
        "problemSolved": {
          "codeforcesTotal": codeforces.codeforcesTotal
        }
      }
    ];
}

async function iterater(result){
    result.forEach(async (element)=>{
      var leetcode,codechef,codeforces;
      var invalidUserName = [];
      try{
       leetcode = (element.leetcode!=undefined && element.leetcode!="")?await codingProfileController.addLeetcode(element.leetcode):{ 
        leetcodeNoContest: 0,
        leetcodeRating: 0,
        leetcodeRanking: 0,
        leetcodeTotal: 0,
        leetcodeEasy: 0,
        leetcodeMedium: 0,
        leetcodeHard: 0
      };
    }catch(err){
      invalidUserName.push({platform:"leetcode",userName:element.leetcode});
       leetcode = {
        leetcodeNoContest: 0,
        leetcodeRating: 0,
        leetcodeRanking: 0,
        leetcodeTotal: 0,
        leetcodeEasy: 0,
        leetcodeMedium: 0,
        leetcodeHard: 0
       }
    }
    try {
       codechef = (element.codechef!=undefined && element.codechef!="")?await codingProfileController.addCodechef(element.codechef):{
        "codechefCurrentRating": 0,
        "codechefStarRating" : "",
        "codechefGlobalRanking": 0,
        "codechefTotal": 0
    };
    } catch (error) {
      invalidUserName.push({platform:"codechef",userName:element.codechef});
      codechef = {
        "codechefCurrentRating": 0,
        "codechefStarRating" : "",
        "codechefGlobalRanking": 0,
        "codechefTotal": 0
    };
    }
    try {
       codeforces =(element.codeforces!=undefined && element.codeforces!="")? await codingProfileController.addCodeforces(element.codeforces):{
        "position":"",
        "codeforcesRating": 0,
        "codeforcesTotal": 0
  };
    } catch (error) {
      invalidUserName.push({platform:"codeforces",userName:element.codeforces});
      codeforces = {
        "position":"",
        "codeforcesRating": 0,
        "codeforcesTotal": 0
      }
    }
      const formatedValue = await formateValue(leetcode,codechef,codeforces);
      console.log("Invalid data : " ,invalidUserName);
      await studentDetails.updateByRollno(element.rollNo,{codingDetails:formatedValue,invalidUserName},"studentdetaildbs");
      console.log("updated....!");
});
} 


const updateCodingProfile = async()=>{
      try {
        const result = await studentDetails.getAll();
        await iterater(result);
        // res.status(200).json({status:true,message:"updated Sucessfully"});
      } catch (error) {
        console.log("error : ",error.message);
        // res.status(404).json({status:false,message:error.message});
      }
}

module.exports = {iterater,updateCodingProfile};