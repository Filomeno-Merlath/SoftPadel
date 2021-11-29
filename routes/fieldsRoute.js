var express = require("express");
var router = express.Router();
var fModel = require("../models/fieldsModel");

router.get("/", async function (req, res, next) {
  console.log("sending all fields");
  let result = await fModel.getAllfields();
  res.status(result.status).send(result.result);
});

module.exports = router;
