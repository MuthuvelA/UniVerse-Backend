const { default: axios } = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
class CodingProfile{
    static async addProfile(details){
        
    }

    static async getLeetcode(username){ 
        try {
            
        } catch (error) {
            
        }
    }
}

class validateProfile{
    static async checkLeetcode(username){
        const query = {
            "query": "query getUserProfile($username: String!) { matchedUser(username: $username) {username} }", "variables": {"username": username}
        };
        try {
            const response = await axios.post("https://leetcode.com/graphql/",query);
            console.log("Response : ",response.data);
            if(response.data.data.matchedUser!==null) return true;
            else return false;
        } catch (error) {
          throw error;   
        }
    }

    static async checkcodeChef(username){
        try {
            const response = await axios.get(`https://codechef.com/users/${username}`);
            const document = (new JSDOM(response.data)).window.document;
            const title = document.querySelector("title").textContent;
            return title.split(" ")[0]===username;
        } catch (error) {
            throw error;
        }
    }

    static async checkCodeforces(username){
        try {
            const response = await axios.get(`https://codeforces.com/profile/${username}`);
            const document = (new JSDOM(response.data)).window.document;
            const title = document.querySelector("title").textContent;
            return title.split(" ")[0]===username;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {validateProfile,CodingProfile};