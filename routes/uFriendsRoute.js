var express = require('express');
var router = express.Router();
var fModel  = require("../models/usersFriends.js");

router.get("/", async function(req, res, next){
    console.log("Sending all users friends");
    let result = await fModel.getAllUsersFriends();
    res.status(result.status).send(result.result);
});

router.post("/follow", async function(req, res, next){
    let user1Id = req.body.user1Id;
    let user2Id = req.body.user2Id;
    let result = await fModel.followUser(user1Id,user2Id);
    res.status(result.status).send(result.result);
});

module.exports = router;