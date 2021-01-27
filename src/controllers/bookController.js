const debug = require("debug")("app:bookController");
const { MongoClient, ObjectID } = require("mongodb");

module.exports = function bookController() {
  function getIndex(req, res) {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("connected to db");
        const db = client.db(dbName);
        const col = await db.collection("books");
        const books = await col.find().toArray();
        return books;
      } catch (error) {
        debug(error.stack);
      }
    })();
  }
  function getById(req, res, id) {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("connected to db");
        const db = client.db(dbName);
        const col = await db.collection("books");
        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);
        return book;
      } catch (error) {
        debug(error.stack);
      }
    })();
  }
  return getIndex, getById;
};
