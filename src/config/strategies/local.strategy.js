const passport = require("passport");
const { Strategy } = require("passport-local");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:local.strategy");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url = "mongodb://localhost:27017";
        const dbName = "libraryApp";
        (async function mongo() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug("connected to db");
            const db = client.db(dbName);
            const col = await db.collection("users");
            const user = await col.findOne({ username });
            if (user.password == password) {
              donde(null, user);
            } else {
              done(null, false);
            }
            debug(book);
            res.json(book);
          } catch (error) {
            debug(error.stack);
          }
        })();
      }
    )
  );
};
