const studentDetails = require('../model/studentDetailModel');


class LeaderBoardService{
    static async getLeaderBodardByRating(){
      try { 
        const leetcode = await studentDetails.find({
          "codingDetails": {
            $elemMatch: {
              platform:"leetcode"
            }
          }
        }).sort({"codingDetails.contest.leetcodeRating": -1}).limit(10);

        const codechef = await studentDetails.find({
          "codingDetails": {
            $elemMatch: {
              platform:"codechef"
            }
        }
        }).sort({"codingDetails.contest.codechefCurrentRating": -1}).limit(10);
        const codeforces = await studentDetails.find({
          "codingDetails": {
            $elemMatch: {
              platform:"codeforces"
            }
          }
        }).sort({"codingDetails.contest.codeforcesRating": -1}).limit(10);
        return {leetcode,codechef,codeforces};
      } catch (error) {
        throw error;
      }
    }
}


module.exports = LeaderBoardService;