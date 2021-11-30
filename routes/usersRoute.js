var express = require("express");
var router = express.Router();
var uModel = require("../models/usersModel");

router.get("/", async function (req, res, next) {
  console.log("sending all users");
  let result = await uModel.getAllUsers();
  res.status(result.status).send(result.result);
});
router.post("/sign", async function (req, res, next) {
  let newUser = req.body;
  let result = await uModel.saveUser(newUser);
  res.status(result.status).send(result.result);
  console.log(newUser);
});
router.post("/login", async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let result = await uModel.loginUser(username, password);
  res.status(result.status).send(result.result);
});
router.get("/:id/friends", async function (req, res, next) {
  let userId = req.params.id;
  let result = await uModel.getAllUserFriends(userId);
  res.status(result.status).send(result.result);
});
router.get("/suggest", async function (req, res, next) {
  let username = req.query.q;
  let result = await uModel.getUserSearchBySuggest(username);
  console.log(result);
  res.status(result.status).send(result.result);
});
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log("sending user by id:" + id);
  let result = await uModel.getUserById(id);
  res.status(result.status).send(result.result);
});
router.get("/:id/reserves", async function (req, res, next) {
  let id = req.params.id;
  console.log(`sending user ${id} reserves.`);
  let result = await uModel.getUserReserves(id);
  res.status(result.status).send(result.result);
});
module.exports = router;
