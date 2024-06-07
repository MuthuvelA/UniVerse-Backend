const leaderBoardController = require('../controller/leaderBoardController');
const router = require('express').Router();

router.post('/leaderBoard',leaderBoardController.leaderBoard);

module.exports = router;