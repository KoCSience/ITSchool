const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const apiRouter = require("./routes/api.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    cookie: {
      //fixer la session
      path: "/",
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: "grehjznejzkhgjrez",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.static(path.join(__dirname, "../vue-itschool/dist"))); // frontend

app.use("/api/", apiRouter);

module.exports = app;
