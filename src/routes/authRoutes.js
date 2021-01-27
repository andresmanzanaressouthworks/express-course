const express = require("express");
const authRoutes = express.Router();
const debug = require("debug")("app:authRoutes");
const { MongoClient, ObjectID } = require("mongodb");
const passport = require("passport");

authRoutes.post("/signup", function (req, res) {
  //create user
  const { username, password } = req.body;
  const url = "mongodb://localhost:27017";
  const dbName = "libraryApp";
  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("connected to db");
      const db = client.db(dbName);
      const col = await db.collection("users");
      const user = { username, password };
      const results = col.insertOne(user);
      debug(results);
      req.login((await results).ops[0], () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

authRoutes.get("/profile", function (req, res) {
  res.json(req.user);
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/profile",
    failWithError: "/",
  }),
  function (req, res) {
    res.render;
  }
);

module.exports = authRoutes;
