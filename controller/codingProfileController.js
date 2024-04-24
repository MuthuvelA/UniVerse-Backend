const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;


async function formateLeetcode(data){
    return {
        leetcodeNoContest:data.userContestRanking.attendedContestsCount,
        leetcodeRanking : data.userContestRanking.globalRanking,
       leetcodeRating : data.userContestRanking.rating,
       leetcodeTotal : data.matchedUserStats.submitStats.acSubmissionNum[0].count,
       leetcodeEasy : data.matchedUserStats.submitStats.acSubmissionNum[1].count,
       leetcodeMedium : data.matchedUserStats.submitStats.acSubmissionNum[2].count,
       leetcodeHard : data.matchedUserStats.submitStats.acSubmissionNum[3].count
    }
}

function formateCodechef(document){
   const problem = parseInt(document.querySelector(".rating-data-section.problems-solved").children[0].innerHTML.match(/\((\d+)\)/)[1])+parseInt(document.querySelector(".rating-data-section.problems-solved").children[2].innerHTML.match(/\d+/)[0]);
  return {
           codechefName: document.querySelector('.user-details-container').children[0].children[1].textContent,
           codechefCurrentRating: parseInt(document.querySelector(".rating-number").textContent),
           codecheHhighestRating: parseInt(document.querySelector(".rating-number").parentNode.children[4].textContent.split('Rating')[1]),
           codechefGlobalRanking: parseInt(document.querySelector('.rating-ranks').children[0].children[0].children[0].children[0].innerHTML),
           codechefCountryRank: parseInt(document.querySelector('.rating-ranks').children[0].children[1].children[0].children[0].innerHTML),
           codechefStarRating: document.querySelector('.rating').textContent || "unrated",
           codechefTotal :problem
  }
}

function formateCodeforces(document){
   const newrating = Array.from(document.querySelectorAll('.user-gray'));
   return{
    codeforcesTotal:parseInt(document.querySelector('._UserActivityFrame_footer').children[0].children[0].children[0].innerHTML.match(/\d+/)[0]),
    codeforcesRating: parseInt(newrating[6].innerHTML),
    position: newrating[4].innerHTML.trim()
   }
}


class codingPrifileController{
    static async addLeetcode(username){
       try {
        const query ={
            "query": "query getUserProfile($username: String!) { userContestRanking(username:  $username)      {attendedContestsCount        rating        globalRanking } matchedUserStats: matchedUser(username: $username) {      submitStats: submitStatsGlobal {        acSubmissionNum {          difficulty          count          submissions  }        totalSubmissionNum {          difficulty          count          submissions     }  }    }  }", "variables": {"username": `${username}`}
        };
        const response = await axios.post('https://leetcode.com/graphql',query);
        return (formateLeetcode(response.data.data));
       } catch (error) {
        console.log(error.message);
            throw error;
       }
    }
    
    
    static async addCodechef (username){
           try {
            const response = await axios.get(`https://www.codechef.com/users/${username}`);
            const dom = new JSDOM(response.data);
            const document = dom.window.document;
            return formateCodechef(document);
           } catch (error) {
            throw error;
           }
    }
    
    static async addCodeforces (username){
        try {
            const response = await axios.get(`https://codeforces.com/profile/${username}`);
            const dom = new JSDOM(response.data);
            const document = dom.window.document;
            return formateCodeforces(document);
            
        } catch (error) {
            throw error;
        }
        
    }
    

}


module.exports = codingPrifileController;