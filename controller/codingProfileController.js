const express = require('express');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const app = express();

const formateLeetcode = (data) => {
    return {
        contest: data.userContestRanking.attendedContestsCount,
        ranking: data.userContestRanking.globalRanking,
        rating: data.userContestRanking.rating,
        total: data.matchedUserStats.submitStats.acSubmissionNum[0].count,
        easy: data.matchedUserStats.submitStats.acSubmissionNum[1].count,
        medium: data.matchedUserStats.submitStats.acSubmissionNum[2].count,
        hard: data.matchedUserStats.submitStats.acSubmissionNum[3].count
    };
};

const formateCodechef = (document) => {
    const problem = parseInt(document.querySelector(".rating-data-section.problems-solved").children[0].innerHTML.match(/\((\d+)\)/)[1]) + parseInt(document.querySelector(".rating-data-section.problems-solved").children[2].innerHTML.match(/\d+/)[0]);
    return {
        name: document.querySelector('.user-details-container').children[0].children[1].textContent,
        currentRating: parseInt(document.querySelector(".rating-number").textContent),
        highestRating: parseInt(document.querySelector(".rating-number").parentNode.children[4].textContent.split('Rating')[1]),
        globalRank: parseInt(document.querySelector('.rating-ranks').children[0].children[0].children[0].children[0].innerHTML),
        countryRank: parseInt(document.querySelector('.rating-ranks').children[0].children[1].children[0].children[0].innerHTML),
        stars: document.querySelector('.rating').textContent || "unrated",
        totalProblem: problem
    };
};

const formateCodeforces = (document) => {
    const newrating = Array.from(document.querySelectorAll('.user-gray'));
    return {
        totalProblem: parseInt(document.querySelector('._UserActivityFrame_footer').children[0].children[0].children[0].innerHTML.match(/\d+/)[0]),
        rating: parseInt(newrating[6].innerHTML),
        ranking: newrating[4].innerHTML.trim()
    };
};

exports.getLeetcodeProfile = async (req, res) => {
    const username = req.body.username;
    const query = {
        "query": "query getUserProfile($username: String!) { userContestRanking(username:  $username)      {attendedContestsCount        rating        globalRanking } matchedUserStats: matchedUser(username: $username) {      submitStats: submitStatsGlobal {        acSubmissionNum {          difficulty          count          submissions  }        totalSubmissionNum {          difficulty          count          submissions     }  }    }  }", "variables": { "username": username }
    };
    try {
        const response = await axios.post('https://leetcode.com/graphql', query);
        res.json(formateLeetcode(response.data.data));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCodechefProfile = async (req, res) => {
    const username = req.body.username;
    try {
        const response = await axios.get(`https://www.codechef.com/users/${username}`);
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        res.json(formateCodechef(document));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCodeforcesProfile = async (req, res) => {
    const username = req.body.username;
    try {
        const response = await axios.get(`https://codeforces.com/profile/${username}`);
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        res.json(formateCodeforces(document));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

