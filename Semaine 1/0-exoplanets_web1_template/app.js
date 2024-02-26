const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const hbs = require('hbs');

/**
 * The {{#exists}} helper checks if a variable is defined.
 */
hbs.registerHelper('exists', function (variable, options) {
  if (typeof variable !== 'undefined') {
    return options.fn(this);
  }
  else {
    // options.inverse == else block
    return options.inverse(this);
  }
});

/**
 * eq checks if value are equal
 */
hbs.registerHelper('eq', function (a, b) {
  if (a === b) {
    return true;
  }
  else {
    return false;
  }
});

// Use of sessions
// YOU MUST ADD THIS LINE BEFORE YOURS ROUTERS !
const session = require ('express-session');

// TODO Require your controllers here
const indexRouter = require("./routes/index.js");
const exoplanetsRouter = require("./routes/exoplanets.js");
const exolunesRouter = require("./routes/exolunes.js");
const usersRouter = require("./routes/users.js");
const membersRouter = require("./routes/members.js");

const app = express();
const port = 3000;

// Setup views folder and handlebar engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder

// use of sessions
// YOU MUST ADD THESES LINES BEFORE APP.USE ROUTERS !
app.use(session({secret: "Your secret key", resave: false, saveUninitialized:false}));
// use of session variables in views via res.locals
app.use(function (req, res, next) {
res.locals.session = req.session;
next();
});

// TODO Call your controllers here
app.use("/", indexRouter);
app.use("/exoplanets", exoplanetsRouter);
app.use("/exolunes", exolunesRouter);
app.use("/users", usersRouter);
app.use("/members", membersRouter);

// Create error on page not found
app.use((req, res, next) => next(createError(404)));

// Show error hbs page
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Launch server
app.listen(port, () => console.log('App listening on port ' + port));
