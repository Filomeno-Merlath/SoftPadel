var express = require("express");
var router = express.Router();
var gModel = require("../models/groupsModel");

router.get("/", async function (req, res, next) {
  console.log("sending all group");
  let result = await gModel.getAllgroups();
  res.status(result.status).send(result.result);
});

module.exports = router;
