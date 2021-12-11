var express = require("express");
var router = express.Router();
var rModel = require("../models/reservesModel.js");

router.get("/", async function (req, res, next) {
  console.log("Sending all reserves");
  let result = await rModel.getAllReserves();
  res.status(result.status).send(result.result);
});
router.get("/filter", async function (req, res, next) {
  let date = req.query.date;
  let result = await rModel.getReservesFilterByDate(date);
  console.log(result);
  res.status(result.status).send(result.result);
});
router.post("/new", async function (req, res, next) {
  let newReserve = req.body;
  let result = await rModel.newReserve(newReserve);
  res.status(result.status).send(result.result);
});
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log("sending reserve by id:" + id);
  let result = await rModel.getReserveById(id);
  res.status(result.status).send(result.result);
});
module.exports = router;
