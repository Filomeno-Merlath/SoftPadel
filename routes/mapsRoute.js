var express = require('express');
var router = express.Router();
var mModel = require("../models/mapsModel");

router.get('/', async function(req, res, next){
    console.log("sending all maps");
    let result = await mModel.getAllmaps();
    res.status(result.status).send(result.result);
});

module.exports = router;