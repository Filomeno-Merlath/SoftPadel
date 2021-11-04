var express = require('express');
var router = express.Router();
var pModel = require("../models/playersModel");

router.get('/', async function(req, res, next) {
    console.log("sending all players");
    let result = await pModel.getAllplayers();
    res.status(result.status).send(result.result);
});
router.post("/", async function(req,res,next) {
    let newPlayer = req.body;
    let result = await pModel.savePlayer(newPlayer);
    res.send(result);
    console.log(newPlayer);
});
router.post('/login',async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let result = await pModel.loginPlayer(username,password);
    res.status(result.status).send(result.result);
});
router.get('/:id/friends', async function(req, res, next){
    let playerId = req.params.id;
    let result = await pModel.getAllPlayerFriends(playerId);
    res.status(result.status).send(result.result);
});
router.get('/search/', async function(req, res, next) {
    let username = req.query.name;
    let result = await pModel.getPlayerSearchBy(username);
    console.log(result);
    res.status(result.status).send(result.result);
});
router.get('/:id', async function(req, res, next){
    let id = req.params.id;
    console.log("sending player by id"+id);
    let result = await pModel.getPlayerById(id);
    res.status(result.status).send(result.result);
});
module.exports = router;