var express = require('express');
var router = express.Router();
var fModel  = require("../models/pFriends.js");

router.get("/", async function(req, res, next){
    console.log("Sending all players friends");
    let result = await fModel.getAllPlayerFriends();
    res.status(result.status).send(result.result);
});

router.post("/follow", async function(req, res, next){
    let userId = req.body.userId;
    let playerId = req.body.playerId;
    let result = await fModel.followPlayer(userId,playerId);
    res.status(result.status).send(result.result);
});

module.exports = router;