var express = require("express");
var router = express.Router();
var mModel = require("../models/medalsModel");

router.get("/", async function (req, res, next) {
  console.log("Sending all medals");
  let result = await mModel.getAllmedals();
  res.status(result.status).send(result.result);
});
module.exports = router;
