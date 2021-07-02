const env = require("./config/env");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const methodOverride = require("method-override");

// database connection
require("./config/db").connectDB();

const app = express();

app.use(express.static("public"));

// view engine setup
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

if (app.get("env") !== "production") {
  app.use(logger("dev"));
}

app.use(methodOverride("_method"));

// routing config
const articleRouter = require("./routes/articles.routes");
app.use("/articles", articleRouter);

const { notFound, errorHandler } = require("./middleware/error.middleware");

// 404
app.use(notFound);

// global error handler
app.use(errorHandler);

app.listen(
  env.PORT,
  console.log(
    `Server running in "${process.env.NODE_ENV}" mode on port ${env.PORT}`
  )
);
