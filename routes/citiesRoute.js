var express = require('express');
var router = express.Router();
var cModel = require("../models/citiesModel");

router.get('/', async function(req, res, next){
    console.log("sending all cities");
    let result = await cModel.getAllcities();
    res.status(result.status).send(result.result); 
});

module.exports = router;