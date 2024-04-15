const codingProfileService = require('../service/codingProfileService');
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

function formateLeetcode(data){
     return {
        contest:data.userContestRanking.attendedContestsCount,
        ranking : data.userContestRanking.globalRanking,
        rating : data.userContestRanking.rating,
        total : data.matchedUserStats.submitStats.acSubmissionNum[0].count,
        easy : data.matchedUserStats.submitStats.acSubmissionNum[1].count,
        medium : data.matchedUserStats.submitStats.acSubmissionNum[2].count,
        hard : data.matchedUserStats.submitStats.acSubmissionNum[3].count
     }
}

function formateCodechef(document){
    const problem = parseInt(document.querySelector(".rating-data-section.problems-solved").children[0].innerHTML.match(/\((\d+)\)/)[1])+parseInt(document.querySelector(".rating-data-section.problems-solved").children[2].innerHTML.match(/\d+/)[0]);
   return {
            name: document.querySelector('.user-details-container').children[0].children[1].textContent,
            currentRating: parseInt(document.querySelector(".rating-number").textContent),
            highestRating: parseInt(document.querySelector(".rating-number").parentNode.children[4].textContent.split('Rating')[1]),
            globalRank: parseInt(document.querySelector('.rating-ranks').children[0].children[0].children[0].children[0].innerHTML),
            countryRank: parseInt(document.querySelector('.rating-ranks').children[0].children[1].children[0].children[0].innerHTML),
            stars: document.querySelector('.rating').textContent || "unrated",
            totalProblem :problem
   }
}

function formateCodeforces(document){
    const newrating = Array.from(document.querySelectorAll('.user-gray'));
    return{
        totalProblem:parseInt(document.querySelector('._UserActivityFrame_footer').children[0].children[0].children[0].innerHTML.match(/\d+/)[0]),
        rating: parseInt(newrating[6].innerHTML),
        ranking: newrating[4].innerHTML.trim()
    }
}
exports.addLeetcode = async()=>{
    const query ={
        "query": "query getUserProfile($username: String!) { userContestRanking(username:  $username)      {attendedContestsCount        rating        globalRanking } matchedUserStats: matchedUser(username: $username) {      submitStats: submitStatsGlobal {        acSubmissionNum {          difficulty          count          submissions  }        totalSubmissionNum {          difficulty          count          submissions     }  }    }  }", "variables": {"username": "Gopinath77"}
    };
    axios.post('https://leetcode.com/graphql',query).then(response=>{
        console.log("Leetcode : ",formateLeetcode(response.data.data));
    }).catch(error=>{
        console.log(error.message);
    })
}


exports.addCodechef = async(username)=>{
        axios.get(`https://www.codechef.com/users/${username}`).then(response=>{
            const dom = new JSDOM(response.data);
            const document = dom.window.document;
            console.log("codechef : ",formateCodechef(document));
               
        }).catch(error=>{
            console.log(error.message);
        });
}

exports.addCodeforces = async(username)=>{
    axios.get(`https://codeforces.com/profile/Kamalesh_bala`).then(response=>{
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        console.log("codeforces :  ",formateCodeforces(document));
           
    }).catch(error=>{
        console.log(error.message);
    });
}