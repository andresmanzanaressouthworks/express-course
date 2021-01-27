const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "library" }));

require("./src/config/passport.js")(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

const bookRouter = require("./src/routes/bookRouter");
const adminRouter = require("./src/routes/adminRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("index", {
    list: ["a", "b"],
    title: "My title",
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
