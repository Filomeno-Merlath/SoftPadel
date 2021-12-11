var express = require("express");
var router = express.Router();
var fModel = require("../models/fieldsModel");

router.get("/", async function (req, res, next) {
  console.log("sending all fields");
  let result = await fModel.getAllfields();
  res.status(result.status).send(result.result);
});

router.post("/", async function (req, res, next) {
  let newField = req.body;
  let result = await fModel.registerField(newField);
  res.status(result.status).send(result.result);
});

router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log("sending field by id:" + id);
  let result = await fModel.getFieldById(id);
  res.status(result.status).send(result.result);
});

module.exports = router;
