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

exports.updateCodingProfile = async()=>{
      try {
        const result = await studentDetails.getAll();
        result.forEach(async (element)=>{
          const leetcode = (element.leetCode!=undefined && element.leetCode!="")?await codingProfileController.addLeetcode(element.leetCode):{ 
            leetcodeNoContest: 0,
            leetcodeRating: 0,
            leetcodeRanking: 0,
            leetcodeTotal: 0,
            leetcodeEasy: 0,
            leetcodeMedium: 0,
            leetcodeHard: 0
          };
          const codechef = (element.codeChef!=undefined && element.codeChef!="")?await codingProfileController.addCodechef(element.codeChef):{
              "codechefCurrentRating": 0,
              "codechefStarRating" : "",
              "codechefGlobalRanking": 0,
              "codechefTotal": 0
          };
          const codeforces =(element.codeforces!=undefined && element.codeforces!="")? await codingProfileController.addCodeforces(element.codeforces):{
                "position":"",
                "codeforcesRating": 0,
                "codeforcesTotal": 0
          };
          const formatedValue = await formateValue(leetcode,codechef,codeforces);
          console.log(formatedValue);
          await studentDetails.updateByRollno(element.rollNo,{codingDetails:formatedValue});
        });
        //res.status(200).json({message:"updated Sucessfully"});
        
      } catch (error) {
        console.log("error : ",error.message);
        //res.status(404).json({message:error.message});
      }
}