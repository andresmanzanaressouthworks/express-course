const express = require("express");
const bookRouter = express.Router();

const bookController = require("../controllers/bookController");
const { getIndex, getById } = bookController;

bookRouter.get("/:id", function (req, res) {
  const { id } = req.params;
  getById;
});

bookRouter.get("/", function (req, res) {
  res.send(getIndex);
});

module.exports = bookRouter;
