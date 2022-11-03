const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Connecting to MongoDB Server
 */
const connect = mongoose.connect(process.env.MONGODB_ATLAS_URL);

connect.then(
    (db) => {
      console.log("MongoDB Atlas connected with the server");
    },
    (err) => {
      console.log(err);
    }
 );

const app = express();

/**
 * Create a session-store to be used by both the express-session
 *  middleware and the keycloak middleware.
 */
const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'any_key',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

/**
 * Initializing Keycloak Middleware
 */
const keycloak = require('./keycloak-config').initKeycloak();
app.use(keycloak.middleware());

/**
 * Importing Message Router
 */
const messageRouter = require('./routes/messageRouter');

app.use(cors());

/**
 * view engine setup
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/message", messageRouter);

/**
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * error handler
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  console.error(err);
});


module.exports = app;
